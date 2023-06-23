import { atom, atomFamily, selector, selectorFamily } from "recoil";
import profile from "image/profile.png";
import { RoomEntrance } from "components/rooms";

export const defaultState = {
  uid: "",
  name: "",
  photo: profile,
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
// const arraySelector = selectorFamily({
//   key: "arraySelector",
//   get:(key)=>({get})=>{
//     const arr = get(arrayState(key));

//   }
// })

export const roomRepository = atom({
  key: "roomRepository",
  default: [],
});

export const getRooms = selector({
  key: "getRooms",
  get: ({ get }) => {
    const rooms = get(roomRepository);
    return rooms.map((room) => {
      const { id, max, password, title } = room;
      const isLock = password === "" ? false : true;
      return (
        <RoomEntrance
          key={id}
          id={id}
          max={max}
          title={title}
          isLock={isLock}
        />
      );
    });
  },
});
export const chatRepository = atom({
  key: "chatRepository",
  default: {},
});
