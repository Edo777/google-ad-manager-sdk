const { execSync } = require("child_process");
const path = require("path");
const commands = require("./commands");

const pythonLibPath = path.join(__dirname, "python");
const pythonCachePath = path.join(pythonLibPath, ".cache", "__pycache__");

const toValidArgument = function (value) {
    return Buffer.from(value).toString("base64");
};

const makePyExecWithApi = function (api, pythonShellLogging) {
    return function (command) {
        return function (args = null) {
            const {
                _clientId,
                _clientSecret,
                _developerToken,
                _accessToken,
                _refreshToken,
                _loginCustomerId,
                _clientCustomerId,
                _yamlFilePath,
            } = api;

            return new Promise(function (resolve, reject) {
                try {
                    const _request = toValidArgument(JSON.stringify(args || {}));
                    const _command = toValidArgument(command);

                    const response = execSync(`python3 exec.py '${_command}' '${_request}'`, {
                        cwd: pythonLibPath,
                        encoding: "utf-8",
                        stdio: "pipe",
                        maxBuffer: 50 * 1024 * 1024,
                        env: {
                            PYTHONPYCACHEPREFIX: pythonCachePath,
                            ENV_OAUTH_CLIENT_ID: _clientId,
                            ENV_OAUTH_CLIENT_SECRET: _clientSecret,
                            ENV_DEVELOPER_TOKEN: _developerToken,
                            ENV_ACCESS_TOKEN: _accessToken,
                            ENV_REFRESH_TOKEN: _refreshToken,
                            ENV_LOGIN_CUSTOMER_ID: _loginCustomerId,
                            ENV_CLIENT_CUSTOMER_ID: _clientCustomerId,
                            ENV_YAML_FILE_PATH: _yamlFilePath,
                            ENV_DEBUG_LOGGING: pythonShellLogging,
                        },
                    });
                    
                    if (pythonShellLogging) {
                        console.log();
                        console.log("------------------------------------------------");
                        console.log("-- Python Shell Response -----------------------");
                        console.log(response);
                        console.log("------------------------------------------------");
                        console.log();
                    }

                    const result = JSON.parse(response);
                    if (result.status == "success") {
                        resolve(result.result);
                    } else {
                        reject(new Error(result.message));
                    }
                } catch (error) {
                    reject(error);
                }
            });
        };
    };
};

/**
 * GoogleBusinessSDK constructor.
 * @param {String} clientId
 * @param {String} clientSecret
 * @param {String} developerToken
 * @param {String} loginCustomerId
 * @param {String} accessToken
 * @param {String} refreshToken
 * @param {String} clientCustomerId
 */
const GoogleBusinessSDK = function (
    clientId,
    clientSecret,
    developerToken,
    loginCustomerId,
    accessToken,
    refreshToken,
    clientCustomerId = "",
    yamlFilePath
) {
    this._clientId = clientId;
    this._clientSecret = clientSecret;
    this._developerToken = developerToken;
    this._loginCustomerId = loginCustomerId;
    this._accessToken = accessToken;
    this._refreshToken = refreshToken;
    this._clientCustomerId = clientCustomerId;
    this._yamlFilePath = yamlFilePath
};

/**
 * Initiate GoogleBusinessSDK constructor.
 * @param {null|any} parentSdk
 * @param {String} clientId
 * @param {String} clientSecret
 * @param {String} developerToken
 * @param {String} loginCustomerId
 * @param {String} accessToken
 * @param {String} refreshToken
 * @param {String} clientCustomerId
 */
GoogleBusinessSDK.init = function (
    parentSdk,
    clientId,
    clientSecret,
    developerToken,
    loginCustomerId,
    accessToken,
    refreshToken,
    clientCustomerId = "",
    yamlFilePath,
    pythonShellLogging = false
) {
    const api = new GoogleBusinessSDK(
        clientId,
        clientSecret,
        developerToken,
        loginCustomerId,
        accessToken,
        refreshToken,
        clientCustomerId,
        yamlFilePath
    );

    const makePyExec = makePyExecWithApi(api, pythonShellLogging);
    Object.keys(commands).forEach(function (key) {
        if (!parentSdk.hasOwnProperty(key)) {
            parentSdk[key] = {};
        }

        Object.keys(commands[key]).forEach(function (command) {
            parentSdk[key][command] = makePyExec(commands[key][command]);
        });
    });

    return api;
};

/**
 * Set login customer id.
 * @param {String} loginCustomerId
 */
GoogleBusinessSDK.prototype.setLoginCustomerId = function (loginCustomerId) {
    this._loginCustomerId = loginCustomerId;
};

/**
 * Set client customer id.
 * @param {String} loginCustomerId
 */
GoogleBusinessSDK.prototype.setClientCustomerId = function (clientCustomerId) {
    this._clientCustomerId = clientCustomerId;
};

/**
 * Set access token.
 * @param {String} accessToken
 */
GoogleBusinessSDK.prototype.setAccessToken = function (accessToken) {
    this._accessToken = accessToken;
};

/**
 * Set refresh token.
 * @param {String} refreshToken
 */
GoogleBusinessSDK.prototype.setRefreshToken = function (refreshToken) {
    this._refreshToken = refreshToken;
};

module.exports = GoogleBusinessSDK;
