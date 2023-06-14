import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const read = async (collection, document) => {
  const docRef = doc(db, collection, document);
  const docSnap = (await getDoc(docRef)).data();
  if (docSnap === undefined) {
    console.log("존재하지 않는 문서입니다.");
  } else {
    return docSnap;
  }
};
// read("DatddSet", "ss");
export const getIdSet = async () => {
  const set = (await read("DataSet", "Meta")).id;
  return set;
};
// getIdSet();

export const getMemberData = async (docID) => {
  const data = await read("member", docID);
  return data;
};

// getMemberData("apple");

export const insert = async ($id, $pwd, $name) => {
  const object = { id: $id, password: $pwd, nickname: $name };
  try {
    await setDoc(doc(db, "CookieChat", "member"), {
      id: object.id,
      password: object.password,
      nickname: object.nickname,
      grade: 1,
    });
    console.log(`유저 정보가 등록되었습니다.`);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
