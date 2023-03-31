import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import WorkoutItem from "../forms/workout/WorkoutItem"
import { fetchWorkouts, selectWorkoutsByIds } from "../reduxParts/reducers/workoutSlice";

const ToggleableWorkouts = ({workoutIds, toggle, index, workoutsPerProgram})=>{
    const [ids,setIds]=useState();
    const dispatch = useDispatch();
    const [toggleWorkouts,setToggleWorkouts]=useState(false)
    // const selectedWorkouts=useSelector(state=>selectWorkoutsByIds (state.workout.workouts))
    //     {
    //         console.log(state.workout.selectedWorkouts);
    //      selectWorkoutsByIds (state.workout, workoutIds);
    //     }
    //     );
    const selectedWorkouts = useSelector(state=>state.workout.selectedWorkouts);
    const [workouts,setWorkouts]=useState();
    const [workoutsLoaded,setWorkoutsLoaded]=useState(false);
    
    console.log(workoutIds);
    useEffect(()=>{
            console.log(workoutIds);
            console.log(workoutsPerProgram[index]);
            dispatch(selectWorkoutsByIds(workoutsPerProgram[index]))
            dispatch(selectWorkoutsByIds(workoutIds))
        
    },[workoutsPerProgram,dispatch,workoutIds])

    useEffect(()=>{
        console.log(toggle);
        if(toggle[index]){
            setWorkouts ([...selectedWorkouts]);
        }
    },[toggle[index]])
    
    const date=String(new Date())
    if(!workouts){
        return <tr><td>Loading...</td></tr>
    }
    return(
        <>
        {/* <tr>
        <td>
        {!toggleWorkouts&&    <button onClick={toggleWorkoutsHandler}>Show Workouts</button>    }
        {toggleWorkouts   && <button onClick={unToogleWorkoutsHandler}>Hide Workouts</button>    }
        </td>
        </tr> */}
        
       {
                            <>
                                
                                    <tr>
                                        <td colSpan={3}>Workouts</td>
                                    </tr>
                                    <tr>
                                        <td>Name</td>
                                        <td>Type</td>
                                        <td>Total exercises</td>
                                    </tr>
                                
                                    {workouts && workouts.map((workout,index)=>{
                                        return(
                                        <tr key={`${date}_${index}_${index}`}>
                                            <WorkoutItem workout={workout}/>
                                        </tr>)
                                        }
                                    )}
                                
                            </>
        
        }
        </>
    )
}
export default ToggleableWorkouts