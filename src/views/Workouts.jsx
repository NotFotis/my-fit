import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router";
import { removeObjectsById } from "../helpers/removeObjectsByid";
import { selectGoalById } from "../reduxParts/reducers/goalSlice";
import { selectProgramsByIds } from "../reduxParts/reducers/programSlice";
import { selectWorkoutsByIds } from "../reduxParts/reducers/workoutSlice";
import {removeDuplicateObjects} from "../helpers/removeDuplicateObjects";
import WorkoutItem from "../forms/workout/WorkoutItem";
import { removeDuplicateNumbers } from "../helpers/removeDuplicateNumbers";



const Workouts = () =>{
    const dispatch= useDispatch();
    //validate the id goal(select the profile id, then select the goal id, we suupose that the goal id is 1)
    const goalId=1;
    const {id}=useParams();
    
    const [isUsersProfile,setIsUsersProfile]=useState()
    const goalSelected=useSelector((state)=>state.goal.goal)
    const programsSelected = useSelector((state)=>state.program.selectedPrograms);
    const statusPrograms = useSelector((state)=>state.program.statusSelectedPrograms);
    const workoutsSelected = useSelector((state)=>{
        // console.log('state of workouts',state.workout);
        return state.workout.selectedWorkouts});
    const [goalLoaded,setGoalLoaded] = useState(false)
    const [goal,setGoal]=useState({});
    const [programs,setPrograms]=useState([]);
    const [programsLoaded,setProgramsLoaded]=useState(false);
    const [workoutsLoaded,setWorkoutsLoaded]=useState(false);
    const [workoutIdsCollectionFinished,setWorkoutIdsCollectionFinished]=useState();
    const [workoutIds,setWorkoutIds]=useState([])
    const [workoutIdsLoaded,setWorkoutIdsLoaded]=useState(false)
    const [workouts,setWorkouts]=useState([])
    const [workoutsToShow,setWorkoutsToShow]=useState(false)
    const [exerciseIds,setExerciseIds]=useState([]);
    const [exerciseIdsLoaded,setExerciseIdsLoaded]=useState(false);
    const [toggleExercises,setToggleExercises]=useState([]);
    console.log(workoutsSelected);
    //select programs
    //select the workouts in registerd programs
    useEffect(()=>{
        if(goalSelected){
            setGoal(goalSelected)
                
            
        }
    },[goalSelected])
    
    useEffect(()=>{
        if(goal){
            dispatch(selectProgramsByIds(goalSelected.program))
            console.log(goal.id);
            setGoalLoaded(true)
        }
       
    },[dispatch,goal,goalLoaded])
    
    useEffect(()=>{
        if(programsSelected.length>=1){
            setPrograms((prevPrograms)=>{
                if(programsSelected==undefined){
                    return prevPrograms
                }
                let newPrograms = [...prevPrograms,...programsSelected];
                newPrograms = removeDuplicateObjects(newPrograms)
                console.log(programs);
                return [...newPrograms]
                }
            )
            // setPrograms([...programsSelected])
            
        }
        // if(programs){
        //     setProgramsLoaded(true)
        // }
    },[programsSelected])
    useEffect(()=>{
        if(programsSelected){
            
            // programsSelected.forEach(
            //     (program,index,programsSelected)=>{
            //         console.log(program.workout);
            //         setWorkoutIds((prevIds)=>{
            //             // if(program.workout==undefined){return }
            //             console.log(workoutIds);
            //             const newIds = [...prevIds,...program.workout]
            //             return [...new Set(newIds)];
            //             }
            //         )
            //        if(index==programsSelected.length-1){
            //             setWorkoutIdsLoaded(true)
            //        }
            //     }
            // )
            const wIdPool = programsSelected.map((program)=>program.workout)
            setWorkoutIds(...wIdPool)

        }
           
        

    },[programsSelected])
    useEffect(()=>{
            if(workoutIds.length>1){
            console.log('workout ids',workoutIds);
            setWorkoutIdsCollectionFinished(true)
            dispatch(selectWorkoutsByIds(workoutIds))
            const newToggledExercises = workoutIds.map(() => false);
            setToggleExercises(newToggledExercises);
        }
        
    },[workoutIds])
    useEffect(()=>{
        
        if(workoutsSelected){
            setWorkouts((prevWorkouts)=>{
                let newWorkouts = [...prevWorkouts,...workoutsSelected]
                console.log(workoutsSelected);
                newWorkouts = removeDuplicateObjects(newWorkouts)
                return [...newWorkouts]
            })
            // setWorkouts([...workoutsSelected])
            setWorkoutsLoaded(true)
            console.log(workoutsSelected);
            console.log(workouts);
        }
    },[workoutsSelected])
    useEffect(()=>{
        if(workouts.length>=1){
            // setWorkoutsToShow(true)
            // workouts.map((workout,index,workouts)=>{
            //     setExerciseIds((prevIds)=>
            //     {
            //         if(workout.exercise==undefined){return prevIds}
            //         const newIds = [...prevIds,...workout.exercise];
                    
            //         console.log(exerciseIds);
            //             return [...removeDuplicateNumbers(newIds)];
            //         })
               
            // }
            
            // const exIdPool= workouts.map((workout)=>workout.exercise);
            // setExerciseIds([...new Set(exIdPool)])

        }
    },[workouts])
    
    useEffect(()=>{
       
        if(goalSelected.id!=undefined && goalSelected.id==id){
            console.log(goalSelected);
            // goalSelected.id===id?setIsUsersProfile(true):setIsUsersProfile(false)
            setIsUsersProfile(true)
        }
    },[goalSelected])
    
   

   useEffect(()=>{
        console.log(isUsersProfile);
   },[isUsersProfile])

    const toggleExercisesHandler=(exerciseIds,index)=>{
        setToggleExercises((prevValues)=>{
            const newValues = [...prevValues]
            newValues[index]=!prevValues[index]
            return newValues
        })
    }
   
    if(!workouts.length>=1){
        return <div>Loading...</div>
    }
    if(!isUsersProfile){
        return <div>Error, these are not your registered workouts</div>
    }
    const date=String(new Date());
    return(
        <>
        <table>
            <thead>
                <tr><th colSpan={3}>My Workouts</th></tr>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Total Exercises</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
        {workouts.length>=1 &&
            workouts.map((workout,index)=>{
               
            return    <React.Fragment key={`${date}_frag_${index}`}>
                    <tr key={`${date}_${index}_tr`}>
                        <WorkoutItem workout={workout}/>

                    {!toggleExercises[index] ?  <td><button onClick={()=>toggleExercisesHandler(workout.exercise,index)}>Show exercises</button></td>
                        :<td><button onClick={()=>toggleExercisesHandler(workout.exercise,index)}>Hide exercises</button></td>}

                    </tr>
                    
                    <tr></tr>
                </React.Fragment>
            }

            )
        }
        </tbody>
        </table>
        </>
    )
}

export default Workouts