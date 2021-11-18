const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "..", "..", "..", ".env") });

const {
  SOCIAL_MEDIA_GOOGLE_CLIENT_ID,
  SOCIAL_MEDIA_GOOGLE_CLIENT_SECRET,
  SOCIAL_MEDIA_GOOGLE_DEVELOPER_TOKEN,
  TMP_GOOGLE_LOGIN_CUSTOMER_ID,
  TMP_GOOGLE_ACCESS_TOKEN,
  TMP_GOOGLE_REFRESH_TOKEN,
  TMP_GOOGLE_CLIENT_CUSTOMER_ID,
  GOOGLE_YAML_FILE_PATH
} = process.env;

const { GoogleSDK } = require("../../api-sdk");
const sdk = new GoogleSDK({
  clientId: SOCIAL_MEDIA_GOOGLE_CLIENT_ID,
  clientSecret: SOCIAL_MEDIA_GOOGLE_CLIENT_SECRET,
  developerToken: SOCIAL_MEDIA_GOOGLE_DEVELOPER_TOKEN,
  loginCustomerId: TMP_GOOGLE_LOGIN_CUSTOMER_ID,
  accessToken: TMP_GOOGLE_ACCESS_TOKEN,
  refreshToken: TMP_GOOGLE_REFRESH_TOKEN,
  clientCustomerId: TMP_GOOGLE_CLIENT_CUSTOMER_ID,
  yamlFilePath: GOOGLE_YAML_FILE_PATH
});


(async function () {
  try {
    const ORDER_ID = 2570501945;
    const adUnits = [{"adUnitId" : 22428174908}];
    const PLACEMENTS = [29504729];
    const data = [];
    for(let i = 1 ; i < 3; i++) {
      const lineItemData =  {
        "orderId": ORDER_ID,
        "name": "Lineitem_Test_" + i, // 0.01
        "costPerUnit" : {
            "currencyCode": "USD",
            "microAmount" : 1000000 // for each i 0.01, 0.02, 0.03 ....  10 -> 0.1 -> 100- 1
        },
        "primaryGoal" : {
          "goalType" : "NONE"
        },
        "lineItemType" : "PRICE_PRIORITY",
        "creativePlaceholders" : [{
            "size": {"width": 300, "height" : 250}
        }],
        "costType" : "CPM",

        "unlimitedEndDateTime" : true,
        "startDateTimeType": "IMMEDIATELY",

        "allowOverbook": true,
        "targeting": {
            "inventoryTargeting": {
                // "targetedAdUnits" : adUnits,
                "targetedPlacementIds" : PLACEMENTS,
              },
              // "customTargeting" : {
              //   "logicalOperator" : "OR",
              //   "children" : [{
              //     "customCriteria" : {
              //       keyId: "hp_pb",
              //       valueIds: "0.01" // for each i 0.01, 0.02, 0.03 ....  10 -> 0.1 -> 100- 1
              //     }
              //   }]
              // }
          },
      }
      data.push(lineItemData);
    }

   

    const result = await sdk.LineItem.create({ lineitems: data });

    console.log(result);
  } catch (e) {
    console.log("Failed to load campaign report:", e);
  }
})();