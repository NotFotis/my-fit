import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../mappers/formatDate";
import { addGoal } from "../../ReduxParts/reducers/goalSlice";
import ProgramItem from "../program/ProgramItem";

const GoalFormAdd = ()=>{
    const programs = useSelector((state)=>state.program.programs);
    const [programsLoaded,setProgramsLoaded]=useState(false);
    const [checkedItems,setCheckedItems] = useState([]);
    const [programIds,setProgramIds]=useState([]);
    const [formData,setFormData]=useState({name:'', start_date:formatDate(new Date()), end_date:formatDate(new Date()), total_programs:[], completed_programs:0, program:[]})
    const dispatch = useDispatch();
    useEffect(()=>{
        if(programs){
            setProgramIds([...programs.map(()=>0)]);
            setCheckedItems([...programs.map(()=>false)]);
            console.log(programIds);
        }
    },[programs])
    useEffect(()=>{
        setProgramIds([...checkedItems.map((item,index)=>{
            if(item){
                return programIds[index];
            }
            return 0;
        })])
            
            
        
    
        // setProgramIds(programIds
        //     .map((id,index)=>{
        //             const newIdZero = 0;
        //             const newId = id;
        //             if(!checkedItems[index]){
        //                 return newIdZero;
        //             }
        //             return newId;
        //             }
        //         )
        // )
        console.log(programIds);
    },[checkedItems])
    const handleSubmit = (event)=>{
        event.preventDefault();
        const programIdsPool = programIds.filter((item)=>item!==0)
        console.log(programIdsPool);
        const itemPayload = {name:formData.name, start_date:formData.start_date, end_date:formData.end_date, total_programs:formData.total_programs, completed_programs:formData.completed_programs, program:programIdsPool}
        dispatch(addGoal(itemPayload))
    }
    const handleProgram = (event,itemId,index)=>{

        setCheckedItems((prevItems)=>{
            const newItems = [...prevItems];
            newItems[index] = !prevItems[index]
            return newItems
        })

        setProgramIds((prevIds)=>{
            const newIds = [...prevIds];
            newIds[index]=itemId;
            return newIds;
        })
    }
    const date = (new Date())
    if(!programs && !programIds){
        return(<div>Goal Form Loading...</div>)
    }
    return(
        <>
        <form onSubmit={handleSubmit}>
        <table>
            <thead>
                <tr>
                    <th colSpan={4}>Edit Goal</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Name</td>
                    <td><input type={'text'} value={formData.name} onChange={(event)=>setFormData({...formData,name:event.target.value})}></input></td>
                </tr>
                <tr>
                    <td>Start date</td>
                    <td><input type={'date'} value={formData.start_date} onChange={(event)=>setFormData({...formData,start_date:event.target.value})}></input></td>
                </tr>
                <tr>
                    <td>End Date</td>
                    <td><input type={'date'} value={formData.end_date} onChange={(event)=>setFormData({...formData,end_date:event.target.value})}></input></td>
                </tr>
                {/* <tr>
                    <td>Total Programs</td>
                    <td>
                        <input type={'number'} value={formData.total_programs} onChange={(event)=>setFormData({...formData,total_programs:event.target.value})}></input>
                        
                    </td>
                </tr>
                 */}
                    
                

            </tbody>
        </table>
        <table>
            <thead>
                <tr>
                    <th colSpan={4}>Programs to add or remove</th>
                </tr>
                <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Total Workouts</th>
                </tr>
            </thead>
            <tbody>
                {programs.map((program,index)=>{
                    return(
                        <React.Fragment key={`${date}_${index}`}>
                            <tr>
                                <ProgramItem program={program} key={`${date}_${index}_${program}`}/>
                                <td><input type={'checkbox'} onChange={(event)=>handleProgram(event,program.id,index)} checked={checkedItems[index] || false}/></td>
                            </tr>
                        </React.Fragment>
                    )
                })}
                <tr>
                    <td colSpan={3}><button type="submit">Submit</button></td>
                </tr>
            </tbody>
        </table>
        </form>
        </>
    )
}
export default GoalFormAdd