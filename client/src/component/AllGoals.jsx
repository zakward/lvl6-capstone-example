import { useContext } from 'react';
import { GoalContext } from '../context/GoalProvider';
import Goal from './Goal';

const AllGoals = () => {

    const { goals } = useContext(GoalContext)

    const goalElements = goals.map(goal => {
        return (
            <Goal key={goal._id} {...goal} />
        )
    })

    return (
        <div className='goal-container'>
            <div className='goal-list'>
                <h1>Public Page</h1>
                <h2>All Goals</h2>
                {goalElements}
            </div>
        </div>
    )
}

export default AllGoals