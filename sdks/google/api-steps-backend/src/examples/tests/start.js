const workerTask = require("./workers");
const createCreatives = require("./01-create-creative");
const getValuesOfKey = require("./01-get-values-of-key");

const { generateCreatives } = require("./helpers");
const {
  poolCount,
  lineItemsCount,
  creativesCount,
  creativeSize,
  advertiserId,
  html,
  keyId,
  creativePrefix,
} = require("./conf");

const sdk = require("./sdk-initiate");

(async function () {
  try {
    // Generate lineitems and creatives data
    const creatives = generateCreatives(advertiserId, creativesCount, {size: creativeSize, html, creativePrefix});

    // Get values of given key
    const valueIds = await getValuesOfKey(sdk, keyId);

    // Create creatives
    const createdCreatives = await createCreatives(sdk, creatives);

    const workerData = {createdCreatives, valueIds}

    const results = [];

    const pool = (Math.floor(lineItemsCount / poolCount) * poolCount);
    const balance = lineItemsCount - pool;

    for(let i = 1; i <= pool; i+=poolCount) {
      workerData.startFrom = i;
      workerData.endTo = i + poolCount - 1;

      const res = await workerTask(workerData);

      results.push(res);
    }

    // balance to create
    if(balance) {
      workerData.startFrom = workerData.endTo + 1;
      workerData.endTo = lineItemsCount;

      const res = await workerTask(workerData);

      results.push(res);
    }

    console.log(results);

  } catch (e) {
    console.log("Failed to start job: ", e);
  }
})();