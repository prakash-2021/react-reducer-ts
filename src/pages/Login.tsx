import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userAccout } from "../redux/slice/userAccountSlice";

const Login: Function = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const storedProfile: {
    username: string;
    password: string;
  } = JSON.parse(localStorage.getItem("profile") || "{}");

  const handleLogin = () => {
    if (
      storedProfile.username === null ||
      storedProfile.username === undefined
    ) {
      const profile = { username, password };
      localStorage.setItem("profile", JSON.stringify(profile));
      return navigate("/");
    } else if (
      storedProfile.username === username &&
      storedProfile.password === password
    ) {
      dispatch(userAccout(storedProfile));
      // login();
      return navigate("/");
    } else {
      setErrorMessage("please type correct username and password");
    }
  };

  return (
    <div className="login">
      <div>
        <span>Username</span>{" "}
        <input
          type="text"
          className="w3-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <span>Password</span>{" "}
        <input
          type="password"
          className="w3-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <p className="color-red">
        <i>{errorMessage}</i>
      </p>

      <button className="btn--primary" onClick={handleLogin}>
        <span>Login</span>
      </button>
    </div>
  );
};

export default Login;
