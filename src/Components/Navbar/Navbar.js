import React, { useState, useContext } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { AiOutlineTwitter } from "react-icons/ai";
import { AiFillYoutube } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";
import { AuthContext } from "../Context/AuthContext"; // Adjust the path accordingly
import { auth } from "../../Firebase";

const Navbar = () => {
  const [active, setActive] = useState("menuDiv");
  const { currentUser } = useContext(AuthContext);

  const showNavBar = () => {
    setActive("menuDiv activeNavbar");
  };

  const removeNavBar = () => {
    setActive("menuDiv");
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <div>
      <div className="header flex">
        <div className="logoDiv">
          <h3 className="logo">Solent Events Spotlight</h3>
        </div>
        <div className={active}>
          <ul className="menuList">
            <li className="navItem">
              <a href="/#home" onClick={removeNavBar} className="menuLink">
                Home
              </a>
            </li>
            <li className="navItem">
              <a href="/#upcoming" onClick={removeNavBar} className="menuLink">
                Upcoming
              </a>
            </li>
            <li className="navItem">
              <a href="/#bookmark" onClick={removeNavBar} className="menuLink">
                Bookmark
              </a>
            </li>
            {currentUser && (
            <li className="navItem">
              <a
                href="/bookmarked"
                onClick={removeNavBar}
                className="menuLink"
              >
                Bookmarked
              </a>
            </li>)
            }{currentUser && (
            <li className="navItem">
              <a href="/#feedback" onClick={removeNavBar} className="menuLink">
                Feedback
              </a>
            </li>)}
            <li className="navItem">
              <a href="/#contact" onClick={removeNavBar} className="menuLink">
                Contact
              </a>
            </li>
            {currentUser ? (
              <li className="navItem">
                <div className="profileWrapper">
                
                <Link
                  to="/"
                  onClick={() => {
                    handleLogout();
                    removeNavBar();
                  }}
                  className="menuLink"
                >
                  Logout
                  {currentUser.photoURL && (
                  <img
                    src={currentUser.photoURL}
                    alt="Profile"
                    style={{
                      width: '25px',
                      height: '25px',
                      borderRadius: '50%',
                      marginRight: '15px',
                      marginLeft: '10px'
                       // To align the image with the text
                    }}
                  />
                )}
                </Link>
                </div>
              </li>
            ) : (
              <li className="navItem">
                <Link
                  to="/profile"
                  onClick={removeNavBar}
                  className="menuLink"
                >
                  LogIn
                </Link>
              </li>
            )}
          </ul>
          <div onClick={removeNavBar} className="closeNavbar">
            <AiFillCloseCircle className="icon" />
          </div>
        </div>
        <div className="socialIcons flex">
          <BsFacebook className="icon" />
          <AiOutlineTwitter className="icon" />
          <AiFillYoutube className="icon" />
          <AiFillInstagram className="icon" />
        </div>
        <div onClick={showNavBar} className="toggleNavbar">
          <TbGridDots />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
