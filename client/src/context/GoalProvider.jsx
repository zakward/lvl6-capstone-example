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

    const getUserGoals = async () => {
        try {
            const res = await userAxios.get('/api/main/goal/usersGoals')
            setUsersGoals(res.data)
        } catch (error) {
            console.log(error)
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

    const deleteGoal = async(goalId) => {
        try {
            const res = await userAxios.delete(`api/main/goal/${goalId}`)
            setGoals(prev => prev.filter(goal => goal._id !== goalId))
            setUsersGoals(prev => prev.filter(goal => goal._id !== goalId))
        } catch (error) {
            console.log(error)
        }
    }
    
    const updateGoal = async (goalId, update) => {
        try {
            const res = await userAxios.put(`/api/main/goal/${goalId}`, update)
            setGoals(prev => prev.map(goal => goal._id === goalId ? res.data : goal))
            setUsersGoals(prev => prev.map(goal => goal._id === goalId ? res.data : goal))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getGoals()
        getUserGoals()
    },[])

    // console.log(usersGoals)


    return (
        <GoalContext.Provider value={{addNewGoal, goals, setGoals, usersGoals, setUsersGoals, deleteGoal, updateGoal}}>
            {props.children}
        </GoalContext.Provider>
    )
}

export { GoalContext, GoalProvider }