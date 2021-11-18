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

const COMPANY_ID = '5030641911';
const SALESPERSON_ID = '244856089';
const TRAFFICKER_ID = '244856089';

(async function () {
  try {
    const orders = [
        {
          'name': 'Order # ' + Date.now(),
          'advertiserId': COMPANY_ID,
          'salespersonId': SALESPERSON_ID,
          'traffickerId': TRAFFICKER_ID
        }
    ]

    const result = await sdk.Order.create({ orders });
    console.log(result);
  } catch (e) {
    console.log("Failed to create creatives: ", e);
  }
})();