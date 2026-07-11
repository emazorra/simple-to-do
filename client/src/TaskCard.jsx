function TaskComponent(props) {

    const { task, date, completed } = props;

    return (
        <div>
            <h2><span id="task"> {task}</span></h2>
            <h5>Date: {new Intl.DateTimeFormat("en-US").format(new Date(date))} Completed: {completed ? <input type="checkbox" defaultChecked /> : <input type="checkbox"/> }</h5>
        </div>
    )

}

export default TaskComponent;