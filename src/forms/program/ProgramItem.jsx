const ProgramItem = ({program})=>{
    return(
        <>
            <td>
                {program.name}
            </td>
            <td>
                {program.category}
            </td>
            <td>
                {program.workout==undefined?0:program.workout.length}
            </td>            
        </>
    )
}
export default ProgramItem