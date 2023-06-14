import profile from "../image/profile.png";
import search from "../image/search.png";
import mail from "../image/mail.png";
import friend from "../image/friend.png";
import lock from "../image/lock.png";
import unlock from "../image/unlock.png";
import { Link } from "react-router-dom";
import { useState } from "react";
const Setting = () => (
  <Link to="/" className="button flex">
    설정
  </Link>
);
const Logout = ({ logout }) => {
  return (
    <button type="button" className="button" onClick={logout}>
      로그아웃
    </button>
  );
};

export const Profile = ({ logout }) => {
  const [profileClass, setClass] = useState("profile");
  function toggleSetting() {
    if (profileClass === "profile") {
      setClass("profile active");
    } else {
      setClass("profile");
    }
  }
  return (
    <div className={profileClass}>
      <img src={profile} alt="profile" onClick={toggleSetting} />
      <div className="user_setting_box flex">
        <Setting />
        <Logout logout={logout} />
      </div>
    </div>
  );
};
export const SubProfile = () => {
  return (
    <div className="sub_profile">
      <img src={profile} alt="profile" />
    </div>
  );
};

export const Search = () => {
  return (
    <div className="search">
      <img src={search} alt="search" />
    </div>
  );
};

export const Mail = () => {
  return (
    <div className="mail">
      <img src={mail} alt="mail" />
    </div>
  );
};

export const Friend = () => {
  return (
    <div className="friend">
      <img src={friend} alt="friend" />
    </div>
  );
};

export const Lock = () => {
  return (
    <div className="lock">
      <img src={lock} alt="lock" />
    </div>
  );
};

export const Unlock = () => {
  return (
    <div className="unlock">
      <img src={unlock} alt="unlock" />
    </div>
  );
};
