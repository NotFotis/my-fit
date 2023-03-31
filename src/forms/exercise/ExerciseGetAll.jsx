import './exercise-style.css'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteExercise, fetchExercises } from "../../ReduxParts/reducers/exerciseSlice";
import ExerciseItem from "./ExerciseItem";
import {useNavigate} from 'react-router-dom'

const ExerciseGetAll = ()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {exercises:exercisesFetched,status} = useSelector(state=>
        {   console.log(state);
            return state.exercise
        }
        );
    const [exercises,setExercises]=useState();
    const [loaded,setLoaded]=useState(false);
    const [deleted,setDeleted]=useState(false);

    useEffect(()=>{
        dispatch(fetchExercises())
    },[dispatch])

    useEffect(()=>{
        if(status==='succeeded'){
            setExercises(exercisesFetched);
        }
    },[status])
    useEffect(()=>{
        if(deleted){
            setDeleted(false);
            dispatch(fetchExercises())
        }
    },[deleted,dispatch])
    useEffect(()=>{
        if(exercises!=exercisesFetched){
            setExercises(exercisesFetched);
        }
    },[exercises])
    const handleGetAll = (event)=>{
        // dispatch(fetchExercises());
            // dispatch(fetchExercises())
            // setExercisesFetched([...exercise]);
        setLoaded(true)
            
    }
    const handleEdit = (id)=>{
        console.log(id);
        navigate(`/exercise/update/${id}`)
    }

    const handleDelete = (id)=>{
        console.log(id);
        dispatch(deleteExercise(id))
        setDeleted(true)
        // dispatch(fetchExercises())
    }

    const handleAdd = ()=>{
        navigate('/exercise/add');
    }
    const handleSome = ()=>{
        navigate('/exercise/select')
    }

    const date = String(new Date());
    return(
        <main className='GetAll'>
        <button onClick={handleGetAll}>Show All Exercises</button>
        <button onClick={handleAdd}>Add An Exercise</button>
        <button onClick={handleSome}>Get Some Exercises</button>
        <table>
            <thead>
                <tr>

                
                <th>Name</th>
                <th>Description</th>
                <th>Muscle Group</th>
                <th>Repetitions</th>
                <th>Image</th>
                <th>Video</th>
                <th>Edit</th>
                <th>Delete</th>
                </tr>
            </thead>
            <tbody>
        {loaded&& <>

            { exercises.map((exercise,index)=>{
                return(
                    
                        <tr key={`${date}_${index}`}>
                        <ExerciseItem exercise={exercise}/>
                        <td><button className='edit' onClick={()=>{handleEdit(exercise.id)}}>Edit</button></td>
                        <td><button className='delete' onClick={()=>{handleDelete(exercise.id)}}>Delete</button></td>
                        </tr>
                    
                )
            })}
        </>}
        
        </tbody>
        </table>

        </main>
    )
}
export default ExerciseGetAll