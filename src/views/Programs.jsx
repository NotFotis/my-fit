import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router"
import ProgramItem from "../forms/program/ProgramItem";
import WorkoutItem from "../forms/workout/WorkoutItem";
import { selectGoalById } from "../reduxParts/reducers/goalSlice";
import { selectProgramsByIds } from "../reduxParts/reducers/programSlice";
import { selectWorkoutsByIds } from "../reduxParts/reducers/workoutSlice";
import ToggleableWorkouts from "../toggles/ToggleableWorkouts";


const Programs = ()=>{
    const {id} =useParams();
    const dispatch=useDispatch();
    const {goal:goalSelected} = useSelector(state=>state.goal)
    const {selectedPrograms} = useSelector(state=>
        {
            // console.log(state.program);
            return state.program}
        )
    const {selectedWorkouts}=useSelector((state)=>
    {
        // console.log(state.workout);
        return state.workout
    });
    const [goal,setGoal] =useState();
    const [goalLoaded,setGoalLoaded] = useState(false);
    const [selectedProgramsLoaded,setSelectedProgramsLoaded] = useState(false);
    const [programsLoaded,setProgramsLoaded]=useState(false)
    const [programs,setPrograms]=useState();
    const [programsIsArray,setProgramsIsArray]=useState(false);
    const [workouts,setWorkouts]=useState()
    const [workoutsLoaded,setWorkoutsLoaded] = useState(false);
    const [workoutsToShow,setWorkoutsToShow]=useState(false);
    const [toggleWorkouts,settoggleWorkouts] = useState([])
    const [programWorkout,setProgramWorkout]=useState();
    const [workoutsPerProgram,setWorkoutsPerProgram]=useState([]);
    useEffect(()=>{
        dispatch(selectGoalById(id))
    },[dispatch])
    useEffect(()=>{
        if(goalSelected){
            setGoal(goalSelected);
            setWorkoutsPerProgram([...new Array(goalSelected.program)])
            dispatch(selectProgramsByIds(goalSelected.program));
            settoggleWorkouts([...goalSelected.program.map(()=>false)])
        }
        if(goalSelected){
            setGoalLoaded(true)
             
        }
        if(goalLoaded){
            
            // dispatch(selectProgramsByIds(id));
        }
    },[goal,goalSelected,goalLoaded,dispatch])
    useEffect(()=>{
        if(selectedPrograms){
            setSelectedProgramsLoaded(true);
        }
        if(selectedProgramsLoaded){
            setPrograms([...selectedPrograms]);
            
        }
    },[selectedPrograms, selectedProgramsLoaded])
    
   
    useEffect(()=>{
        if(workoutsLoaded){
            setWorkouts(selectedWorkouts);
            setWorkoutsToShow(true);
        }
    },[selectedWorkouts,workoutsLoaded])
    useEffect(()=>{
        if(programs){
            programs
            .map((program,programIndex)=>{
                    setWorkoutsPerProgram ((prevWorkouts)=>{
                                                if(Array.isArray(program.workout)){                        
                                                    if(!Array.isArray(prevWorkouts)){
                                                        // const newWorkouts = [...programs.map((program)=>program)]
                                                        
                                                        const newWorkoutsArray = new Array(program.workout.length)
                                                        for(let newArrayIndex in newWorkoutsArray){
                                                            newWorkoutsArray[newArrayIndex]=programs[newArrayIndex].workout;
                                                        }
                                                        console.log(newWorkoutsArray);
                                                        return [...newWorkoutsArray];
                                                    }
                                                    else{

                                                // const newWorkouts = [...prevWorkouts,...programs.map((program)=>program)]
                                                
                                                            const newWorkoutsArray = new Array(program.workout.length)
                                                            
                                                            
                                                            for(let newArrayIndex in newWorkoutsArray){
                                                                newWorkoutsArray[newArrayIndex]=programs[newArrayIndex].workout;
                                                            }
                                                            console.log(workoutsPerProgram);
                                                            return [...newWorkoutsArray];
                                                            
                                                        }
                                                }
                                                if(!Array.isArray(prevWorkouts)){
                                                    return
                                                }
                                                return [...prevWorkouts]
                                        
                                            }
                                        )
                    }
            )
            if(workoutsPerProgram.length>0)
                setProgramsLoaded(true);
        }
    },[programs])
    // useEffect(()=>{
    //     if(!showWorkouts){
    //         setWorkouts();
    //     }
    // },[showWorkouts])
   
    const toggleWorkoutsHandler=(workoutsIds,index)=>{
        
        settoggleWorkouts((prevValues)=>{
            const newValues = [...prevValues]
            newValues[index]=!prevValues[index]
            return newValues
        })
        console.log(workoutsPerProgram);
        console.log(toggleWorkouts);
        
    }
    const date=String(new Date());
    // WE MUST RETURN THE FALSE BOOLEANS TO WORK THIS
    if(!programsLoaded){
        return (<div>Loading programs...</div>)
    }
    // if(!workoutsToShow){
    //     return
    // }
    return(
        <>
        {
            programsLoaded&& 
            <table>
                <thead>
                    <tr>
                        <th colSpan={3}>
                            Programs
                        </th>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Total Workouts</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                
                <tbody>
                    {programs
                        .map((program,index,programs)=>{
                                            return (
                                                <React.Fragment key={`${date}_${index}`}>
                                                        <tr >
                                                            <ProgramItem program={program} key={`${date}_${index}`}/>

                                                            <td>{Array.isArray(program.workout)?program.workout.length:0}</td>
                                                            {!toggleWorkouts[index]?         <td><button key={`${date}_${index}_${index}`} onClickCapture={()=>toggleWorkoutsHandler(program.workout,index)}>Show workouts</button></td> :
                                                                <td><button key={`${date}_${index}_button`} onClickCapture={()=>toggleWorkoutsHandler(program.workout,index)}>Hide workouts</button></td>}

                                                        </tr>
                                                        
                                                    {toggleWorkouts[index] && workoutsPerProgram[index] &&  <ToggleableWorkouts  key={`${date}_${index}_toggle`} workoutIds={program.workout}  toggle={toggleWorkouts} workoutsPerProgram={workoutsPerProgram}/>}
                                                </React.Fragment>  
                                                    
                                                
                                                    )
                                }
                            )
                    }
                    
                            
                            
                        </tbody>
                    
               
            </table>        
        }
        </>
    )
}

export default Programs