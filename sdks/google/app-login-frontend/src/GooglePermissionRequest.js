import React, { Component } from "react";

const STATUS_NO_WINDOW = "no_window";
const STATUS_LOADING = "loading";
const STATUS_READY = "ready";
const STATUS_ERROR = "error";
const STATUS_PROCESSING = "processing";
const STATUS_DONE = "done";
const STATUS_FAILED = "failed";

const FETCH_MANUAL = "manual";
const FETCH_AUTO = "auto";
const FETCH_SILENT = "silent";

class GooglePermissionRequest extends Component {
  static defaultProps = {
    fetch: FETCH_AUTO,
  };

  winPermission = null;
  
  configs = {
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    scopes: ["profile", "email"],
  };

  state = {
    sdkStatus: STATUS_LOADING,
    sdkReady: false,
  };

  constructor(props) {
    super(props);

    if ("function" !== typeof props.onLogin) {
      throw new Error('"onLogin" callback is required.');
    }

    this.start = this.start.bind(this);
  }

  componentDidMount() {
    if (!window) {
      this.setState({ sdkStatus: STATUS_NO_WINDOW });
      return;
    }

    if (window.opener) {
      const code = this.getQueryParam("code");
      const scopes = this.getQueryParam("scope");

      const response = {};
      if (code) {
        response.status = "success";
        response.code = code;
        response.scopes = scopes?.split(" ").map((item) => decodeURIComponent(item));
      } else {
        response.status = "error";
        // ...
      }

      window.opener.onPermissionResult(response);
    } else {
      window.onPermissionResult = (response) => {
        this.winPermission.close();
        this.winPermission = null;
        window.onPermissionResult = null;

        this.onPermissionDone(response);
      };

      const { fetch } = this.props;
      if ([FETCH_AUTO, FETCH_SILENT].includes(fetch)) {
        this.start();
      } else {
        this.setState({ sdkStatus: STATUS_READY });
      }
    }
  }
  
  generateAuthUrl() {
    try {
      const result = await http.api(this.props.requests.generateAuthUrl).send({
        redirectAuthUrl: this.getRedirectUrl(),
      });

      return {
        status: "success",
        url: result.authUrl,
      };
    } catch (e) {
      return {
        status: "failed",
        url: null,
      };
    }
  }
  
  async start() {
    const data = await this.generateAuthUrl();
    if (data.status != "success") {
      return this.props.onResult(false, null);
    }

    this.popup({ url: data.url, title: "Google", width: 392, height: 620 });
  }

  beforeSave(response, onReady) {
    if (response.status != "success") {
      return false;
    }

    const result = await this.fetchAccessToken(response.code);
    if (result.status != "success") {
      return false;
    }

    const userId = await this.getGoogleUserId();
    onReady(result, userId);

    return true;
  }

  onPermissionDone(response) {
    let result = {};
    let userId = 0;

    const onReady = (_result, _userId) => {
      result = _result;
      userId = _userId;
    };

    this.trySave(
      this.props.requests.setToken,
      () => ({
        tokens: result.tokens,
        userId: userId,
      }),
      () => this.beforeSave(response, onReady),
    );
  }

  async fetchAccessToken(authorizationCode) {
    try {
      const result = await http.api(this.props.requests.fetchTokens).send({
        authorizationCode,
        redirectAuthUrl: this.getRedirectUrl(),
      });

      return {
        status: "success",
        tokens: result.tokens,
      };
    } catch (e) {
      return {
        status: "failed",
        tokens: {},
      };
    }
  }

  async getGoogleUserId() {
    try {
      return 0;
    } catch (e) {
      return null;
    }
  }

  renderBlock(child) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: 280,
          height: 70,
          border: "1px solid",
          borderRadius: "8px",
        }}
      >
        {child}
      </div>
    );
  }

  render() {
    const { sdkStatus } = this.state;
    const { fetch } = this.props;

    if (FETCH_SILENT === fetch) {
      return null;
    }

    if (STATUS_READY === sdkStatus) {
      return this.renderBlock(
        <button onClick={this.start}>Get access token</button>
      );
    }

    const texts = {
      [STATUS_ERROR]: "Something went wrong.",
      [STATUS_LOADING]: "Loading ...",
      [STATUS_PROCESSING]: "Processing ...",
      [STATUS_DONE]: "Access token sucessfully fetched.",
      [STATUS_FAILED]: "Failed to fetch access token.",
    };

    return !texts.hasOwnProperty(sdkStatus)
      ? null
      : this.renderBlock(texts[sdkStatus]);
  }
}

export default GooglePermissionRequest;
