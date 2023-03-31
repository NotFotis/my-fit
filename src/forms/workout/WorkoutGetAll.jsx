import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { fetchExercises } from "../../reduxParts/reducers/exerciseSlice";
import { deleteWorkout, fetchWorkouts } from "../../reduxParts/reducers/workoutSlice";
import WorkoutItem from "./WorkoutItem";
import './workout-style.css'

const WorkoutGetAll = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [exercisesLoaded,setExercisesLoaded]=useState(false);
    const [workoutsLoaded,setWorkoutsLoaded]=useState(false);
    const [workouts,setWorkouts] = useState();
    const [exercises,setExercises] = useState();
    const [deleted,setDeleted]=useState(false);
    const {workouts:workoutsFetched, status:statusWorkouts} = useSelector((state=>{
        console.log(state.workout);    
        return state.workout
        }
    ))
    const {exercises:exercisesFetched, status:statusExercises} = useSelector((state=>state.exercise))
    useEffect(()=>{
        dispatch(fetchExercises());
        dispatch(fetchWorkouts());
        console.log(exercisesFetched);
        console.log(workoutsFetched);
    },[dispatch])
    useEffect(()=>{
        if(statusExercises==='succeeded'){
            setExercises(exercisesFetched);
            setExercisesLoaded(true);
        }
    },[statusExercises,exercisesLoaded])
    useEffect(()=>{
        if(statusWorkouts==='succeeded'){
            setWorkouts(workoutsFetched);
            
            setWorkoutsLoaded(true);
        }
    },[statusWorkouts,workoutsLoaded])
    useEffect(()=>{
        if(deleted){
            dispatch((fetchWorkouts()));
        }
    },[deleted,dispatch])
    const handleAdd = ()=>{
        navigate('/workout/add')
    }
    const handleEdit = (id)=>{
        navigate(`/workout/update/${id}`)
    }
    const handleDelete = (id)=>{
        dispatch(deleteWorkout(id));
        setDeleted(true);
    }

    const date = String(new Date());
    return(
        <>
        <button onClick={handleAdd}>Add a Workout</button>
            <table>
                <thead>
                    <tr>
                        <th>
                            Name
                        </th>
                        <th>
                            Type
                        </th>
                        <th>
                            Exercises
                        </th>
                        <th>
                            Edit
                        </th>
                        <th>
                            Delete
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {workoutsLoaded && exercisesLoaded &&
                    <>
                        {workouts.map((workout,index)=>{
                            return(
                                <tr key={`${date}_${index}`}>
                                    <WorkoutItem workout={workout}/>
                                    <td><button onClick={()=>{handleEdit(workout.id)}}>Edit</button></td>
                                    <td><button onClick={()=>{handleDelete(workout.id)}}>Delete</button></td>
                                </tr>
                            )
                        })}
                    </>                    
                    }
                </tbody>
            </table>
        </>
    )
}

export default WorkoutGetAll