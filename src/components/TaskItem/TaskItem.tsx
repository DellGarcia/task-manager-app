import { Edit, Trash2 } from 'react-feather';

import './TaskItem.css';
import { Task } from '../../models/Task';
import { api } from '../../api/api';

interface TaskItemProps {
    task: Task,
    taskReload: () => void,
    setTaskToUpdate: (task: Task) => void,
    openModal: () => void
}

export function TaskItem({ task, taskReload, setTaskToUpdate, openModal }: TaskItemProps) {
    async function handleDeleteTask(id?: number) {
        if(id) {
            await api.delete(`/task/${id}`);
            taskReload();
        }
    }

    async function handleUpdateTask(task: Task) {
        setTaskToUpdate(task);
        openModal();
    }

    return (
        <li className="task-item">
            <div className='task-item-header'>
                <div className='icon-button bg-red'>
                    <Edit onClick={() => handleUpdateTask(task)}/>
                </div>
                <div className='icon-button bg-red'>
                    <Trash2 onClick={() => handleDeleteTask(task.id)}/>
                </div>
            </div>

            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p>Criado em: {task.createdAt?.toString()}</p>

            <p>Data de vencimento: {task.deadline.toString()}</p>

            <div>Status: {task.status}</div>
        </li>
    )
}