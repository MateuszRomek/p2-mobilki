import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import Constants from "expo-constants";

export const config: FirebaseOptions = {
  apiKey: Constants.manifest?.extra?.firebaseApiKey,
  authDomain: Constants.manifest?.extra?.firebaseAuthDomain,
  projectId: Constants.manifest?.extra?.firebaseProjectId,
  storageBucket: Constants.manifest?.extra?.firebaseStorageBucket,
  messagingSenderId: Constants.manifest?.extra?.firebaseMessagingSenderId,
  appId: Constants.manifest?.extra?.firebaseAppId,
};

const app = initializeApp(config);

export const auth = getAuth(app);
