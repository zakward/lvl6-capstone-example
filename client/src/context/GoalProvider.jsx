import axios from 'axios';
import React, { useState, useEffect, useContext, createContext} from 'react';
import { UserContext } from './UserContext';

const GoalContext = createContext()


const GoalProvider = (props) => {

    const {userAxios} = useContext(UserContext)

    const [goals, setGoals] = useState([])

    const [usersGoals, setUsersGoals] = useState([])

    const getGoals = async () => {
        try {
            const res = await userAxios.get('/api/main/goal')
            setGoals(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const addNewGoal = async(newGoal) => {
        try {
            const res = await userAxios.post('/api/main/goal', newGoal)
            setGoals(prev => [...prev, res.data])
            setUsersGoals(prev => [...prev, res.data])
        } catch (err) {
            console.log(err)
        }
    }
    
    useEffect(() => {
        getGoals()
    },[])


    return (
        <GoalContext.Provider value={{addNewGoal, goals, usersGoals, setUsersGoals}}>
            {props.children}
        </GoalContext.Provider>
    )
}

export { GoalContext, GoalProvider }