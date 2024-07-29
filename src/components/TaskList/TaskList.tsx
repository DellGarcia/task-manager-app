import { useEffect, useState } from "react";
import { TaskItem } from '../TaskItem/TaskItem';
import { Task } from '../../models/Task';

import { api } from "../../api/api";

import './TaskList.css';

interface TaskListProps {
    reloadTasks: () => {}
    tasks: Task[],
    setTaskToUpdate: (task: Task) => void,
    openModal: () => void
}


export function TaskList({ reloadTasks, tasks, setTaskToUpdate, openModal}: TaskListProps) {
    

    return (
        <ol className="list-container">
            {
                tasks.map(task=> <TaskItem key={task.id} task={task} taskReload={reloadTasks} setTaskToUpdate={setTaskToUpdate} openModal={openModal}/>)
            }
        </ol>
    )
}