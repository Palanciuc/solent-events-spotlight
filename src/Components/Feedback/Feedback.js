import React, { useState, useRef } from "react";
import "./Feedback.css";
import { serverTimestamp, collection, addDoc } from 'firebase/firestore';
import { db } from '../../Firebase';

// Imported Icons
import { BsFillStarFill } from "react-icons/bs";
import { BsStar } from "react-icons/bs";

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [showModal, setShowModal] = useState(false); // State to control the visibility of the modal
  const [modalMessage, setModalMessage] = useState(''); // Message to display in the modal
  const textareaRef = useRef(null);

  const handleStarClick = (index) => {
    if (rating === index + 1) {
      setRating(index);
    } else {
      setRating(index + 1);
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    setRating(0);
    textareaRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0 || !textareaRef.current.value.trim()) {
      setModalMessage('Please provide a rating and feedback before submitting.');
      setShowModal(true);
      return;
    }

    try {
        const feedbacksCollection = collection(db, 'feedbacks');
        await addDoc(feedbacksCollection, {
            rating: rating,
            feedback: textareaRef.current.value,
            timestamp: serverTimestamp()
        });
        setModalMessage('Your feedback was submitted successfully!');
        setShowModal(true);
        setRating(0);
        textareaRef.current.value = "";
    } catch (error) {
        console.error("Error submitting feedback:", error);
        setModalMessage('Error submitting feedback. Please try again.');
        setShowModal(true);
    }
  };

  return (
    <div className="feedbackContainer">
      <span className="secTitle">Feedback Form</span>
      <div className="feedback">
        <h3>Your Feedback is valuable to us!</h3>
        <form action="#" onSubmit={handleSubmit}>
          <div className="rating">
          <input type="number" name="rating" value={rating} onChange={() => {}} hidden />
            {[...Array(5)].map((_, index) => (
              <span key={index} onClick={() => handleStarClick(index)}>
                {index < rating ? 
                  <BsFillStarFill className="popOut" /> : 
                  <BsStar className="popIn" />}
              </span>
            ))}
          </div>
          <textarea
            className="opinion"
            cols="30"
            rows="10"
            placeholder="  Type your Feedback here..."
            ref={textareaRef}
          ></textarea>
          <div className="btnGroup">
            <button type="submit" className="btnSubmit">
              Submit
            </button>
            <button className="btnCancel" onClick={(e) => handleCancelClick(e)}>
              Cancel
            </button>
          </div>
        </form>
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowModal(false)}>&times;</span>
              <p>{modalMessage}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedback;
