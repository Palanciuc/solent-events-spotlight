import React from "react";
import './Upcoming.css';

//Imported Images
import event1 from "../Assets/event1.jpeg"
import event2 from "../Assets/event2.jpeg"
import event3 from "../Assets/event3.jpeg"

//Imported Icon
import { AiOutlineSwapRight } from "react-icons/ai";

const Upcoming = () => {
    return(
        <div className="upcoming">
            <div className="upcomingContainer container grid">
                <div className="singleUpcoming">
                    <div className="imgDiv">
                        <img src={event1} alt="event1"/>
                    </div>
                    
                    <h4 className="textDiv">
                        Digital Media Workshop
                    </h4>
                </div>
                <div className="singleUpcoming">
                    <div className="imgDiv">
                        <img src={event2} alt="event2"/>
                    </div>
                    <h4 className="textDiv">
                        Lecture on Artificial Intelligence
                    </h4>
                </div>
                <div className="singleUpcoming">
                    <div className="imgDiv">
                        <img src={event3} alt="event3"/>
                    </div>
                    <h4 className="textDiv">
                        Social Gathering
                    </h4>
                </div>
            </div>
            <div className="spanTText flex">
                Other Events <AiOutlineSwapRight className="iconn"/>
            </div>
        </div>
    )
}

export default Upcoming;