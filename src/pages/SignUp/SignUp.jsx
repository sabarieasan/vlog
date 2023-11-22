import "./SignUp.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    signup();
  };

  const signup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);

        const collectionRef = doc(db, "users", user.uid);

        setDoc(collectionRef, {
          id: user.uid,
          firstName: "NULL",
          lastName: "NULL",
          image: "NULL",
          email: user.email,
          gender: "NULL",
          age: "NULL",
          phoneNo: "NULL",
        });

        setEmail("");
        setPassword("");
        navigate("/login");
      })

      .catch((error) => {
        console.log(error.Message);
        console.log(error.Code);
      });
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <h1>sign up</h1>
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
        <button type="submit" className="submit-button">
          Sign Up
        </button>

        <div className="login-box">
          <span>
            Already have an account?
            <Link to="/login"> Login</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
