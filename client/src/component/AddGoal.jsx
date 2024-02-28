import { useState, useContext, useEffect } from "react"
import { GoalContext } from "../context/GoalProvider"
import { UserContext } from "../context/UserContext"
import Goal from "./Goal"



const AddGoal = () => {

    const { userAxios } = useContext(UserContext)

  



    const [formData, setFormData] = useState({
        goalName: '',
        goalDescription: ''
    })

    const { addNewGoal, usersGoals, setUsersGoals } = useContext(GoalContext)


    useEffect(() => {
        userAxios.get("/api/main/goal/usersGoals")
            .then(res => setUsersGoals(res.data))
            .catch(err => console.log(err))
    }, [])




    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addNewGoal(formData)
        setFormData({
            goalName: '',
            goalDescription: ''
        })
    }

    const usersGoalsElements = usersGoals.map(goal => {
        return (
            <Goal {...goal} />
        )
    })

    return (
        <>
            <div className="add-goal">
                <form onSubmit={handleSubmit} className="add-goal-form">
                    <h3>Share Your Goal!</h3>
                    <input
                        type="text"
                        placeholder="Goal Name"
                        name="goalName"
                        value={formData.goalName}
                        onChange={handleChange}
                    />
                    <textarea
                        rows={15}
                        placeholder="Goal Plan"
                        name="goalDescription"
                        value={formData.goalDescription}
                        onChange={handleChange}
                    />
                    <button>Share!</button>
                </form>
            </div>

            {usersGoalsElements}
        </>
    )
}

export default AddGoal