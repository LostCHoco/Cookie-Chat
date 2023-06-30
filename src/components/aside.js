import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { roomRepository } from "repository";
import { SubProfile } from "./icon";

const LoginUser = ({ name, photo }) => (
  //채팅방 참여유저 컴포넌트 렌더링
  <div className="login_user flex">
    <SubProfile photo={photo} />
    <h4>{name}</h4>
  </div>
);

const LoginUsers = ({ userList }) => {
  const checkList = userList.filter((item) => item.isLogin === true);
  return (
    //참여유저 컨테이너 컴포넌트 렌더링
    <div className="login_users">
      <h3>접속 유저</h3>
      {checkList.map((user, idx) => (
        <LoginUser key={idx} name={user.name} photo={user.photo} />
      ))}
    </div>
  );
};

const Aside = () => {
  const { id } = useParams();
  const rep = useRecoilValue(roomRepository);
  const key = rep.findIndex((room) => room.id === id);
  const nameArray = Object.values(rep[key].userList);
  // 채팅방 사이드바 컴포넌트 렌더링
  return (
    <aside>
      <LoginUsers userList={nameArray} />
    </aside>
  );
};

export default Aside;
