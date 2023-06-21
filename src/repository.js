import { atom, atomFamily } from "recoil";
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

export const toggleState = atomFamily({
  key: "toggleState",
  default: false,
});

export const roomRepository = atom({
  key: "roomRepository",
  default: [],
});

export const chatRepository = atom({
  key: "chatRepository",
  default: {},
});
