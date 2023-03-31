const ExerciseItem = ({exercise})=>{
    return(
        <>
        <td>{`${exercise.name}`}</td>
        <td>{`${exercise.desc}`}</td>
        <td>{`${exercise.tmg}`}</td>
        <td>{`${exercise.repetitions}`}</td>
        <td>
        <img src={exercise.img} alt="exercise.img" width={200} />
        </td>
        <td>
        <a href={exercise.vid}>Watch Now</a>
        </td>
        </>
    )
}
export default ExerciseItem