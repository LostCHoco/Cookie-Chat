import { atom, atomFamily, selector } from "recoil";

export const defaultState = {
  uid: "",
  name: "",
  photo: "",
};

export const userState = atom({
  key: "userState",
  default: defaultState,
});

export const loginState = selector({
  key: "loginState",
  get: ({ get }) => {
    const data = get(userState);
    const isLogin = data.name !== "" || data.uid !== "";
    return isLogin;
  },
});
export const setNickname = selector({
  key: "setNickname",
  get: ({ get }) => {
    return get(userState);
  },
  set: ({ set, get }, value) => {
    const user = get(userState);
    set(userState, {
      uid: user.uid,
      name: value,
      photo: user.photo,
    });
  },
});

export const toggleState = atomFamily({
  key: "toggleState",
  default: false,
});
export const stringState = atomFamily({
  key: "stringState",
  default: "",
});
export const arrayState = atomFamily({
  key: "arrayState",
  default: [],
});

export const roomRepository = atom({
  key: "roomRepository",
  default: [],
});
export const getRoomsLength = selector({
  key: "getRoomRepositoryLength",
  get: ({ get }) => {
    const rooms = get(roomRepository);
    return rooms.length;
  },
});
// export const getNameArray = selector({
//   key: "getNameArray",
//   get: ({ get }) => {
//     const { userList } = get(roomRepository);
//     return Object.values(userList);
//   },
// });
export const chatRepository = atom({
  key: "chatRepository",
  default: {},
});
