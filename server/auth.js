import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import "dotenv/config";

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGIN_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};
const app = initializeApp({}, firebaseConfig);
export const auth = getAuth(app);
