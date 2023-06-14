import { atom } from "recoil";

export const userState = atom({
  key: "userstate",
  default: {
    islogin: false,
    UID: "",
    email: "",
    name: "",
  },
});
