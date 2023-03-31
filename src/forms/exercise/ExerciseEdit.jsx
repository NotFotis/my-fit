import './exercise-style.css'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { fetchExercises, selectExerciseById, updateExercise } from "../../ReduxParts/reducers/exerciseSlice";
const ExerciseEdit = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {id}=useParams();
    const [loaded,setLoaded]=useState(false);
    const [formData, setFormData] = useState({ name: '', desc: '', repetitions: 0, tmg: '', img: '', vid: '' });
    // console.log(formData);
    // const books = useSelector((state) => selectByIds(state.books, bookIds));
    const exercise = useSelector((state) => {
        console.log(state.exercise.exercise);
        return state.exercise.exercise;
        
    });
    
    // const {exercises, status} = useSelector(state => selectExerciseById(state.exercise,id));
    const [exercise2,setExercise]=useState();
    
    
    useEffect(()=>{
        
        
            dispatch(selectExerciseById(id));
            // setExercise(exercises)
            console.log(exercise2);
            console.log(exercise);
            setLoaded(true)
            
        if(exercise==undefined){

        }
    },[dispatch,loaded])
    useEffect(()=>{
        if(loaded){
            setFormData(exercise);
            console.log(formData);
        }
    },[loaded])
    
    const handleSubmit =(event)=>{
        event.preventDefault();
        console.log('Submit button Clicked');
        // setFormData(formData)
        
        const itemPayload= {id:exercise.id,name: formData.name, desc: formData.desc, repetitions: formData.repetitions, tmg: formData.tmg, img: formData.img, vid: formData.vid, workout: exercise.workout, complete:false };
        console.log(itemPayload);
        dispatch(updateExercise(itemPayload));
    }

    const handleBack = ()=>{
        navigate('/exercises')
    }
    if(!loaded){
        return <div>Loading</div>
    }else{
        console.log(exercise);
    }
    return(
        
        <>
        {loaded &&
        <form onSubmit={handleSubmit}>
           <div>
                <label>
                    Name:
                    <input
                        type="text"
                        value={formData.name ||''}
                        // defaultValue={exercise.name}
                        onChange={(event) =>
                        setFormData({ ...formData, name: event.target.value })
                    }/>
                    
                </label>
            </div>
            <div>
                <label>
                    Description:
                    <input
                        type="text"
                        value={formData.desc ||''}
                        // defaultValue={exercise.desc}
                        onChange={(event) =>
                        setFormData({ ...formData, desc: event.target.value })
                    }/>
                    
                </label>
            </div>
            <div>
                <label>
                    Muscle Group:
                    <input
                        type="text"
                        value={formData.tmg ||''}
                        // defaultValue={exercise.tmg}
                        onChange={(event) =>
                        setFormData({ ...formData, tmg: event.target.value })
                    }/>
                   
                </label>
            </div>
            <div>
                <label>
                    Repetitions:
                    <input
                        type="number"
                        value={formData.repetitions ||0}
                        // defaultValue={exercise.repetitions}
                        onChange={(event) =>
                        setFormData({ ...formData, repetitions: event.target.value })
                    }/>
                    
                </label>
            </div>
            <div>
                <label>
                    Image:
                    <input
                        type="text"
                        value={formData.img ||''}
                        // defaultValue={exercise.img}
                        onChange={(event) =>
                        setFormData({ ...formData, img: event.target.value })
                    }/>
                    
                </label>
            </div>
            <div>
                <label>
                    Video:
                    <input
                        type="text"
                        value={formData.vid ||''}
                        // defaultValue={exercise.vid}
                        onChange={(event) =>
                        setFormData({ ...formData, vid: event.target.value })
                    }/>
                    
                </label>
            </div>
            
            
            <button type="submit">Save</button>
        </form>
    }
        <button onClick={handleBack}>Back</button>
        </>
        )




}


export default ExerciseEdit