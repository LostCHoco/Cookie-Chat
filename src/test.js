import auth from "auth";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
const provider = new GoogleAuthProvider();
const Test = () => {
  function login() {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(errorCode);
      });
  }
  return (
    <>
      <h1>TEST PAGE</h1>
      <form className="google_login">
        <button type="button" onClick={login}>
          구글 로그인
        </button>
      </form>
    </>
  );
};

export default Test;
