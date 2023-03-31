import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import GoalFormAdd from "../forms/goal/GoalFormAdd";
import GoalItem from "../forms/goal/GoalItem";
import keycloak from "../keycloak";
import { fetchExercises } from "../ReduxParts/reducers/exerciseSlice";
import { fetchGoals, selectGoalById } from "../ReduxParts/reducers/goalSlice";
import { fetchProfiles, selectProfileById } from "../ReduxParts/reducers/profileSlice";
import { fetchPrograms } from "../ReduxParts/reducers/programSlice";
import { fetchWorkouts } from "../ReduxParts/reducers/workoutSlice";







const Profile = () =>{

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const profileId = 1;
    const goalId=1;
    const {goal:goalSelected,status:statusGoal,goals} = useSelector(state=>{
        console.log(state.goal);
        return state.goal})
    const {exercises:exercisesFetched, status:statusExercises} = useSelector((state)=>state.exercise);
    const {workouts:workoutsFetched, status:statusWorkouts} = useSelector((state)=>state.workout);
    const {programs:programsFetched, status:statusPrograms} = useSelector((state)=>state.program);
    const {profiles:profilesFetched,profile:selectedProfile, status:statusProfiles}=useSelector((state)=>state.profile);
    const [goalLoaded,setGoalLoaded] = useState(false)
    const [showLoadedGoal,setShowLoadedGoal] = useState(false)
    const [goal,setGoal]=useState();
    const [exercises,setExercises] = useState();
    const [workouts,setWorkouts] = useState();
    const [programs,setPrograms] = useState();
    const [profile,setProfile]=useState();
    const [exercisesLoaded,setExercisesLoaded] = useState(false);
    const [workoutsLoaded,setWorkoutsLoaded] = useState(false);
    const [programsLoaded,setProgramsLoaded] = useState(false);
    const [profileLoaded,setProfileLoaded]=useState(false)
    
    useEffect(()=>{
        dispatch(fetchProfiles());
        dispatch(fetchExercises());
        dispatch(fetchWorkouts());
        dispatch(fetchPrograms());
        dispatch(fetchGoals());
    },[dispatch])
    useEffect(()=>{
        if(statusProfiles==='succeeded'){
            dispatch(selectProfileById(profileId))
        }
        
    },[dispatch,statusProfiles])
    useEffect(()=>{
        if(selectedProfile){
            setProfile(selectedProfile);
        }
    },[selectedProfile])
    useEffect(()=>{
        if(statusGoal==='succeeded' && profile){
            dispatch(selectGoalById(profile.goal))
            setGoalLoaded(true)
        }
        if(goalLoaded){
            setGoal(goalSelected)
            setShowLoadedGoal(true)
        }
    },[statusGoal,goalLoaded,showLoadedGoal,statusExercises,statusWorkouts,statusPrograms, profile])
    useEffect(()=>{
        if(statusExercises ==='succeeded'){
            setExercises(exercisesFetched);
        }
    },[statusExercises,exercises,exercisesFetched])
    useEffect(()=>{
        if(statusWorkouts==='succeeded'){
            setWorkouts(workoutsFetched)
        }
    },[statusWorkouts,workouts,workoutsFetched])
    useEffect(()=>{
        if(statusPrograms==='succeeded'){
            setPrograms(programsFetched);
        }
    },[statusPrograms,programs,programsFetched])
    useEffect(()=>{
        if(programs){
            setProgramsLoaded(true)
        }
        if(exercises){
            setExercisesLoaded(true)
        }
        if(workouts){
            setWorkoutsLoaded(true)
        }
    },[exercises,exercisesLoaded,workouts,workoutsLoaded,programs,programsLoaded])
    // useEffect(()=>{
    //     if(goalLoaded){
    //         setGoal(goalSelected);
    //         setShowLoadedGoal(true);
    //     }
    // },[goalLoaded,showLoadedGoal])
    
    useEffect(()=>{},[])
    useEffect(()=>{},[])

    if(!showLoadedGoal || !workoutsLoaded || !exercisesLoaded || !programsLoaded){
        return <div>Loading...</div>
    }
    const handleNavToPrograms = (id)=>{
        navigate(`/goal/${id}/programs`);
    }
    const handleRegisteredPrograms = ()=>{
        
    }
    const handleRegisteredWorkouts = (id)=>{
        navigate(`/goal/${id}/workouts`)
    }
    const handleRegisteredExercises = (id)=>{
        navigate(`/goal/${id}/exercises`)
    }
    const handleGoalEdit = (id)=>{
        navigate(`/goal/update/${id}`)
    }
    const handleGoalAdd = ()=>{
        navigate('/goal/add');
    }
    return(
    <>
        {
        showLoadedGoal&& workoutsLoaded && exercisesLoaded && programsLoaded &&
        <>

            <button onClick={handleRegisteredPrograms}>My programs</button>
            <button onClick={()=>{handleRegisteredWorkouts(goal.id)}}>My workouts</button>
            <button onClick={()=>{handleRegisteredExercises(goal.id)}}>My exercises</button>
            <button onClick={()=>{handleGoalEdit(goal.id)}}>Change My goal</button>
            <button onClick={()=>{handleGoalAdd()}}>Set a Goal</button>


            <table>
                <thead>
                    <tr>
                        <th colSpan={5}>My Goals</th>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <th>Date started</th>
                        <th>Date ended</th>
                        <th>Total Programs</th>
                        <th>Programs</th>
                    </tr>
                        
                </thead>
                <tbody>
                    <tr>
                        <GoalItem goal={goal}/>
                        <td><button onClick={()=>handleNavToPrograms(goal.id)}>Show Details</button></td>
                    </tr>
                </tbody>
            </table>
        </>
        }
        
    </>
    )
}

export default Profile