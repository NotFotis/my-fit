import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect, useState } from 'react';
import { addExercise, getAllExercisesAsync } from '../../reduxParts/exercise/exerciseSlice';
import ExerciseListItem from './ExerciseListItem';

const exerciseNameConfig = {
    required: true,
    minLength:2
}
const exerciseRepetitionsConfig={
    required:true
}
const ExerciseForm = ({forAdding, item})=>{
    const dispatch = useDispatch();
   useEffect(()=>{
    dispatch(getAllExercisesAsync());
   },[dispatch]);

    const [value, setValue] = useState('');
    const {register,handleSubmit, formState:{errors}} = useForm();
    const [loading, setLoading] = useState(false);
    const exercises = useSelector(state=>{
        
        return state.exercise});
    
    const onSubmit = (values)=>{
        setLoading(true)
        if(values)
            dispatch(addExercise({
                name:values.name,
                desc:values.desc,
                tmg:values.tmg,
                repetitions:values.repetitions,
                img:values.img,
                complete:false,
                // workout:[]
            }));
        setLoading(false)
    };

    

    return(
        <>
        {forAdding&&<>
            <form onSubmit={handleSubmit(onSubmit)}>

            <h1>Add exercise</h1>
            <label htmlFor='exercise-name-input'>Exercise's name:</label>
            <input type="text" id='exercise-name-input' {...register('name',exerciseNameConfig)}/>
            <label htmlFor='description-input'>Exercise's description:</label>
            <input type="text" id='description-input' {...register('desc',exerciseNameConfig)}/>
            <label htmlFor='muscle-group-input'>Exercise's muscle group:</label>
            <input type="text" id='muscle-group-input' {...register('tmg',exerciseNameConfig)}/>
            <label htmlFor='repetitions-input'>Exercise's repetitions:</label>
            <input type="number" id='repetitions-input' {...register('repetitions',exerciseRepetitionsConfig)}/>
            <label htmlFor='img-input'>Exercise's image link:</label>
            <input type="text" id='img-input' {...register('img',exerciseNameConfig)}/>
            {/* <input type="text" id='img-input'/> add to workout(first get all workouts and make the contributor to select the workout) */}
            <button type="submit" id='add-exercise-button' disabled={loading}>Add</button>
            </form>
        </>
        }
        {!forAdding && <>
        <h1>Edit exercise</h1>
        {/* {console.log(exercises)} */}
        {/* {console.log(item)} */}
            {exercises.map((exercise,index)=>{ return <ExerciseListItem key={`exercise${index}`} exercise={exercise}/>})}
        {/* <button>Save</button> */}
        </>}
        </>
    )
}

export default ExerciseForm