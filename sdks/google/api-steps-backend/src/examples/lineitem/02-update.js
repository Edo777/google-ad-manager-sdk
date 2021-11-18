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
    // const lineItemsToCreate = {
    //   externalData : {
    //     orderId: 2865081582,
    //     name: "EDO",
    //     externalId: "",
    //     startDateTime: {date: "2021-06-10"},
    //     // startDateTimeType : "ONE_HOUR_FROM_NOW",
    //     unlimitedEndDateTime : true,
    //     endDateTime: "",
    //     creativeRotationType: "EVEN",
    //     deliveryRateType : "EVENLY",

    //     customPacingCurve: {
    //       customPacingGoalUnit: "UNKNOWN",
    //       customPacingGoals: [{
    //         startDateTime: "",
    //         useLineItemStartDateTime: true,
    //         amount: 100000
    //       }]
    //     },
        
    //     // roadblockingType: "",

    //     // skippableAdType: "",
    //     // frequencyCaps: [],

    //     lineItemType: "SPONSORSHIP",
    //     priority:"4 (2, 5)",
    //     costPerUnit : 0,
    //     costType : "CPM",
    //     // discountType : "",
    //     // discount : "",
    //     // contractedUnitsBought : "",
    //     creativePlaceholders : [[300, 250]],

    //     activityAssociations: "",
    //     environmentType: "",
    //     allowedFormats: "",
    //     companionDeliveryOption: "",
    //     allowOverbook: "",
    //     skipInventoryCheck: "",
    //     skipCrossSellingRuleWarningChecks: "",
    //     reserveAtCreation : "",
    //     stats : "",
    //     deliveryIndicator: "",
    //     deliveryData : "",
    //     budget : "",
    //     status : "",
    //     reservationStatus: "",
    //     isArchived: "",
    //     webPropertyCode : "",
    //     appliedLabels: [],
    //     effectiveAppliedLabels : [],
    //     disableSameAdvertiserCompetitiveExclusion: false,
    //     notes: "",
    //     competitiveConstraintScope: "",
    //     lastModifiedDateTime : "",
    //     creationDateTime : null,
    //     customFieldValues: [],
    //     isMissingCreatives : false,
    //     thirdPartyMeasurementSettings : {},
    //     videoMaxDuration: "",
    //     primaryGoal : "",
    //     secondaryGoals: [],
    //     grpSettings : {},
    //     dealInfo : "",
    //     viewabilityProviderCompanyIds : [],
    //     childContentEligibility : "ALLOWED",
    //     customVastExtension: "",
    //   },

    //   LineItem : {
    //     targeting: {
    //       inventoryTargeting: {
    //         targetedAdUnits : [],
    //       },
    //     },
    //     creativeTargetings: [{
    //       name : "Creative targeting (Edo)",
    //       targeting: "geo"
    //     }]
    //   }
    // };

    const data = {
      lineitemIds: ["5732603704"],
      dataToUpdate: {
        // "primaryGoal": {
        //   "goalType": "DAILY",
        //   "units": 10000,
        //   "unitType": "IMPRESSIONS"
        // },
        // "name" : "Logic v222",
        "endDateTime" : {
          "date" : {
              "year": 2021,
              "month" : 10,
              "day": 10
          },
          "hour" : 0,
          "minute" : 0,
          "second" : 0,
          "timeZoneId" : "Asia/Yerevan"
        },
        unlimitedEndDateTime: false,
        "targeting": {
          "geoTargeting": {
              "targetedLocations" : [
                  {
                    'id': '2840',
                    'displayName': 'US'
                  },
                  {
                      'id': '20133',
                      'displayName': 'Geneva'
                  },
                ],
            },
        },
      },

    };

    const result = await sdk.LineItem.update(data);

    console.log(result);
  } catch (e) {
    console.log("Failed to update lineitem: ", e);
  }
})();