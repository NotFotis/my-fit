const GoalItem = ({ goal }) => {
    // Format the start date and end date as strings in the desired date format
    const startDateString = new Date(goal.start_date).toLocaleDateString('el-GR', { timeZone: 'UTC' });
    const endDateString = new Date(goal.end_date).toLocaleDateString('el-GR', { timeZone: 'UTC' });
  
    return (
      <>
        <td>{goal.name}</td>
        <td>{startDateString}</td>
        <td>{endDateString}</td>
        <td>{goal.total_programs}</td>
      </>
    );
  };
  
  export default GoalItem;
  