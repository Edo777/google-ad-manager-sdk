const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });

const {
  SOCIAL_MEDIA_GOOGLE_CLIENT_ID,
  SOCIAL_MEDIA_GOOGLE_CLIENT_SECRET,
  TMP_GOOGLE_ACCESS_TOKEN,
} = process.env;

const { GoogleSDK } = require("../api-sdk");
const sdk = new GoogleSDK({
  clientId: SOCIAL_MEDIA_GOOGLE_CLIENT_ID,
  clientSecret: SOCIAL_MEDIA_GOOGLE_CLIENT_SECRET
});

(async function () {
  try {
    const code =
      "4%2F0AX4XfWipK9qsshzWXHxDRF9u4FFnVgUyCsvqmAZ5q1jR4iGmvH3qixfubSkkagzdTl7eCQ"; // req.body.code;
    const url = "https://localhost:3000"; // req.body.url;

    const result = await sdk.fetchAccessToken(decodeURIComponent(code), url);
    console.log("Access token fetched:", { result });
  } catch (e) {
    console.log("Failed to fetch access token:", e);
  }
})();
