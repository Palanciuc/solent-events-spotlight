import React, { useState, useEffect, useContext } from "react";
import "./Bookmarked.css";
import { db } from "../../Firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { AuthContext } from "../Context/AuthContext"; // Assuming you have this context for user authentication

const Bookmarked = () => {
  const [bookmarkedEvents, setBookmarkedEvents] = useState([]);
  const { currentUser } = useContext(AuthContext); // Get the current user from the context
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchBookmarkedEvents = async () => {
      if (currentUser) {
        const userRef = doc(db, "userCollection", currentUser.uid);
        const bookmarkedEventsRef = collection(userRef, "bookmarkedEvents");
        const querySnapshot = await getDocs(bookmarkedEventsRef);
        const events = [];
        querySnapshot.forEach((doc) => {
          events.push({
            id: doc.id, // Fetching the ID
            ...doc.data()
          });
        });
        setBookmarkedEvents(events);
      }
    };

    fetchBookmarkedEvents();
  }, [currentUser]);

  const unbookmarkEvent = async (eventId) => {
    try {
      const eventRef = doc(db, "userCollection", currentUser.uid, "bookmarkedEvents", eventId);
      await deleteDoc(eventRef);
      setErrorMessage("Event unbookmarked successfully!");
      setShowModal(true)
      setBookmarkedEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
    } catch (e) {
      console.error("Error removing document: ", e);
      setErrorMessage("Error unbookmarking the event. Please try again.");
      setShowModal(true);
    }
  };
  
  return (
    <div className="bookmarked container section">
      <div className="bookmarkedSecContainer">
        <span className="secTitle">Bookmarked Events</span>

        <div className="bookmarkedContainer">
        {bookmarkedEvents.length === 0 ? (
            <p className="emptyBookmarkPage">Your bookmarked events page is empty. Book your next adventure and join our fabulous comunity at the next Event!</p>
          ) : (
            bookmarkedEvents.map((event, index) => (
            <div key={index} className="singleBookmarked grid">
              <div className="imgDiv">
                {/* You might want to store the image URL in Firestore and use it here */}
                <img src={event.imageURL} alt={event.title} />
              </div>
              <div className="bookmarkedInfo">
                <span className="bookmarkedTitleEvent">{event.title}</span>
                <div className="bookmarkedDetails">
                  <p>{event.details}</p>
                  <button className="unbookmarkBtn" onClick={() => unbookmarkEvent(event.id)}>Unbook Event</button>
                </div>
                <span className="bookmarkedLocation">{event.location}</span>
                <span className="bookmarkedDate">{event.date}</span>
              </div>
            </div>
          ))
          )}
          
        </div>
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowModal(false)}>&times;</span>
              <p>{errorMessage}</p>
            </div>
          
          </div>
          
        )}
        
      </div>
     
    </div>
    
  );
};

export default Bookmarked;
