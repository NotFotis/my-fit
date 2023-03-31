const WorkoutItem = ({workout})=>{
    
    return(
    <>
    <td>{`${workout.name}`}</td>
    <td>{`${workout.type}`}</td>
    <td>{`${Array.isArray(workout.exercise)?workout.exercise.length:0}`}</td>
    </>
    )
}
export default WorkoutItem