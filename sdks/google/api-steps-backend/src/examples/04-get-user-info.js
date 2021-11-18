const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });

const {
  SOCIAL_MEDIA_GOOGLE_CLIENT_ID,
  SOCIAL_MEDIA_GOOGLE_CLIENT_SECRET,
  SOCIAL_MEDIA_GOOGLE_DEVELOPER_TOKEN,
  TMP_GOOGLE_ACCESS_TOKEN,
  TMP_GOOGLE_REFRESH_TOKEN,
} = process.env;

const { GoogleSDK } = require("../api-sdk");
const sdk = new GoogleSDK({
  clientId: SOCIAL_MEDIA_GOOGLE_CLIENT_ID,
  clientSecret: SOCIAL_MEDIA_GOOGLE_CLIENT_SECRET,
  accessToken: TMP_GOOGLE_ACCESS_TOKEN,
  refreshToken: TMP_GOOGLE_REFRESH_TOKEN,
  developerToken: SOCIAL_MEDIA_GOOGLE_DEVELOPER_TOKEN,
});

(async function () {
  try {
    const result = await sdk.getUserInfo();
    console.log("Logged user info:", { result });
  } catch (e) {
    console.log("Failed to load user info:", e);
  }
})();
