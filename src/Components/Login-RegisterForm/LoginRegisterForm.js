import React, { useState, useEffect, useContext } from "react";
import "./LoginRegisterForm.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext"; 
import { auth, googleProvider, signInWithPopup, facebookProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "../../Firebase";
import { FaUser, FaGoogle } from 'react-icons/fa';

// Imported Images
import facebook from "../Assets/fb.png";
import twitter from "../Assets/tw.png";
import googleImg from "../Assets/gp.png";

const LoginRegisterForm = () => {
const [showModal, setShowModal] = useState(false);
const [modalMessage, setModalMessage] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [formStyles, setFormStyles] = useState({
    login: { left: "50px" },
    register: { left: "450px" },
    btn: { left: "0" },
  });

  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const isGoogleUser = currentUser?.providerData.some(
    (provider) => provider.providerId === 'google.com'
  );

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setModalMessage("Logged in successfully!");
      setShowModal(true);
      navigate("/#home");
    } catch (error) {
      console.error("Error during login:", error);
      switch (error.code) {
        case 'auth/user-not-found':
          setModalMessage("No user found with this email address.");
          break;
        case 'auth/wrong-password':
          setModalMessage("Incorrect password.");
          break;
        default:
          setModalMessage("Error during login. Please try again.");
          break;
      }
      setShowModal(true);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setModalMessage("Passwords do not match. Please try again.");
      setShowModal(true);
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setModalMessage("Registration successful!");
      setShowModal(true);
      navigate("/#home");
    } catch (error) {
      console.error("Error during registration:", error);
      switch (error.code) {
        case 'auth/email-already-in-use':
          setModalMessage("The email address is already in use by another account.");
          break;
        case 'auth/invalid-email':
          setModalMessage("The email address is not valid.");
          break;
        case 'auth/weak-password':
          setModalMessage("The password must be at least 6 characters long.");
          break;
        default:
          setModalMessage("Error during registration. Please try again.");
          break;
      }
      setShowModal(true);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/#home");
    } catch (error) {
      console.error("Error signing in with Google", error);
      switch (error.code) {
        case 'auth/account-exists-with-different-credential':
          setModalMessage("An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.");
          break;
        case 'auth/popup-closed-by-user':
          setModalMessage("The popup has been closed before authentication could be completed.");
          break;
        default:
          setModalMessage("Error signing in with Google. Please try again.");
          break;
      }
      setShowModal(true);
    }
  };

  const signInWithFacebook = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
      navigate("/#home");
    } catch (error) {
      console.error("Error signing in with Facebook", error);
      switch (error.code) {
        case 'auth/account-exists-with-different-credential':
          setModalMessage("An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.");
          break;
        case 'auth/popup-closed-by-user':
          setModalMessage("The popup has been closed before authentication could be completed.");
          break;
        default:
          setModalMessage("Error signing in with Facebook. Please try again.");
          break;
      }
      setShowModal(true);
    }
  };


  useEffect(() => {
    if (currentUser) {
      navigate("/profile");
    }
  }, [currentUser, navigate]);

  const login = () => {
    setFormStyles({
      login: { left: "50px" },
      register: { left: "450px" },
      btn: { left: "0" },
    });
  };

  const register = () => {
    setFormStyles({
      login: { left: "-400px" },
      register: { left: "50px" },
      btn: { left: "110px" },
    });
  };

  return (
    <div className="loginContainer">
      <div className="formBox">
        {currentUser && (
          <div className="userIconss">
            {isGoogleUser ? <FaGoogle /> : <FaUser />}
          </div>
        )}
        <div className="buttonBox">
          <div id="loginButton" style={formStyles.btn}></div>
          <button type="button" className="toggleBtn" onClick={login}>
            Log In
          </button>
          <button type="button" className="toggleBtn" onClick={register}>
            Register
          </button>
        </div>
        <div className="social">
          <img src={facebook} alt="Facebook" onClick={signInWithFacebook} style={{ cursor: 'pointer' }} />
          <img src={twitter} alt="Twitter" />
          <img src={googleImg} alt="Google" onClick={signInWithGoogle} style={{ cursor: 'pointer' }} />
        </div>
        <form id="login" className="loginInputGroup" style={formStyles.login} onSubmit={handleLogin}>
          <input
            type="email"
            className="loginInputField"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="loginInputField"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input type="checkbox" className="checkBox" />
          <label className="remeberMe">Remember Password</label>
          <button type="submit" className="submitBtn">
            Log in
          </button>
          <div className="forgotPassword">Forgot Password?</div>
        </form>
        <form id="register" className="loginInputGroup" style={formStyles.register} onSubmit={handleRegister}>
          <input
            type="email"
            className="loginInputField"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="loginInputField"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            className="loginInputField"
            placeholder="Repeat Password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
          />
          <input type="checkbox" className="checkBox" />
          <label className="remeberMe">I agree to the terms & conditions</label>
          <button type="submit" className="submitBtn">
            Register
          </button>
        </form>
        
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <p>{modalMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginRegisterForm;
