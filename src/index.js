import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  RecoilRoot,
  useRecoilState,
  useSetRecoilState,
} from "recoil";
import { SignIn, SignUp, Room, NotFound, WaitingRoom, Home} from "view";
import { roomRepository, toggleState } from "repository";
import { Loading } from "components/loading";
import { socket } from "socket";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/room" element={<WaitingRoom />} />
        <Route path="/room/:id" element={<Room />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => {
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
