import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router"
import { removeElementFromArray } from "../../helpers/removeElementFromArray";
import { addProgram } from "../../reduxParts/reducers/programSlice";
import WorkoutItem from "../workout/WorkoutItem";

const ProgramFormAdd = ()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showWorkouts, setShowWorkouts] = useState();
    const [workoutsToSelect,setWorkoutsToSelect] = useState();
    const [workoutIds,setWorkoutIds]=useState([]);
    const [checkedItems,setCheckedItems] = useState([]);
    const [formData,setFormData] = useState({name:'', category:'', workout:[]})
    const {workouts} = useSelector((state)=>{
        return state.workout;
    })
    useEffect(()=>{
        if(workouts){
            setWorkoutsToSelect([...workouts])
            setCheckedItems([...workouts.map(()=>false)]);
            setWorkoutIds([...workouts.map(()=>0)]);
        }
        
    },[workouts])
    useEffect(()=>{
        setWorkoutIds([...checkedItems.map((item,index)=>{
            if(item){
                return workoutIds[index];
            }
            return 0;
        })])
    },[checkedItems])

    useEffect(()=>{
        if(workoutsToSelect!=undefined){
            setShowWorkouts(true)
        }else{
            setShowWorkouts(false)
        }
    },[workoutsToSelect,showWorkouts])

    const handleSubmit = (event)=>{
        event.preventDefault();
        const workoutIdsPool = [...workoutIds.filter((item)=>item!==0)]
        const itemPayload = {name:formData.name, category:formData.category, workout:workoutIdsPool, goal:[1], complete:false}
        dispatch(addProgram(itemPayload))
    }
    const handleBack = ()=>{
        navigate('/programs');
    }

    const handleWorkout = (event,itemId,index)=>{
        setCheckedItems((prevItems)=>{
            const newItems = [...prevItems];
            newItems[index] = !prevItems[index]
            return newItems
        })
        setWorkoutIds((prevIds)=>{
            const newIds = [...prevIds];
            newIds[index]=itemId;
            return newIds;
        })
        console.log(workoutIds);
    }
    const date=String(new Date())
    return(
        <>
            {
                showWorkouts&&
                <>
                <h1>Program Add form</h1>
                <form onSubmit={handleSubmit}>
                    <table>
                        <thead>
                            <tr><td colSpan={2}><h3>Program</h3></td></tr>
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input type={'text'} value={formData.name} onChange={(event)=>{setFormData({...formData,name:event.target.value})}}/>
                                </td>
                                <td>
                                    <input type={'text'} value={formData.category} onChange={(event)=>{setFormData({...formData,category:event.target.value})}}/>
                                </td>
                            </tr>
                            
                        </tbody>
                        </table>
                        <table>
                                <thead>
                                    <tr><td colSpan={2}><h3>Workouts</h3></td></tr>
                                    <tr>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Total Exercises</th>
                                    </tr>
                                </thead>  
                                <tbody>
                                    {
                                        workoutsToSelect.map((workout,index)=>{
                                            return(
                                                <tr key={`${date}_${index}`}>
                                                    <WorkoutItem workout={workout}/>
                                                    <td>
                                                        <input type={'checkbox'}
                                                                onChange={(event)=>{handleWorkout(event,workout.id,index)}}
                                                                name={`checkbox${index}`}
                                                                checked={checkedItems[index] || false}
                                                        />
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                        </table>
                    
                    <button onClick={handleSubmit}>Submit</button>
                </form>
                </>
            }
            <button onClick={handleBack}>Back</button>
        </>
    )
}
export default ProgramFormAdd