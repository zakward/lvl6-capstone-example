import { useNavigate } from "react-router-dom"
import {useContext} from "react"
import {UserContext} from "../context/UserContext"

const Navbar = () => {

    const {logout, token} = useContext(UserContext)

    const navigate = useNavigate()

    const handleHomeClick = () => navigate('/')
    const handleAddGoalClick = () => navigate('/add-goal')
    const handleSeeGoalsClick = () => navigate('/all-goals')

    return(
        <div className="navbar">
            <button onClick={handleHomeClick}>Home</button>
            <button onClick={handleAddGoalClick}>PROFILE</button>
            <button onClick={handleSeeGoalsClick}>PUBLIC</button>
            {token && <button onClick = {logout}>Logout</button>}
        </div>
    )
}

export default Navbar