import React, { useContext, useState } from "react";
import "./Bookmark.css";
import { db } from "../../Firebase";
import {
  collection,
  addDoc,
  where,
  query,
  getDocs,
  doc,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { AuthContext } from "../Context/AuthContext";

// Imported Images
import event4 from "../Assets/event4.png";
import event5 from "../Assets/event5.jpeg";
import event6 from "../Assets/event6.jpeg";
import event1 from "../Assets/event1.jpeg";
import event2 from "../Assets/event2.jpeg";
import event3 from "../Assets/event3.jpeg";

const storage = getStorage();

const getImageURL = async (imagePath) => {
  const imageRef = ref(storage, imagePath);
  try {
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    console.error("Error getting image URL: ", error);
  }
};

const Bookmark = () => {
  const { currentUser } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleBookmark = async (
    eventTitle,
    eventDetails,
    eventLocation,
    eventDate,
    imagePath
  ) => {
    // Check if the user is logged in
    if (!currentUser) {
      setErrorMessage("You need to be logged in to bookmark events!");
      setShowModal(true);
      return;
    }

    try {
      // Check if the event is already bookmarked for the specific user
      const userRef = doc(db, "userCollection", currentUser.uid);
      const bookmarkedEventsRef = collection(userRef, "bookmarkedEvents");
      const q = query(bookmarkedEventsRef, where("title", "==", eventTitle));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // If the event is already bookmarked, show the modal
        setErrorMessage("You have already bookmarked this event!");
        setShowModal(true);
        return;
      }

      // If not, proceed to bookmark the event
      const imageURL = await getImageURL(imagePath);
      await addDoc(bookmarkedEventsRef, {
        title: eventTitle,
        details: eventDetails,
        location: eventLocation,
        date: eventDate,
        imageURL: imageURL,
      });
      setErrorMessage("Event bookmarked successfully!");
      setShowModal(true);
    } catch (e) {
      console.error("Error adding document: ", e);
      setErrorMessage("Error bookmarking the event. Please try again.");
      setShowModal(true);
    }
  };

  return (
    <div className="bookmarks container section">
      <div className="secContainer">
        <span className="secTitle">Bookmark</span>

        <div className="bookmarkContainer">
          <div className="singleBookmark grid">
            <div className="imgDiv">
              <img src={event4} alt="event4" />
            </div>
            <div className="bookmarkInfo">
              <span className="bookmarkTitle">Tech Startup Pitch Night</span>
              <div className="details">
                <p>
                  Witness the innovative ideas of our students as they pitch
                  their tech startups to a panel of industry experts. An
                  opportunity for students to secure funding and mentorship.
                </p>
                <button
                  className="btn"
                  onClick={() =>
                    handleBookmark(
                      "Tech Startup Pitch Night",
                      "Witness the innovative ideas of our students as they pitch their tech startups to a panel of industry experts. An opportunity for students to secure funding and mentorship.",
                      "Innovation Hub, Bulding A",
                      "20th Oct 18:00 - 21:00",
                      "gs://solent-events-spotlight.appspot.com/event_images/event4.png"
                    )
                  }
                >
                  Bookmark Event
                </button>
              </div>
              <span className="location">Innovation Hub, Bulding A </span>
              <span className="date">20th Oct 18:00 - 21:00</span>
            </div>
          </div>
          <div className="singleBookmark grid">
            <div className="imgDiv">
              <img src={event5} alt="event5" />
            </div>
            <div className="bookmarkInfo">
              <span className="bookmarkTitle">
                History Lecture: Ancient Civilizations
              </span>
              <div className="details">
                <p>
                  Embark on a journey through time as we explore the wonders of
                  ancient civilizations, from the pyramids of Egypt to the Great
                  Wall of China.
                </p>
                <button
                  className="btn"
                  onClick={() =>
                    handleBookmark(
                      "History Lecture: Ancient Civilizations",
                      "Embark on a journey through time as we explore the wonders of ancient civilizations, from the pyramids of Egypt to the Great Wall of China.",
                      "Bulding A, Room 305",
                      "25th Oct 11:00 - 13:00",
                      "gs://solent-events-spotlight.appspot.com/event_images/event5.jpeg"
                    )
                  }
                >
                  Bookmark Event
                </button>
              </div>
              <span className="location">Bulding A, Room 305</span>
              <span className="date">25th Oct 11:00 - 13:00</span>
            </div>
          </div>
          <div className="singleBookmark grid">
            <div className="imgDiv">
              <img src={event6} alt="event6" />
            </div>
            <div className="bookmarkInfo">
              <span className="bookmarkTitle">Startup Pitch Night</span>
              <div className="details">
                <p>
                  Celebrate the diverse cultures represented at our university!
                  Experience a day filled with traditional music, dance
                  performances, culinary delights, and cultural exhibits from
                  around the world. Engage in workshop, meet international
                  students, and learn about study abroad opportunities.
                </p>
                <button
                  className="btn"
                  onClick={() =>
                    handleBookmark(
                      "Startup Pitch Night",
                      "Celebrate the diverse cultures represented at our university! Experience a day filled with traditional music, dance performances, culinary delights, and cultural exhibits from around the world. Engage in workshop, meet international students, and learn about study abroad opportunities.",
                      "University Central Plaza",
                      "27th Oct 10:00 - 18:00",
                      "gs://solent-events-spotlight.appspot.com/event_images/event6.jpeg"
                    )
                  }
                >
                  Bookmark Event
                </button>
              </div>
              <span className="location">University Central Plaza</span>
              <span className="date">27th Oct 10:00 - 18:00</span>
            </div>
          </div>
          <div className="singleBookmark grid">
            <div className="imgDiv">
              <img src={event1} alt="event1" />
            </div>
            <div className="bookmarkInfo">
              <span className="bookmarkTitle">Digital Media Workshop</span>
              <div className="details">
                <p>
                  Join our Digital Media Workshop to explore the latest in
                  content creation, from video production to graphic design and
                  social media. Ideal for both beginners and professionals, this
                  session promises insights and trends from industry experts.
                  Dive into the digital media realm with us!
                </p>
                <button
                  className="btn"
                  onClick={() =>
                    handleBookmark(
                      "Digital Media Workshop",
                      "Join our Digital Media Workshop to explore the latest in content creation, from video production to graphic design and social media. Ideal for both beginners and professionals, this session promises insights and trends from industry experts. Dive into the digital media realm with us!",
                      "Digital Media Center, Bulding B",
                      "29th Oct 09:00 - 17:00",
                      "gs://solent-events-spotlight.appspot.com/event_images/event1.jpeg"
                    )
                  }
                >
                  Bookmark Event
                </button>
              </div>
              <span className="location">Digital Media Center, Bulding B </span>
              <span className="date">29th Oct 09:00 - 17:00</span>
            </div>
          </div>
          <div className="singleBookmark grid">
            <div className="imgDiv">
              <img src={event2} alt="event2" />
            </div>
            <div className="bookmarkInfo">
              <span className="bookmarkTitle">
                Lecture on Artificial Intelligence
              </span>
              <div className="details">
                <p>
                  Dive into the world of Artificial Intelligence with leading
                  experts as they unravel the mysteries of AI. Explore its
                  applications, future prospects, and ethical considerations in
                  this enlightening lecture. Ideal for tech enthusiasts and
                  professionals alike.
                </p>
                <button
                  className="btn"
                  onClick={() =>
                    handleBookmark(
                      "Lecture on Artificial Intelligence",
                      "Dive into the world of Artificial Intelligence with leading experts as they unravel the mysteries of AI. Explore its applications, future prospects, and ethical considerations in this enlightening lecture. Ideal for tech enthusiasts and professionals alike.",
                      "Main Auditorium, Bulding B",
                      "28th Oct 14:00 - 17:00",
                      "gs://solent-events-spotlight.appspot.com/event_images/event2.jpeg"
                    )
                  }
                >
                  Bookmark Event
                </button>
              </div>
              <span className="location">Main Auditorium, Bulding B </span>
              <span className="date">28th Oct 14:00 - 17:00</span>
            </div>
          </div>
          <div className="singleBookmark grid">
            <div className="imgDiv">
              <img src={event3} alt="event3" />
            </div>
            <div className="bookmarkInfo">
              <span className="bookmarkTitle">Social Gathering</span>
              <div className="details">
                <p>
                  Join fellow students and faculty for an evening of networking
                  and relaxation at our annual Social Gathering. Enjoy light
                  refreshments, music, and engaging conversations in a laid-back
                  atmosphere. A perfect opportunity to make new connections and
                  strengthen old ones.
                </p>
                <button
                  className="btn"
                  onClick={() =>
                    handleBookmark(
                      "Social",
                      "Join fellow students and faculty for an evening of networking and relaxation at our annual Social Gathering. Enjoy light refreshments, music, and engaging conversations in a laid-back atmosphere. A perfect opportunity to make new connections and strengthen old ones.",
                      "Rooftop Garden, Bulding C",
                      "30th Oct 18:00 - 21:00",
                      "gs://solent-events-spotlight.appspot.com/event_images/event3.jpeg"
                    )
                  }
                >
                  Bookmark Event
                </button>
              </div>
              <span className="location">Rooftop Garden, Bulding C</span>
              <span className="date">30th Oct 18:00 - 21:00</span>
            </div>
          </div>
        </div>
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowModal(false)}>
                &times;
              </span>
              <p>{errorMessage}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmark;
