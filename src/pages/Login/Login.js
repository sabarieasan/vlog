import "./Login.css";
import { useState } from "react";
import { auth, provider } from "../../firebase-config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useBlogContext } from "../../context/blogContext";

function Login() {
  const { setIsLogin, setLoginUser, loginUser } = useBlogContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      const user = result;
      setLoginUser(user.uid);
      setIsLogin(true);
      navigate("/");
    });
  };

  const login = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        setLoginUser(user.uid);

        setIsLogin(true);
        navigate("/");

        localStorage.setItem("user", JSON.stringify(user.providerData[0]));
        localStorage.setItem("isLogin", JSON.stringify(true));
      })
      .catch((err) => {
        console.log("An error occured", err.message);
      });
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="sign-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button" onClick={login}>
          Log In
        </button>
        <button className="submit-button" onClick={signInWithGoogle}>
          Sign in with Google
        </button>
      </form>

      <div className="signup-box">
        <span>
          Don't have an account?<Link to="/">Signup</Link>
        </span>
      </div>
    </div>
  );
}

export default Login;
