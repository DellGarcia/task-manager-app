import { TaskItem } from "../TaskItem/TaskItem";

import './TaskList.css';


export function TaskList() {
    return (
        <ol className="list-container">
            <TaskItem/>
            <TaskItem/>
            <TaskItem/>
        </ol>
    )
}