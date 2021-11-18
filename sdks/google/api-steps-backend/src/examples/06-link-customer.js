const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });

const {
  SOCIAL_MEDIA_GOOGLE_CLIENT_ID,
  SOCIAL_MEDIA_GOOGLE_CLIENT_SECRET,
  SOCIAL_MEDIA_GOOGLE_DEVELOPER_TOKEN,
  TMP_GOOGLE_LOGIN_CUSTOMER_ID,
  TMP_GOOGLE_ACCESS_TOKEN,
  TMP_GOOGLE_REFRESH_TOKEN,
} = process.env;

const { GoogleSDK } = require("../api-sdk");
const sdk = new GoogleSDK({
  clientId: SOCIAL_MEDIA_GOOGLE_CLIENT_ID,
  clientSecret: SOCIAL_MEDIA_GOOGLE_CLIENT_SECRET,
  developerToken: SOCIAL_MEDIA_GOOGLE_DEVELOPER_TOKEN,
  loginCustomerId: TMP_GOOGLE_LOGIN_CUSTOMER_ID,
  accessToken: TMP_GOOGLE_ACCESS_TOKEN,
  refreshToken: TMP_GOOGLE_REFRESH_TOKEN,
});

(async function () {
  try {
    const customerId = "475-424-7801";
    const result = await sdk.Customer.link({
      customerId,
    });

    console.log("Customer linkage result:", result);
  } catch (e) {
    console.log("Failed to link customer:", e);
  }
})();
