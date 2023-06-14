const Aside = () => {
  const JoinList = () => {
    const JoinRoom = () => {
      return (
        <div className="joinroom">
          <h4>&nbsp;</h4>
        </div>
      );
    };

    return (
      <div className="joinlist">
        <h3>
          <span>▼</span>참여 중인 채팅방
        </h3>
        <JoinRoom />
      </div>
    );
  };

  const LoginUsers = () => {
    const LoginUser = () => {
      return (
        <div className="login_user">
          <h4>&nbsp;</h4>
        </div>
      );
    };

    return (
      <div className="login_users">
        <h3>접속 유저</h3>
        <LoginUser />
      </div>
    );
  };

  return (
    <aside>
      <JoinList />
      <LoginUsers />
    </aside>
  );
};

export default Aside;
