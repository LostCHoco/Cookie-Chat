# Cookie Chat

**:link:[배포 주소](https://cookiechat-4df6b.web.app/)**

## 목차

* [개발동기](#개발-동기) 
* [기술스택](#기술-스택) 
* [상세내용](#상세-내용) 
* [트러블슈팅](#트러블슈팅)

## 개발 동기

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

## 상세 내용

<details><summary>프로젝트 설계</summary>
<p>

- 클라이언트에서 npm을 통해 설치된 모듈(package.json)[^d1]
- 
  ```json
  "dependencies": {
  "firebase": "^9.22.1",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-icons": "^4.10.1",
  "react-router-dom": "^6.11.1",
  "react-scripts": "5.0.1",
  "recoil": "^0.7.7",
  "socket.io-client": "^4.6.2"
    }
  ```

  - firebase : 파이어베이스 api를 통해 회원가입, 로그인, 세션과 관련된 함수 사용
  - react/react-dom :
  - react-icons : CSS 에서 배경을 제외한 이미지의 색상만 변경하기 위해서 SVG를 이용해야 하는데, react-icons 는 이미 만들어진 아이콘들이 리액트 컴포넌트로 되어있어서 아이콘 이미지를 가져와 사용할 수 있음
  - react-router-dom : react-create-app 을 통해 생성된 리액트 프로젝트는 기본적으로 SPA 이기 때문에 웹 앱의 경로가 루트("/") 하나 밖에 존재하지 않음. 웹 페이지가 여러 개라면 각 페이지마다 라우팅을 해서 각 경로로 접속하면 해당 페이지가 나올 수 있게 해야 하는데, react-router-dom 을 통해 경로를 지정해주면 쉽게 해결 가능
  - react-scripts : react-create-app 으로 만들어진 프로젝트는 용량이 매우 큰데, ract-scripts 에서 build 명령어를 통해 프로젝트의 용량을 대폭 줄여 배포를 할 수 있음.
  - recoil :
  - socket.io-client :


- 서버에 설치된 모듈
  
  ```json
  "dependencies": {
    "nodemon": "^2.0.22",
    "socket.io": "^4.6.2"
  }
  ```

  - nodemon :
    socket.io :

[^d1]: 클라이언트 쪽의 프로젝트는 npx의 react-create-app을 통해 리액트 프로젝트를 생성

</p>
</details>

<details><summary>회원가입 및 로그인</summary>
<p>
  
- 회원가입/로그인 유효성 검사, DB에서 사용자 등록/관리/삭제, 로그인 상태를 유지하기 위한 세션 관리 등을 파이어베이스에서 담당.
  
- 사용자 관리를 위해 파이어베이스를 선택한 이유는 보안이 가장 큰데, 처음에는 오라클을 통해서 사용자/세션 등을 관리하려 했지만 비밀번호 같은 민감한 정보가 노출될 우려가 있어서 보안 기능이 갖추어져 있는 파이어베이스를 선택함.
  
- 클라이언트에서 관리자 계정의 파이어베이스 서버에 접속하기 위해서는 파이어베이스 api 키를 불러와야 하는데, 이를 그대로 클라이언트 소스 코드에 넣을 경우 이에 쉽게 접근할 수 있어서 dotenv[^d2]를 활용
  * 외부 사용자가 확인 가능한 파이어베이스 구성 요소
    
    ```javascript
    const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
    };
    ```

  * .env 파일에 환경변수로 저장되어있는 파이어베이스 구성 요소[^d3]
    
    ```env
    REACT_APP_APIKEY = xxxxxx
    REACT_APP_AUTH_DOMAIN = xxxxxx
    REACT_APP_PROJECT_ID = xxxxxx
    REACT_APP_STORAGE_BUCKET = xxxxxx
    REACT_APP_MESSAGIN_ID = xxxxxx
    REACT_APP_APP_ID = xxxxxx
    REACT_APP_MEASUREMENT_ID = xxxxxx
    ```

  [^d2]: dotenv는 react-create-app 을 통해 리액트 프로젝트를 생성할 경우 자동으로 설치되며, 기존 dotenv와는 다르게 환경변수명을 정할 때 "REACT_APP"이 접두사로 포함이 되어있어야 함.
  [^d3]: 파이어베이스에 등록된 자신의 프로젝트 내에서 확인 가능
  
</p>
</details>

<details><summary>채팅방 생성</summary>
<p>

</p>
</details>
<details><summary>채팅창</summary>
<p>

</p>
</details>
<details><summary>그 외</summary>
<p>

</p>
</details>

## 트러블슈팅

<!-- ```javascript
   const a = 1;
   console.log(a);
``` -->
