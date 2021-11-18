const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });

const {
  SOCIAL_MEDIA_GOOGLE_CLIENT_ID,
  SOCIAL_MEDIA_GOOGLE_CLIENT_SECRET,
} = process.env;

const { GoogleSDK } = require("../api-sdk");
console.log({
  clientId: SOCIAL_MEDIA_GOOGLE_CLIENT_ID,
  clientSecret: SOCIAL_MEDIA_GOOGLE_CLIENT_SECRET
})
const sdk = new GoogleSDK({
  clientId: SOCIAL_MEDIA_GOOGLE_CLIENT_ID,
  clientSecret: SOCIAL_MEDIA_GOOGLE_CLIENT_SECRET
});

(async function () {
  try {
    const url = "https://hbexpert.gsmediagroup.net/"; // req.body.url;
    const scopes = [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/adwords",
    ];

    const authUrl = await sdk.generateAuthUrl(url, scopes);
    console.log("Auth URL:", { authUrl });
  } catch (e) {
    console.log("Failed to generate auth url:", e);
  }
})();
