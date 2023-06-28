import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { SignIn, SignUp, Room, NotFound, WaitingRoom } from "view";
import Test from "test";
import "./css/common.css";
import { loginState, roomRepository, toggleState } from "repository";
import { Loading } from "components/loading";
import { socket } from "socket";

const Router = () => {
  const isLogin = useRecoilValue(loginState);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLogin ? <WaitingRoom /> : <SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/room" element={<WaitingRoom />} />
        <Route path="/room/:id" element={<Room />} />
        <Route path="/test" element={<Test />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => {
  console.log("app");
  const [isLoad, setLoad] = useRecoilState(toggleState("loadData"));
  const setRoomData = useSetRecoilState(roomRepository);
  socket.off("update-room");
  socket.on("update-room", (roomData) => {
    setRoomData(roomData);
  });
  socket.off("disconnect");
  socket.on("disconnect", () => {
    setLoad(false);
  });

  return isLoad ? <Router /> : <Loading />;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
