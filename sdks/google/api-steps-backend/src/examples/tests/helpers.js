const createKeyValues = require("./01-create-key-value");

/**
 * Generate Lineitems data
 * @param {number} min 
 * @param {number} max 
 * @returns 
 */
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * generate lineitems data
 * @param {number} orderId 
 * @param {number} count 
 * @param {{
 *  sizes : [{width: number, height: number}],
 *  adUnits: [number]
 * }} param2 
 * @returns 
 */
function generateLineItems(orderId, count, {sizes, adUnits, placements, lineItemPrefix}) {

    const lineItems = [];

    const customTargetingKeys = [`hp_pb`];
    const customTargetingValues = [];

    for(let i = 11; i <= count; i++) {
        const ind = i*0.01;
        const name = `${lineItemPrefix}_${ind}`

        // Append custom targeting values
        customTargetingValues.push(`${ind}`);

        const inventoryTargeting = {};

        if(adUnits && adUnits.length) {
            inventoryTargeting.targetedAdUnits = adUnits.map(au => ({adUnitId: au}));
        }

        if(placements && placements.length) {
            inventoryTargeting.targetedPlacementIds = placements;
        }

        lineItems.push({
            "orderId": orderId,
            "name": name,
            "costPerUnit" : { "currencyCode": "USD", "microAmount" : ind * 1000000 },
            "primaryGoal" : { "goalType" : "NONE" },
            "lineItemType" : "PRICE_PRIORITY",
            "creativePlaceholders" : sizes.map(s => ({size: {width: s.width, height: s.height}})),
            "costType" : "CPM",
            "unlimitedEndDateTime" : true,
            "startDateTimeType": "IMMEDIATELY",
    
            "allowOverbook": true,
            "targeting": {
                "inventoryTargeting" : inventoryTargeting
              },
          })
    }



    return {lineItems, customTargetingKeys, customTargetingValues};
}

/**
 * generate creatives data
 * @param {number} orderId 
 * @param {number} count 
 * @param {{
 *  size : [{width: number, height: number}],
 *  html: string,
 *  previewUrl: string
 * }} param2 
 * @returns 
 */
function generateCreatives(advertiserId, count, {size, html, previewUrl, creativePrefix}) {
    const creatives = [];

    for(let i = 1; i <= count; i++) {
        const ind = i*0.01;
        const name = `${creativePrefix}_${ind}`
        size.forEach(s => {
            creatives.push({
                'xsi_type': 'ThirdPartyCreative',
                'name': name,
                'advertiserId': advertiserId,
                'size': s,
                // 'previewUrl': previewUrl || 'https://www.google.com/',
                'snippet': html,
                'isSafeFrameCompatible': false
            })
        })
    }

    return creatives;
}

/**
 * Set custom targeting to lineitems data
 * @param {Array} lineItems 
 * @param {{
 *  keyIds : [number]
 *  valueIds : [number]
 *  keyValueCompareOperator : "AND" | "OR",
 *  valueCheckOperator: "IS" | "IS_NOT"
 * }} data 
 */
