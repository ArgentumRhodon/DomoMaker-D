const helper = require("./helper");
const React = require("react");
const { createRoot } = require("react-dom/client");

const handleLogin = (e) => {
  e.preventDefault();
  helper.hideError();

  const username = e.target.querySelector("#user").value;
  const pass = e.target.querySelector("#pass").value;

  if (!username || !pass) {
    helper.handleError("Username or password is empty!");
    return false;
  }

  helper.sendPost(e.target.action, { username, pass });
  return false;
};

const handleSignup = (e) => {
  e.preventDefault();
  helper.hideError();

  const username = e.target.querySelector("#user").value;
  const pass = e.target.querySelector("#pass").value;
  const pass2 = e.target.querySelector("#pass2").value;

  if (!username || !pass || !pass2) {
    helper.handleError("All fields required!");
    return false;
  }

  if (pass !== pass2) {
    helper.handleError("Passwords do not match!");
    return false;
  }

  helper.sendPost(e.target.action, { username, pass, pass2 });
  return false;
};

const LoginWindow = (props) => {
  return (
    <form
      action="/login"
      id="loginForm"
      name="loginForm"
      onSubmit={handleLogin}
      method="POST"
      className="mainForm"
    >
      <label htmlFor="username">Username: </label>
      <input id="user" type="text" name="username" placeholder="username" />
      <label htmlFor="pass">Password: </label>
      <input id="pass" type="password" name="pass" placeholder="password" />
      <input type="submit" className="formSubmit" value="Sign in" />
    </form>
  );
};

const SignupWindow = (props) => {
  return (
    <form
      action="/signup"
      method="POST"
      id="signupForm"
      name="signupForm"
      onSubmit={handleSignup}
      className="mainForm"
    >
      <label htmlFor="username">Username: </label>
      <input id="user" type="text" name="username" placeholder="username" />
      <label htmlFor="pass">Password: </label>
      <input id="pass" type="password" name="pass" placeholder="password" />
      <label htmlFor="pass2">Password: </label>
      <input
        id="pass2"
        type="password"
        name="pass2"
        placeholder="retype password"
      />
      <input type="submit" className="formSubmit" value="Sign up" />
    </form>
  );
};

const init = () => {
  const loginButton = document.getElementById("loginButton");
  const signupButton = document.getElementById("signupButton");

  const root = createRoot(document.getElementById("content"));

  loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    root.render(<LoginWindow />);
    return false;
  });

  signupButton.addEventListener("click", (e) => {
    e.preventDefault();
    root.render(<SignupWindow />);
    return false;
  });

  root.render(<LoginWindow />);
};

window.onload = init;