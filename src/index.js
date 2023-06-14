import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Home, SignIn, SignUp, Room } from "./components/view";
import "./css/common.css";

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/room" element={<Room />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
