import { BiSolidLockAlt, BiSolidLockOpenAlt } from "react-icons/bi";
// import { MdEmail, MdOutlinePeopleAlt, MdOutlineSearch } from "react-icons/md";
// import { Link } from "react-router-dom";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "repository";
// const SettingButton = () => (
//   // 설정 버튼 컴포넌트
//   <Link to="/user" className="button flex">
//     설정
//   </Link>
// );
const Logout = ({ logout }) => (
  //로그아웃 버튼 컴포넌트
  <button type="button" className="button" onClick={logout}>
    로그아웃
  </button>
);

export const Profile = ({ logout }) => {
  const { photo } = useRecoilValue(userState);
  const [profileClass, setClass] = useState("profile");
  function toggleSetting() {
    if (profileClass === "profile") {
      setClass("profile active");
    } else {
      setClass("profile");
    }
  }
  //유저 프로필 컴포넌트 렌더링
  return (
    <div className={profileClass}>
      {photo !== "" ? (
        <img src={photo} alt="profile" onClick={toggleSetting} />
      ) : (
        <i className="xi-profile" onClick={toggleSetting}></i>
      )}
      {/* <img
        src={photo !== "" ? photo : profile}
        alt="profile"
        onClick={toggleSetting}
      /> */}
      <div className="user_setting_box flex">
        {/* <SettingButton /> */}
        <Logout logout={logout} />
      </div>
    </div>
  );
};
export const SubProfile = ({ photo = "" }) => (
  //유저 아이콘 컴포넌트
  <div className="sub_profile">
    {photo !== "" ? (
      <img src={photo} alt="profile" />
    ) : (
      <i className="xi-profile"></i>
    )}
  </div>
);
/* 각 아이콘 컨테이너 컴포넌트 */
// export const Search = () => {
//   return (
//     <div className="search">
//       <MdOutlineSearch/>
//     </div>
//   );
// };

// export const Mail = () => {
//   return (
//     <div className="mail">
//       <MdEmail/>
//     </div>
//   );
// };

// export const Friend = () => {
//   return (
//     <div className="friend">
//       <MdOutlinePeopleAlt/>
//     </div>
//   );
// };

export const Lock = () => {
  return (
    <div className="lock lock_prop">
      <BiSolidLockAlt />
    </div>
  );
};

export const Unlock = () => {
  return (
    <div className="unlock lock_prop">
      <BiSolidLockOpenAlt />
    </div>
  );
};
