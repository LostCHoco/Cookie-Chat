const JoinRoom = () => (
  <div className="joinroom">
    <h4>&nbsp;</h4>
  </div>
);

const JoinList = () => (
  <div className="joinlist">
    <h3>참여 중인 채팅방</h3>
    <JoinRoom />
  </div>
);

const LoginUser = () => (
  <div className="login_user">
    <h4>&nbsp;</h4>
  </div>
);

const LoginUsers = () => (
  <div className="login_users">
    <h3>접속 유저</h3>
    <LoginUser />
  </div>
);

const Aside = () => {
  return (
    <aside>
      <JoinList />
      <LoginUsers />
    </aside>
  );
};

export default Aside;
