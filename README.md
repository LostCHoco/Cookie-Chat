# Cookie Chat

**:link:[배포 주소](https://cookiechat-4df6b.web.app/)**


테스트용 아이디/비밀번호 : test1@gmail.com(아이디) / 131313(비밀번호)

## 기술 스택

- ### IDE(개발 환경)
  
  - **Visual Studio Code**

- ### 프론트엔드

  - **HTML, CSS, JavaScript** : 웹으로 어플리케이션을 만들기 위한 용도
  - **React.js** : 동적 웹을 구현하기 위한 용도
  - **Recoil.js** : 서버측에서 받은 데이터를 클라이언트에 저장하는 용도

- ### 백엔드

  - **Node.js** : 채팅 방, 채팅 기록 저장

- ### 통신(프론트엔드 - 백엔드)

  - **Socket.IO** : 실시간 채팅을 구현하기 위한 용도

- ### 인증

  - **Firebase** : 가입된 유저를 파이어베이스 DB[^1]에 저장, 로그인 상태 유지
[^1]: FireStore/Realtime DB가 아니라 Authentication에 사용자를 저장
