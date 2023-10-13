import React from "react";
import "./Footer.css";

//Imported Icons
import { HiPhone } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { FaFacebookF, FaLocationArrow } from "react-icons/fa";
import {
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer">
      <div className="secContainer container">
        <div className="content grid">
          <div className="row">
            <div className="spanText">CONTACT US</div>
            <div className="contactDiv">
              <span className="flex">
                <HiPhone className="icon" />
                <span>012 3432 3245</span>
              </span>
              <span className="flex">
                <MdEmail className="icon" />
                <span>palanciuc@ses.com</span>
              </span>
              <span className="flex">
                <FaLocationArrow className="icon" />
                <span>Solent University Birmingham</span>
              </span>
            </div>
          </div>

          {/* POPULAR EVENTS */}
          <div className="row">
            <div className="spanText">POPULAR EVENTS</div>
            <div className="singleEvent">
              <span className="text">
                Your Personal Tour to the most prestigious university in
                Birmingham
              </span>
              <p>Oct 30, 2023</p>
            </div>
            <div className="singleEvent">
              <span className="text">
                Grand Event on Halloween Night - Join us at University Plaza
              </span>
              <p>Oct 31, 2023</p>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="row">
            <div className="spanText">QUICK LINKS</div>
            <div className="footerLinks">
              <ul>
                <li>About Us</li>
                <li>Out Team</li>
                <li>Gallery</li>
                <li>Blog</li>
                <li>Careers</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bottomDiv flex">
          <p>Copyright 2023 Palanciuc Dragos - All rights reserved</p>
          <div className="socials flex">
            <FaFacebookF className="icon" />
            <AiOutlineTwitter className="icon" />
            <AiFillYoutube className="icon" />
            <AiFillInstagram className="icon" />
          </div>
          <a href="https://www.freeprivacypolicy.com/live/4c3dcda2-a788-437e-8a6e-55e0180ad2c4" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
