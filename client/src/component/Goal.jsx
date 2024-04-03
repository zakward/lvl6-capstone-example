import React, { useState, useContext } from "react";
import moment from "moment";
import { GoalContext } from "../context/GoalProvider";
import { UserContext } from "../context/UserContext";

const Goal = (props) => {
    const { goalName, goalDescription, goalDate, user: userId, _id} = props;

    const {deleteGoal, updateGoal}= useContext(GoalContext);
    const {user} = useContext(UserContext);

    const [isEditing, setIsEditing] = useState(false)
    const toggleEdit = () => {
        setIsEditing(!isEditing)
    }

    const [editFormData, setEditFormData] = useState({
        goalName: props.goalName ||'',
        goalDescription:  props.goalDescription ||'',
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setEditFormData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        toggleEdit()
        updateGoal(_id, editFormData)
    }




    const daysDifference = moment(goalDate).diff(moment(), 'days');
    const daysDisplay = daysDifference >= 0 ? `${daysDifference} days until` : `${Math.abs(daysDifference)} days ago`;

    const [toggle, setToggle] = useState(false);

  const isUserGoal = user._id === userId

    const deleteUserGoal = () => {
        deleteGoal(props._id)
    }
    const toggleDescription = () => {
        setToggle(!toggle);
    };

    return (
        <div className="single-goal">
            <h2>{goalName}</h2>
            <p>{daysDisplay} the goal date</p>
            {isUserGoal && 
            <>
            <button onClick = {toggleEdit}>Edit Goal</button>
            <button onClick = {deleteUserGoal}>Delete Goal</button>
            </>}
            <button onClick={toggleDescription}>{toggle ? 'See Less' : 'See More'}</button>

            {toggle && (
                <div className="goal-description">
                    <p>{goalDescription}</p>
                </div>
            )}

            {isEditing && isUserGoal && 
            <>
                <form onSubmit={handleSubmit}>
                    <input name = "goalName" value = {editFormData.goalName} onChange = {handleChange}/>
                    <input name = "goalDescription"  value = {editFormData.goalDescription} onChange = {handleChange}/>
                    <button>Save Edits</button>
                </form>
            </>}
        </div>
    );
}

export default Goal;


