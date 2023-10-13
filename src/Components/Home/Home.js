import React, { useEffect, useState } from "react";
import "./Home.css";

const Home = () => {
  const [mainText, setMainText] = useState("");
  // eslint-disable-next-line
  const [subText, setSubText] = useState("");
  const [isMainTextVisible, setIsMainTextVisible] = useState(false);
  const [isSubTextVisible, setIsSubTextVisible] = useState(false);

  useEffect(() => {
    const originalMainText = "A Community that never leaves you";
    const originalSubText = "Our Events";

    let mainTextIndex = originalMainText.length;
    let subTextIndex = originalSubText.length;

    const mainTextInterval = setInterval(() => {
      if (mainTextIndex >= 0) {
        setMainText(originalMainText.substring(mainTextIndex));
        mainTextIndex--;
      } else {
        setIsMainTextVisible(true);
        clearInterval(mainTextInterval);
      }
    }, 100);

    const subTextInterval = setInterval(() => {
      if (subTextIndex >= 0) {
        setSubText(originalSubText.substring(subTextIndex));
        subTextIndex--;
      } else {
        setIsSubTextVisible(true);
        clearInterval(subTextInterval);
      }
    }, 100);
  }, []);

  return (
    <div className="home">
      <div className="homeText">
        <span className={`spanText ${isMainTextVisible ? "visible" : ""}`}>
          {mainText}
        </span>

        <div className={`homeTitle ${isSubTextVisible ? "visible" : ""}`}>
          {isSubTextVisible && (
            <>
              Join{" "}
              <strong className="rainbow-text">Our Events</strong>
            </>
          )}
        </div>
        <div className={`btnn ${isSubTextVisible ? "visible" : ""}`}>
          Bookmark an Event
        </div>
      </div>
    </div>
  );
};

export default Home;
