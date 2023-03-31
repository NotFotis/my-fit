import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { completeGoal, doSomeProgress, resetGoal, subtractFromGoal } from '../../reduxParts/goalSlice'
import { NavLink } from 'react-router-dom'

const ActiveGoal = () => {

    const goal = useSelector(state => state.goal)
    const dispatch = useDispatch()
    const goalCount = goal.completedPrograms
    const name = goal.completedPrograms < goal.goalName.length ?
      goal.goalName[goalCount] : 'all goals are completed'



  return (
    <div>
        {goal.percentage < 100.0 && <h1>{name}</h1>}
        {goal.percentage === 100.0  &&
          <>
            <h1>{name} is done</h1>
            <button aria-label='Complete Goal'
            onClick={()=>dispatch(completeGoal())}
            >Complete Goal</button>
          </>
        }
        {(goal.percentage >= 0 && goal.goalName.length > goalCount) && <h1>{goal.percentage}%</h1>}
        <br></br>
        { goal.goalName.length > goalCount && 
          <div>
            <button aria-label='Anounce Goal'
            onClick={()=>dispatch(doSomeProgress())}
            >add to goal</button>
            <button aria-label='Anounce Goal'
            onClick={()=>dispatch(subtractFromGoal())}
            >subtract from goal</button>
          </div>
        }
        { goal.goalName.length - 1 < goalCount && 
        <div>
          <NavLink to="/program"><h1>go choose more some programs</h1></NavLink>
          <button aria-label='Reset Goal'
            onClick={()=>dispatch(resetGoal())}
            >Or reset these goals</button>
        </div>
        }
    </div>
  )
}

export default ActiveGoal