import auth from "auth";

const Test = () => {
  function action() {
    auth.onAuthStateChanged((user) => {
      console.log(user);
    });
  }
  return (
    <>
      <h1>TEST PAGE</h1>
      <button type="button" onClick={action}>
        버튼
      </button>
    </>
  );
};

export default Test;
