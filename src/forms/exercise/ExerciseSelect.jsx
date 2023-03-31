import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router";
import { selectExercisesByIds } from "../../ReduxParts/reducers/exerciseSlice";
import ExerciseItem from "./ExerciseItem";

const ExerciseSelect = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loaded,setLoaded] = useState(false);
    const selectedExercises = useSelector((state)=>{
        console.log(state.exercise.selectedExercises);
        return state.exercise.selectedExercises
    })
    const [exercises,setExercises]=useState([]);
    useEffect(()=>{
        const ids = [24,25]
        dispatch(selectExercisesByIds(ids))
        console.log(selectedExercises);
        setLoaded(true)
    },[dispatch,loaded])

    useEffect(()=>{
        if(loaded){
            setExercises(selectedExercises);
        }
    },[loaded])

    const handleBack = ()=>{
        navigate('/exercises');
    }
    if(!loaded){
        return(<div>Loading</div>)
    }
    const date = String(new Date());
    return(
        
        <>
        <button onClick={handleBack}>Back</button>
            <table>
            <thead>
                <tr>

                
                <th>Name</th>
                <th>Description</th>
                <th>Muscle Group</th>
                <th>Repetitions</th>
                <th>Image</th>
                <th>Video</th>
               
                </tr>
            </thead>
            <tbody>
        {loaded&&

             exercises.map((exercise,index)=>{
                return(
                    
                        <tr key={`${date}_${index}`}>
                        <ExerciseItem exercise={exercise}/>
                        
                        </tr>
                    
                )
            })}
        
        
        </tbody>
        </table>
        </>
    )
}
export default ExerciseSelect

