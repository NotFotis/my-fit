import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { updateExerciseAsync } from '../../reduxParts/exercise/exerciseSlice';

const ExerciseListItem = ({exercise, handleAdd}) => {
  console.log(exercise);
  const checkbox = useRef();
  const {register,handleSubmit}=useForm();
  const [toEdit,setToEdit]=useState(false);
  const dispatch = useDispatch();

  const exerciseNameConfig = {
    required: true,
    minLength:2
}
 
  const exerciseStructure={
    //value, attribute name to user, attribute name to handle
    'exerciseName': [exercise.name, 'Name', 'name'],
    'exerciseDesc': [exercise.desc, 'Description', 'desc'],
    'exerciseTmg': [exercise.tmg, 'Muscle group', 'tmg'],
    'exerciseRepetitions':[exercise.repetitions, 'Repetitions', 'repetitions'],
    'exerciseImg': [exercise.img, 'Image', 'img'],
    'exerciseVid': [exercise.vid, 'Video', 'vid'],
    'exerciseComplete': [exercise.complete, 'Completed', 'complete'],
     'exerciseWorkout': [exercise.workout, 'Workouts', 'workout']

  }



  
  const onClick = exercise => {
    handleAdd(exercise.target.value)
  }
  
  
  const onSubmit = (values) =>{
    console.log('Submit button clicked');
    //update exercise with id
    const id=exercise.id;
    //copy the register values of exercise structure as keys in exercisePayload
    //copy the values of all inputs as value to every key of exercise payload
    console.log(values);
    const exercisePayload = {
    }
    for (let exerciseStructureKey in exerciseStructure){
      const exercisePayLoadKey = exerciseStructure[exerciseStructureKey][2];
      exercisePayload[exercisePayLoadKey] = values[exercisePayLoadKey];
    }
    
    // dispatch(updateExerciseAsync({id, desc:values.desc}))
    dispatch(updateExerciseAsync({id, exercisePayload}))
  }

  //change to input fields when checkbox is checked
  function handleChange(){
    if(checkbox.current.checked){
      setToEdit(true);
      return
    }
    setToEdit(false)
  }
  
  const exerciseAttributeList=[]
  const attribute={}
  let index = 0;
  for(let exerciseStructureKey in exerciseStructure){
    let inputType = "text";
    let inputValue = exerciseStructure[exerciseStructureKey][0];
    let labelName = exerciseStructure[exerciseStructureKey][1];
    let inputRegisterName = exerciseStructure[exerciseStructureKey][2];
    // console.log('inputRegisterName', inputRegisterName);
    if(typeof inputValue=='number'){
      inputType = 'number';
    }
    const id = exercise.id
   exerciseAttributeList.push(
       <div key={`exercise${id}Attributes${index}`}>
      
      <label key={`exercise${id}Attributes${index}`}> {`${labelName}:`} 
      {!toEdit && inputValue}
      {toEdit&& <input key={`input_${id}_${index}`} type={inputType} defaultValue={inputValue} {...register(inputRegisterName,exerciseNameConfig)}/>}
      </label>
      
      
      </div>
      
   )
   

   index++;
  }
  // exerciseAttributeList.push()

  return (

    <div key={`exercise${exercise.id}`}>
    
      
      <input  type={'checkbox'} ref={checkbox} onChange={handleChange}/><br></br>
    
    
    <form onSubmit={handleSubmit(onSubmit)} >
    {/* <label>Name:{exercise.name} </label><br></br>
    <label>Description:{exercise.desc} </label><br></br>
    <input type="text" id='description-input' {...register('desc',exerciseNameConfig)}/>
    <label>Muscle Group:{exercise.tmg} </label><br></br>
    <label>Repetitions:{exercise.repetitions} </label><br></br>
    <label>Image link:{exercise.img} </label><br></br>
    <label>Complete:{exercise.complete} </label><br></br>
    <label>Workout:{exercise.workout} </label><br></br> */}
    <>
    {exerciseAttributeList }
    {toEdit&&
    <div key={`exercise${exercise.id}Attributes${index}`}>
      <button key={`button_${exercise.id}`} type='submit' value={'Save'} /*onClick={()=>{setToEdit(false),checkbox.current.checked=false}}*/>
        Save
      </button>
    </div>
    }
    </>
    <br></br>
    {/* {toEdit&& <button type='submit'>Save</button>} */}
    </form>
    {/* {toEdit&& <>test</>} */}
    {/* <button onClick={onClick}>
    </button> */}
    </div>

  )
}

export default ExerciseListItem