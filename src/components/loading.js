import auth from "auth";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  chatRepository,
  roomRepository,
  toggleState,
  userState,
} from "repository";
import profile from "image/profile.png";
import { socket } from "socket";
export const Loading = () => {
  const [isLoad, setLoad] = useRecoilState(toggleState("loadData"));
  const [isUserLoad, setUserLoad] = useState(false);
  const [isServerLoad, setServerLoad] = useState(false);
  const setUserState = useSetRecoilState(userState);
  const initRoom = useSetRecoilState(roomRepository);
  const initChat = useSetRecoilState(chatRepository);
  const [userText, setUserText] = useState("loading user data");
  const [serverText, setServerText] = useState("loading server data");
  useEffect(() => {
    if (!isLoad) {
      if (!isUserLoad) {
        auth.onAuthStateChanged((user) => {
          if (user) {
            setUserState({
              isLogin: true,
              uid: user.uid,
              email: user.email,
              name: user.displayName,
              photo: user.photoURL ?? profile,
            });
          }
          setUserLoad(true);
          setUserText("complete");
        });
      }
      if (!isServerLoad) {
        socket.on("initialize", ([roomData, chatData]) => {
          initRoom(roomData);
          initChat(chatData);
          setServerLoad(true);
          setServerText("complete");
          socket.off("initialize");
        });
      }
    }
    if (isServerLoad && isUserLoad) {
      setLoad(true);
    }
  }, [isServerLoad, isUserLoad]);
  return (
    <div className="loading flex">
      <h1> LOADING...</h1>
      <i className="xi-spinner-3 xi-spin"></i>
      <p>{serverText}</p>
      <p>{userText}</p>
    </div>
  );
};
