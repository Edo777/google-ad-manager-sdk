const { workerData, parentPort } = require("worker_threads");
const { createdCreatives, startFrom, endTo, valueIds } = JSON.parse(workerData);

const createLineItems = require("./01-create-lineitem");
const createAssociations = require("./01-lineitem-creative-associate");

const {generateLineItemsNew, setCustomTargetingNew} = require("./helpers");
const sdk = require("./sdk-initiate");

const {
    orderId,
    lineItemsPlaceholderSizes,
    adUnits,
    placements,
    keyValueCompareOperator,
    valueCheckOperator,
    keyId,
    lineItemPrefix,
    keyId2,
    valueIds2,
    keyId3,
    valueIds3,
    useOtherBlocks
} = require("./conf");


/** START PROCESSING */
(async function () {
    const errors = [];
    let result = null;

    if(!createdCreatives || !createdCreatives.length) {
        return parentPort.postMessage({ status: "finished", result, errors: ["creatives_is_required"] });
    }   

    // Generate lineitems data
    const {lineItems} = generateLineItemsNew(orderId, {
        sizes: lineItemsPlaceholderSizes, 
        adUnits,
        placements,
        lineItemPrefix,

        startFrom,
        endTo
    });

    // Set custom targeting to lineItems
    await setCustomTargetingNew(lineItems, {
        keyValueCompareOperator,
        valueCheckOperator,
  
        keyIds: [keyId],
        valueIds,
  
        keyId2,
        valueIds2,
  
        keyId3,
        valueIds3,
  
        useOtherBlocks
      });

      // Create line items
      const createdLineItems = await createLineItems(sdk, lineItems);

      if(createdLineItems.length && createdCreatives.length) {
        const lIds = createdLineItems.map((l) => l.id);
        const cIds = createdCreatives.map((c) => c.id);
        
        // Associate
        await createAssociations(sdk, lIds, cIds, lineItemsPlaceholderSizes);
  
        result = {lIds, cIds};
      }

    parentPort.postMessage({ status: "finished", result, errors: errors });
})();