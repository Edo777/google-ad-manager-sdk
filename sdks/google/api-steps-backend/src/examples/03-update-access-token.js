const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });

const {
  SOCIAL_MEDIA_GOOGLE_CLIENT_ID,
  SOCIAL_MEDIA_GOOGLE_CLIENT_SECRET,
  TMP_GOOGLE_REFRESH_TOKEN,
} = process.env;

const { GoogleSDK } = require("../api-sdk");
const sdk = new GoogleSDK({
  clientId: SOCIAL_MEDIA_GOOGLE_CLIENT_ID,
  clientSecret: SOCIAL_MEDIA_GOOGLE_CLIENT_SECRET,
  refreshToken: TMP_GOOGLE_REFRESH_TOKEN,
});

(async function () {
  try {
    const result = await sdk.updateAccessToken();
    console.log("Access token updated:", { result });
  } catch (e) {
    console.log("Failed to update access token:", e);
  }
})();
