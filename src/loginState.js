import { atom } from "recoil";
import profile from "image/profile.png";

export const defaultState = {
  isLogin: false,
  uid: "",
  email: "",
  name: "",
  photo: profile,
};

export const userState = atom({
  key: "userstate",
  default: defaultState,
});