async function setCustomTargetingNew(lineItems, data){
    lineItems.forEach((li) => {
        const lineItemIndex = li.name.slice(li.name.lastIndexOf("_") + 1);

        const value = data.valueIds.find((val) => 
            lineItemIndex.toString() == val.displayName || lineItemIndex.toString() == val.name
        );

        if(value && value.id) {

            if(!data.useOtherBlocks) {
                const topSet = {
                    'xsi_type': 'CustomCriteriaSet',
                    'logicalOperator': data.keyValueCompareOperator,
                    'children': { 
                        'xsi_type': 'CustomCriteria',
                        'keyId': data.keyIds[0],
                        'valueIds': [value.id],
                        'operator': data.valueCheckOperator
                    }
                }
    
                li.targeting.customTargeting = topSet
            }else{
                // Top block
                const criteria1 = { 
                    'xsi_type': 'CustomCriteria',
                    'keyId': data.keyIds[0],
                    'valueIds': [value.id],
                    'operator': data.valueCheckOperator
                };


                const criteria2 = { 
                    'xsi_type': 'CustomCriteria',
                    'keyId': data.keyId2,
                    'valueIds': data.valueIds2[0],
                    'operator': data.valueCheckOperator
                };

                const criteria3 = { 
                    'xsi_type': 'CustomCriteria',
                    'keyId': data.keyId3,
                    'valueIds': data.valueIds3[0],
                    'operator': data.valueCheckOperator
                };

                // down block
                const criteria4 = { 
                    'xsi_type': 'CustomCriteria',
                    'keyId': data.keyIds[0],
                    'valueIds': [value.id],
                    'operator': data.valueCheckOperator
                };

                const criteria5 = { 
                    'xsi_type': 'CustomCriteria',
                    'keyId': data.keyId2,
                    'valueIds': data.valueIds2[1],
                    'operator': data.valueCheckOperator
                };

                const criteria6 = { 
                    'xsi_type': 'CustomCriteria',
                    'keyId': data.keyId3,
                    'valueIds': data.valueIds3[1],
                    'operator': data.valueCheckOperator
                };

                const subsetTop = {
                    'xsi_type': 'CustomCriteriaSet',
                    'logicalOperator': 'AND',
                    'children': [criteria1, criteria2, criteria3]
                }

                const subsetDown = {
                    'xsi_type': 'CustomCriteriaSet',
                    'logicalOperator': 'AND',
                    'children': [criteria4, criteria5, criteria6]
                }

                if(!li.targeting) {
                    li.targeting =  {};
                }

                const topSet = {
                    'xsi_type': 'CustomCriteriaSet',
                    'logicalOperator': data.keyValueCompareOperator,
                    'children': [subsetTop, subsetDown]
                }

                li.targeting.customTargeting = topSet
            }

            
        }            
    });        
}

/**
 * Zerofill
 * @param {number} n 
 * @returns {string}
 */
function zeroFill(n) {
    return n.toLocaleString('en', {minimumIntegerDigits:1,minimumFractionDigits:2,useGrouping:false})
}


/**
 * generate lineitems data
 * @param {number} orderId 
 * @param {{
 *  sizes : [{width: number, height: number}],
 *  adUnits: [number],
 *  placements: [number],
 *  lineItemPrefix: string,
 *  startFrom: number,
 *  endTo: number
 * }} param2 
 * @returns 
 */
function generateLineItemsNew(orderId, {sizes, adUnits, placements, lineItemPrefix, startFrom, endTo }) {
    const lineItems = [];

    // const customTargetingValues = [];
    for(let i = startFrom; i <= endTo; i++) {
        const ind = i * 0.01;
        const name = `${lineItemPrefix}_${zeroFill(ind)}`

        // Append custom targeting values
        // customTargetingValues.push(`${ind}`);

        const inventoryTargeting = {};

        // Set adUnits
        if(adUnits && adUnits.length) {
            inventoryTargeting.targetedAdUnits = adUnits.map(au => ({adUnitId: au}));
        }

        // Set placements
        if(placements && placements.length) {
            inventoryTargeting.targetedPlacementIds = placements;
        }

        lineItems.push({
            "orderId": orderId,
            "name": name,
            "costPerUnit" : { "currencyCode": "USD", "microAmount" : Math.floor(ind * 1000000) },
            "primaryGoal" : { "goalType" : "NONE" },
            "lineItemType" : "PRICE_PRIORITY",
            "creativePlaceholders" : sizes.map(s => ({size: {width: s.width, height: s.height}})),
            "costType" : "CPM",
            "unlimitedEndDateTime" : true,
            "startDateTimeType": "IMMEDIATELY",
    
            "allowOverbook": true,
            "targeting": {
                "inventoryTargeting" : inventoryTargeting
              },
          })
    }

    return {lineItems};
}

module.exports = {
    generateLineItemsNew,
    generateLineItems,
    generateCreatives,
    setCustomTargetingNew
}