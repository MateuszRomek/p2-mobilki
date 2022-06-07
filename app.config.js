import "dotenv/config";

export default {
  name: "p2 mobile",
  version: "1.0.0",
  extra: {
    firebaseApiKey: process.env.REACT_APP_API_KEY,
    firebaseAuthDomain: process.env.REACT_APP_AUTH_DOMAIN,
    firebaseProjectId: process.env.REACT_APP_PROJECT_ID,
    firebaseStorageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    firebaseMessagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    firebaseAppId: process.env.REACT_APP_APP_ID,
  },
};
