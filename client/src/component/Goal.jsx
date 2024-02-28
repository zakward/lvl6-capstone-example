import React, { useState } from "react";
import moment from "moment";

const Goal = (props) => {
    const { goalName, goalDescription, goalDate } = props;

    const daysDifference = moment(goalDate).diff(moment(), 'days');
    const daysDisplay = daysDifference >= 0 ? `${daysDifference} days until` : `${Math.abs(daysDifference)} days ago`;

    const [toggle, setToggle] = useState(false);

    const toggleDescription = () => {
        setToggle(!toggle);
    };

    return (
        <div className="single-goal">
            <h2>{goalName}</h2>
            <p>{daysDisplay} the goal date</p>
            <button onClick={toggleDescription}>{toggle ? 'See Less' : 'See More'}</button>

            {toggle && (
                <div className="goal-description">
                    <p>{goalDescription}</p>
                </div>
            )}
        </div>
    );
}

export default Goal;


