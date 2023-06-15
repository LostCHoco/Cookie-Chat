import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { Home, SignIn, SignUp, Room } from "view";
import Test from "test";
import "./css/common.css";
import auth from "auth";
import { onAuthStateChanged } from "firebase/auth";
import { userState } from "loginState";
import profile from "image/profile.png";

const App = () => {
  const setUserState = useSetRecoilState(userState);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserState({
          isLogin: true,
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          photo: user.photoURL ?? profile,
        });
      }
    });
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/room" element={<Room />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
