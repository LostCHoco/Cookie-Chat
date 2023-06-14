export const signInError = (e) => {
  const errors = [
    { name: "email", msg: "가입되지 않은 이메일입니다." },
    { name: "password", msg: "비밀번호가 잘못되었습니다." },
  ];
  errors.forEach((error) => {
    if (e.code.includes(error.name)) {
      console.log(error.msg);
    }
  });
};
