import { useState } from "react";
import ExerciseForm from "./ExerciseForm";
import { getAllExercisesAsync } from "../../reduxParts/exercise/exerciseSlice";

const ExerciseUpdate = ()=>{
    const [displayForm, setDisplayForm] = useState(false);
    const stateBefore = getState();
    function handleClick(){
        // navigate("/ProgramForm")
        displayForm==true?setDisplayForm(false):setDisplayForm(true);
    }
    return(
        <>
        <button onClick={handleClick}>Edit exercise</button>
        {displayForm&& <ExerciseForm forAdding={false} exercises={exercises}></ExerciseForm>}
        </>
    )
}
export default ExerciseUpdate