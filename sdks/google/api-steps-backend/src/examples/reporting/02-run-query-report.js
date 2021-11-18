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

const ORDER_ID = '2884326613';
const dimensions = [
  'DATE',
  'DAY',
  'ADVERTISER_ID',
  'ORDER_ID',
  'LINE_ITEM_ID',
  'CREATIVE_ID',
  
  // -----
  'MOBILE_DEVICE_NAME', 
  'DEVICE_CATEGORY_NAME', 
  'COUNTRY_NAME', 
  // 'BROWSER_NAME' 
]

const columns = [
  'AD_SERVER_IMPRESSIONS', 
  'AD_SERVER_CLICKS',
  'AD_SERVER_CTR', 
  // 'AD_SERVER_CPM_AND_CPC_REVENUE',
  // 'AD_SERVER_WITHOUT_CPD_AVERAGE_ECPM'
];



(async function () {
  try {
    const result = await sdk.Reporting.runQueryReport({ 
      orderId : ORDER_ID, 
      dimensions, 
      columns,
      dateRangeType : 'CUSTOM_DATE',
      startDate: '2021-07-01', 
      endDate: '2021-07-30'
    });
    console.log(result);
  } catch (e) {
    console.log("Failed to create creatives: ", e);
  }
})();