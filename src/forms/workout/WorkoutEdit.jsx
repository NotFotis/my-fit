import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router";
import { selectExercisesByIds, selectTheRestErxercises } from "../../ReduxParts/reducers/exerciseSlice";
import { selectWorkoutById, updateWorkout } from "../../ReduxParts/reducers/workoutSlice";
import ExerciseItem from "../exercise/ExerciseItem";

const WorkoutEdit = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id}=useParams();
    const [workoutLoaded,setWorkoutLoaded]=useState(false);
    const [exercisesLoaded,setExercisesLoaded]=useState(false);
    const [formData,setFormData]= useState({name: '', type:'', exercise:[]})
    const [exerciseIds, setExerciseIds] = useState([]);
    const exercises = useSelector((state)=>{
        return state.exercise.selectedExercises;
    })
    const exercisesNotIncluded = useSelector((state)=>{
        return state.exercise.exercisesNotIncluded;
    })
    const workout = useSelector ((state)=>state.workout.workout);
    useEffect(()=>{
        dispatch(selectWorkoutById(id));
        setWorkoutLoaded(true);
    },[dispatch])
    useEffect(()=>{
        if(workoutLoaded){
            dispatch(selectExercisesByIds(workout.exercise));
            setExercisesLoaded(true)
        }
    },[dispatch,workoutLoaded])
    useEffect(()=>{
        if(exercisesLoaded){
            dispatch(selectTheRestErxercises(workout.exercise))
            setFormData(workout)
        }
    },[exercisesLoaded])
    const handleSubmit = (event)=>{
        const itemPayload = {id:workout.id, name: formData.name, type:formData.type, exercise:exerciseIds, program:workout.program, complete:false}
        event.preventDefault();
        dispatch(updateWorkout(itemPayload));
    }
    const handleBack = ()=>{
        navigate('/workouts');
    }
    if(!exercisesLoaded){
        return <div>Loading...</div>
    }
    const date = String(new Date())
    return(
    <>
    <button onClick={handleBack}>Back</button>
    {exercisesLoaded && 
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Name:
                    <input
                        type='text'
                        value={formData.name || ''}
                        onChange={(event)=>setFormData({...formData, name:event.target.value})}
                    />
                </label>
            </div>
            <div>
                <label>
                    Type:
                    <input
                        type='text'
                        value={formData.type || ''}
                        onChange={(event)=>setFormData({...formData, type:event.target.value})}
                    />
                </label>
            </div>
            <div>
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Muscle Group</th>
                        <th>Repetitions</th>
                        <th>Image</th>
                        <th>Video</th>
                        <th>Add</th>    
                    </tr>
                    </thead>
                    <tbody>
                        <tr>

                        <h1>Exercises in this workout</h1>
                        </tr>
                        {exercises.map((exercise,index)=>{
                            return(
                                <tr key={`${date}_${index}`}>
                                    <ExerciseItem exercise={exercise}/>
                                    <td><input type={'checkbox'}/></td>
                                </tr>
                            )
                        }
                        )}
                        
                    </tbody>
                </table>
            </div>
            <button>Save</button>
        </form>
    }
    </>
    )
}
export default WorkoutEdit