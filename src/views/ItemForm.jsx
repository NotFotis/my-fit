import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Input from "../form/Input";
import Label from "../form/Label";
import PopupForm from "../form/PopupForm";
import { itemStructureToAttributes, mapPayload } from "../mappers/mapPayload";
import dispatchCruncher from "../ReduxParts/dispatchCruncher";
import { getAllExercisesAsync } from "../ReduxParts/exercise/exerciseSlice";

const ItemForm = ({item, itemStructure, formActions, itemChildStructure})=>{
    const [update,setUpdate]=useState(formActions.update);
    const [forDelete,setDelete]=useState(formActions.delete);
    const [display,setDisplay]=useState(true);
    const [create,setCreate]=useState(formActions.create);
    const {register,handleSubmit} = useForm();
    const dispatch =useDispatch();
    const [ID,setId]= useState(0);
    const [showPopup, setShowPopup] =useState(false);
    const exercises=useSelector(state=>state['exercise']);
    const checkbox =useRef();
    useEffect(()=>{
        if(item){
            setId(item.id)
        }
        // dispatch(getAllExercisesAsync());
    },[item?item.id:0,dispatch])

    const onSubmit = (values)=>{
        console.log('Submit button pressed');
        console.log(values);
        const itemPayload = mapPayload(values, itemStructure);
        if(update){
            dispatchCruncher(dispatch,itemPayload,ID,'workout','patch')
        }
    }

    const showHandler = ()=>{
        console.log('show clicked');
        setShowPopup(!showPopup);
    }
    const handleChange=()=>{
        if(checkbox.current.checked){
            console.log('checkbox clicked');
            setUpdate(true)
            setDelete(false)
            formActions.delete = false;
            formActions.update = true;
            return
        }else{
            console.log('checkbox unclicked');
            setUpdate(false)
            setDelete(true)
            formActions.delete = true;
            formActions.update = false;
            return 
        }
    }
    const formFieldsList =[];
    const date= new Date();
    let findPopup =-1;
    for(let itemStructureKey in itemStructure){
        const [inputProps,isArray,labelName]=itemStructureToAttributes(itemStructureKey,itemStructure,formActions,item,register);
        if(isArray){
            findPopup=itemStructureKey;
        }        
        
        if(!isArray){
            formFieldsList.push(
                <div key={`${String(date)}_${itemStructureKey}`}>
                    <Label  labelName={labelName} inputProps={inputProps} forDisplay={display} forEditing={update} forCreate={create}/>
                   
                </div>
        )}

    }

    // console.log(item);
    return(
    
    <>
        <form onSubmit={handleSubmit(onSubmit)}>
            {
            !create && 
            <>
                <input type={'checkbox'} ref={checkbox} onChange={handleChange} />
                {update && formFieldsList}
                {forDelete && formFieldsList}
            {formActions.create && <button type="submit">Add</button>}
            {update && <button type="submit">Save</button>}
            {forDelete && <button type="submit">Delete</button>}
            </>
            }
        </form>
        {
        findPopup!=-1 && 
        <>
            
            {/* <button onClick={showHandler}>Show</button> */}
            {/* this goes to popup */}
            {/* <button onClick={showHandler}>Hide</button> */}
            {/* {showPopup && <PopupForm itemType={'exercise'} idArray={[23,25]} itemPool={exercises}/>} */}
        </>
        }
    </>
    )
}

export default ItemForm