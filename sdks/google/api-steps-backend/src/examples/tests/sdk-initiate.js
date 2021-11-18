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
console.log(GOOGLE_YAML_FILE_PATH)

module.exports = new GoogleSDK({
    clientId: SOCIAL_MEDIA_GOOGLE_CLIENT_ID,
    clientSecret: SOCIAL_MEDIA_GOOGLE_CLIENT_SECRET,
    developerToken: SOCIAL_MEDIA_GOOGLE_DEVELOPER_TOKEN,
    loginCustomerId: TMP_GOOGLE_LOGIN_CUSTOMER_ID,
    accessToken: TMP_GOOGLE_ACCESS_TOKEN,
    refreshToken: TMP_GOOGLE_REFRESH_TOKEN,
    clientCustomerId: TMP_GOOGLE_CLIENT_CUSTOMER_ID,
    yamlFilePath: GOOGLE_YAML_FILE_PATH
});