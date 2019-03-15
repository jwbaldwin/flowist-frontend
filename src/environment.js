const dev = {
  s3: {
    BUCKET: "dev.flowist.frontend"
  },
  api: {
    FLOWS_ENDPOINT: "/api/flows",
    USER_ENDPOINT: "/api/user",
    SETTINGS_ENDPOINT: "/api/settings"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_ovXfMEfAs",
    APP_CLIENT_ID: "3d1rvq32rr10gdbm6rpegfi7v1",
    IDENTITY_POOL_ID: ""
  }
};

const prod = {
  s3: {
    BUCKET: "prod.flowist.frontend"
  },
  api: {
    FLOWS_ENDPOINT: "/api/flows",
    USER_ENDPOINT: "/api/user",
    SETTINGS_ENDPOINT: "/api/settings"
  },
  cognito: {
    REGION: "YOUR_PROD_COGNITO_REGION",
    USER_POOL_ID: "YOUR_PROD_COGNITO_USER_POOL_ID",
    APP_CLIENT_ID: "YOUR_PROD_COGNITO_APP_CLIENT_ID",
    IDENTITY_POOL_ID: "YOUR_PROD_IDENTITY_POOL_ID"
  }
};

const environment = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  ...environment
};
