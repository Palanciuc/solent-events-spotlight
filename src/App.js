import Feedback from "./Components/Feedback/Feedback";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Upcoming from "./Components/Upcoming/Upcoming";
import Bookmark from "./Components/Bookmark/Bookmark";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginRegisterForm from "./Components/Login-RegisterForm/LoginRegisterForm";
import { AuthProvider } from "./Components/Context/AuthContext";
import Bookmarked from "./Components/Bookmarked/Bookmarked";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase"; // Adjust the path if needed
// ... other imports ...

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
      }
    });

    // Cleanup the subscription
    return () => unsubscribe();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Navbar isUserLoggedIn={isUserLoggedIn} />
        <Routes>
          <Route path="/" element={
            <>
              <div id="home"><Home /></div>
              <div id="upcoming"><Upcoming /></div>
              <div id="bookmark"><Bookmark isUserLoggedIn={isUserLoggedIn} /></div>
              {isUserLoggedIn && <div id="feedback"><Feedback /></div>}
              <div id="contact"><Footer /></div>
            </>
          } />
          {isUserLoggedIn && <Route path="/bookmarked" element={<Bookmarked />} />}
          <Route path="/profile" element={<LoginRegisterForm />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
