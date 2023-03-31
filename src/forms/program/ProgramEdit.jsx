import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router"
import { selectProgramById, updateProgram } from "../../reduxParts/reducers/programSlice";
import { selectWorkoutsByIds } from "../../reduxParts/reducers/workoutSlice";
import WorkoutItem from "../workout/WorkoutItem";

const ProgramEdit = ()=>{
    const {id}=useParams();
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData,setFormData]= useState({name: '', type:'', workout:[]})
    const workouts = useSelector((state)=>state.workout.selectedWorkouts)
    const program = useSelector((state)=>state.program.program);
    const [programLoaded,setProgramLoaded] = useState(false);
    const [workoutsLoaded,setWorkoutsLoaded] = useState(false);
    const [workoutIds,setWorkoutIds]=useState([])
    useEffect(()=>{
        dispatch(selectProgramById(id));
        setProgramLoaded(true)

    },[dispatch])
    useEffect(()=>{
        if(programLoaded){
            dispatch(selectWorkoutsByIds(program.workout));
            setWorkoutsLoaded(true)
        }
    },[dispatch,programLoaded])
    useEffect(()=>{
        if(workoutsLoaded){
            setFormData(program)
        }
    },[workoutsLoaded])
    useEffect(()=>{
        if(programLoaded){
            setWorkoutIds([...program.workout]);
        }
    },[programLoaded])
    const handleSubmit = (event)=>{
        event.preventDefault();
        const itemPayload = {id:program.id, name:formData.name, category:formData.category, workout:workoutIds, goal:program.goal, complete:false}
        console.log(itemPayload);
        dispatch(updateProgram(itemPayload));
    }
    const handleBack = ()=>{
        navigate('/programs');
    }
    const date = String(new Date())
    return(
        <>
        <h1>Edit the program</h1>
        <form onSubmit={handleSubmit}>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={2}>
                                Program
                            </th>
                        </tr>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                            <input  type={'text'}
                                    value={formData.name || ''}
                                    onChange={(event)=>setFormData({...formData,name:event.target.value})}
                            />
                            </td>
                        
                        <td>
                            <input  type={'text'}
                                    value={formData.category || ''}
                                    onChange={(event)=>setFormData({...formData,category:event.target.value})}
                            />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={3}>Workouts</th>
                        </tr>
                        <tr><th colSpan={3}>Workouts in this program</th></tr>
                        <tr>
                           <th>Name</th>
                           <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            workouts.map((workout,index)=>{
                                return(
                                    <tr key={`${date}_${index}`}>
                                        <WorkoutItem workout={workout}/>
                                        <td></td>
                                        <td><input type={`checkbox`}/></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            
        </form>
        <button onClick={handleBack}>Back</button>
        </>
    )
}
export default ProgramEdit