import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router";
import { fetchExercises } from "../../reduxParts/reducers/exerciseSlice";
import { fetchPrograms } from "../../reduxParts/reducers/programSlice";
import { fetchWorkouts } from "../../reduxParts/reducers/workoutSlice";
import ProgramItem from "./ProgramItem";

const ProgramGetAll =()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [exercisesLoaded,setExercisesLoaded]=useState(false);
    const [workoutsLoaded,setWorkoutsLoaded]=useState(false);
    const [programsLoaded,setProgramsLoaded]=useState(false);
    const [programs,setPrograms] = useState();
    const [workouts,setWorkouts] = useState();
    const [exercises,setExercises] = useState();
    const [deleted,setDeleted]=useState(false);
    const {exercises:exercisesFetched, status:statusExercises} = useSelector((state)=>state.exercise);
    const {workouts:workoutsFetched, status:statusWorkouts} = useSelector((state)=>state.workout);
    const {programs:programsFetched, status:statusPrograms} = useSelector((state)=>state.program);
    useEffect(()=>{
        dispatch(fetchExercises());
        dispatch(fetchWorkouts());
        dispatch(fetchPrograms());
    },[dispatch])
    useEffect(()=>{
        if(statusPrograms==='succeeded'){
            setPrograms(programsFetched);
            setProgramsLoaded(true)
        }
    },[statusPrograms, programsLoaded])
    useEffect(()=>{
        if(statusWorkouts==='succeeded'){
            setWorkouts(workoutsFetched);
            setWorkoutsLoaded(true)
        }
    },[statusWorkouts,workoutsLoaded])
    useEffect(()=>{
        if(statusExercises==='succeeded'){
            setExercises(exercisesFetched);
            setExercisesLoaded(true)
        }
    },[statusExercises,exercisesLoaded])
    useEffect(()=>{
        if(deleted){
            dispatch(fetchPrograms());
        }
    },[deleted,dispatch])
    const handleAdd = ()=>{
        navigate('/program/add');
    }
    const handleEdit = (id)=>{
        navigate(`/program/update/${id}`)
    }

    const handleDelete = (id)=>{
        setDeleted(true)
    }
    const date = String(new Date())
    return(
        <>
            <button onClick={handleAdd}>Add a Program</button>
            <table>
                <thead>
                    <tr>
                        <td>                        
                            <h1>Programs</h1>
                        </td>
                        </tr>
                    <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Edit</th>                    
                    <th>Delete</th>                    
                    <th>Workouts</th>                    
                    </tr>
                </thead>
                <tbody>
                    {
                        exercisesLoaded && workoutsLoaded && programsLoaded &&
                        <>
                            {programs.map((program,index)=>{
                                return(
                                    <tr key={`${date}_${index}`}>
                                        <ProgramItem program={program}/>
                                        <td><button onClick={()=>{handleEdit(program.id)}}>Edit</button></td>
                                        <td><button onClick={()=>{handleDelete(program.id)}}>Delete</button></td>
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
export default ProgramGetAll