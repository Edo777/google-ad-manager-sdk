const advertiserId = 4566943199;
const orderId = 2936850147;

// LINEITEM CONFIG
const lineItemsCount = 400;
const lineItemsPlaceholderSizes = [
    {width: 300, height: 250}, 
    {width: 728, height: 90}, 
    {width: 336, height: 280}, 
    {width: 300, height: 600},
    {width: 320, height: 50},
    {width: 1, height: 1},
    {width: 640, height: 480},
    {width: 300, height: 100},
    {width: 1, height: 2},
];
const adUnits = []; // important (will be min one adUnit or one placement to target)
const placements = [28817982]; // important (will be min one adUnit or one placement to target)
const lineItemPrefix = "TEST_NSF_Prebid1";

// CREATIVE CONFIG
const creativesCount = 5;
const creativeSize = [{width: 300, height: 250}];
const html = `<script> var w = window; for (i = 0; i < 10; i++) { w = w.parent; if (w.pbjs) { try { w.pbjs.renderAd(document, '%%PATTERN:hb_adid%%'); break; } catch (e) { continue; } } } </script>`;
const creativePrefix = lineItemPrefix;

// KEY-VALUES ( MAIN )
const keyValueCompareOperator = "OR"; // OR
const valueCheckOperator = "IS"; // IS_NOT
const keyId = 11675341; // hp_bp

// use other bloks to target
const useOtherBlocks = true;

// CONSTANT KEY-VALUE ( SECOND )
const keyId2 = 12798443;
const valueIds2 = [448444701406, 448444701406];

// CONSTANT KEY-VALUE ( THIRD )
const keyId3 = 11776959;
const valueIds3 = [448197196656, 447971291199];

// POOL
const poolCount=50;

module.exports = {
    orderId,
    lineItemsCount,
    lineItemsPlaceholderSizes,
    adUnits,
    placements,
    creativesCount,
    creativeSize,
    advertiserId,
    html,
    keyValueCompareOperator,
    valueCheckOperator,
    keyId,
    lineItemPrefix,
    creativePrefix,
    keyId2,
    valueIds2,
    keyId3,
    valueIds3,
    useOtherBlocks,
    poolCount
}