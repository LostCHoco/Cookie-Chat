export const signError = (e) => {
  let msg = "";
  if (e.code.includes("email")) {
    msg = "이메일 형식으로 입력해주세요.";
  } else if (e.code.includes("weak")) {
    msg = "6자리 이상의 비밀번호를 입력해주세요.";
  } else {
    msg = "이메일 또는 비밀번호가 잘못되었습니다.";
  }
  return msg;
};
