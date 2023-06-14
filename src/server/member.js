//repository

import { getIdSet, getMemberData } from "./firebase";

const Member = {
  idSet: null,

  getIdSet: async () => {
    Member.idSet = await getIdSet();
    // console.log("데이터베이스 검색 완료");
  },

  checkLogin: async ($id = "", $password = "") => {
    const loginData = {
      id: $id,
      password: $password,
    };
    await Member.getIdSet();

    if (!Member.idSet.includes(loginData.id)) {
      console.log("없는 아이디입니다.");
      return false;
    }

    const data = await getMemberData(loginData.id);

    if (data.password !== loginData.password) {
      console.log("비밀번호가 일치하지 않습니다.");
      return false;
    } else {
      console.log(`${data.nickname} 님 환영합니다!`);
      return true;
    }
  },
};

export default Member;
