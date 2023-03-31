import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router"
import ExerciseItem from "../forms/exercise/ExerciseItem";
import { selectExercisesByIds } from "../ReduxParts/reducers/exerciseSlice";
import { selectGoalById } from "../ReduxParts/reducers/goalSlice";
import { selectProgramsByIds } from "../ReduxParts/reducers/programSlice";
import { selectWorkoutsByIds } from "../ReduxParts/reducers/workoutSlice";

// programs,workouts
//programs have workout ids, make an array of ids for each program
//then pass the array ids to workouts
const Exercises = ()=>{
    const {id} = useParams();
    const dispatch = useDispatch();
    const {goal:selectedGoal}=useSelector(state=>
        {
            console.log(state.goal);
            return state.goal
        }
        )
    const [goal,setGoal]=useState();
    const programsSelected = useSelector((state)=>{
        return(
            state.program.selectedPrograms    
        )
    })
    const workoutsSelected = useSelector((state)=>{
        return(
            state.workout.selectedWorkouts    
        )
    })
    const exercisesSelected = useSelector((state)=>{
        console.log(state.exercise);
        console.log(state.exercise.selectedExercises);
        return(
            state.exercise.selectedExercises    
        )
    })
    const [goalLoaded,setGoalLoaded]=useState(false);
    const [programsLoaded,setProgramsLoaded]=useState(false);
    const [workoutsLoaded,setworkoutsLoaded]=useState(false);
    const [exercisesLoaded,setExercisesLoaded]=useState(false);
    const [exercisesLoadedCompleted,setExercisesLoadedCompleted]=useState(false);
    const [programs,setPrograms]=useState();
    const [workouts,setWorkouts]=useState();
    const [exercises,setExercises]=useState();
    const [exIdPool,setExIdPool]=useState([])
    const [wIdPool,setwIdPool]=useState([])
    const [pIdPool,setpIdPool]=useState([])
    
    
    // const [exercisesLoaded,setExercisesLoaded]=useState(false);
    useEffect(()=>{
        dispatch(selectGoalById(id));
    },[dispatch])
    
   
    
    
    useEffect(()=>{
        if(selectedGoal){
            
            setGoal(selectedGoal);
        }
    },[selectedGoal])
    useEffect(()=>{
        if(goal){
            setGoalLoaded(true)
        }
    },[goal])
    useEffect(()=>{
        if(goalLoaded){
            dispatch(selectProgramsByIds(goal.program))

        }
    },[goalLoaded])
    useEffect(()=>{
        if(programsSelected){
            
            setPrograms(programsSelected)
        }
        if(programs){
            programs.forEach(program => {
                
                setwIdPool((prevIds)=>{
                    let  newIds=[];
                    if(Array.isArray(prevIds)){
                        newIds = [...prevIds]
                        if(Array.isArray(program.workout)){
                            newIds = [...prevIds,...program.workout]
                        }
                    }else{
                        if(Array.isArray(program.workout)){
                            newIds = [...program.workout]
                        }
                    }
                    const newIdsFixed= [...newIds];
                    // const newIds =[...new Set(prevIds)];
                    console.log(newIdsFixed);
                    return [...new Set(newIdsFixed)]
                    
                    
                })
            });
            setProgramsLoaded(true)
        }
    },[programsSelected, programsLoaded])
    useEffect(()=>{
        if(programsLoaded){
           
           
        }
        
    },[programsLoaded])
    useEffect(()=>{
        if(wIdPool){
            
            dispatch(selectWorkoutsByIds(wIdPool))
            console.log('pls not loop');
        }
        
    },[dispatch,wIdPool])
    useEffect(()=>{
        console.log(workoutsSelected);
        if(Array.isArray(workoutsSelected) && workoutsSelected.length>0){
            if(workoutsSelected[0]!=undefined){
                setWorkouts(workoutsSelected)
                console.log(workoutsSelected);
        }
        }
    },[workoutsSelected])
    useEffect(()=>{
        if(workouts){
            setworkoutsLoaded(true)
        }
    },[workouts])
    useEffect(()=>{
        if(workoutsLoaded){
            workouts.forEach(workout=>{
                setExIdPool((prevIds)=>{
                    console.log(workout.exercise);

                    const newIds = [...new Set(prevIds),...workout.exercise]
                    if(newIds!=undefined){
                        return newIds
                    }
                    else{
                        return
                    }
                    
                })
                console.log(exIdPool);
            })
           
        }
    },[workoutsLoaded])
    useEffect(()=>{
        if(exIdPool.length>0 && exIdPool[0]!=undefined){
                // setExIdPool((prevIds)=>[...new Set(prevIds)])
                console.log(exIdPool);
                dispatch(selectExercisesByIds(exIdPool))
        }
    },[dispatch,exIdPool])
    useEffect(()=>{
        if(exercisesSelected.length>0 && exercisesSelected[0]!=undefined){
            console.log(exercisesSelected);
            setExercises(exercisesSelected)
        }
    },[exercisesSelected])
    useEffect(()=>{
        if(exercises){
            setExercisesLoadedCompleted(true)
        }
    },[exercises])
    useEffect(()=>{
        if(exercisesLoadedCompleted){
            setExercisesLoaded(true)
        }
    },[exercisesLoadedCompleted])
    // useEffect(()=>{
    //     if(workoutsSelected){
    //         setWorkouts(workoutsSelected)
    //         console.log('setting workouts');
    //     }
    // },[workoutsLoaded])
    if(!exercisesLoaded){
        return <div>Loading exercises...</div>
    }
    const date = String(new Date())
    return(
        <>
            <table>
                <thead>
                    <tr>
                        <th colSpan={6}>My Exercises</th>
                    </tr>
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
            {exercisesLoaded && exercises.map(
                (exercise,index)=>{
                    return(
                        <React.Fragment key={`${date}_${index}_frag`}>
                    <tr>
                        <ExerciseItem exercise={exercise} key={`${date}_${index}_ex`}/>
                    </tr>
                    </React.Fragment>
                    )
                }
            )}
            </tbody>
            </table>
        </>
    )
}
export default Exercises