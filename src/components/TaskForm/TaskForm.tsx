import { FormEvent, useState } from 'react';
import './TaskForm.css';
import { Task } from '../../models/Task';
import { api } from '../../api/api';

interface TaskFormProps {
    closeModal: () => void,
    reloadTasks: () => void,
    taskToUpdate?: Task
}

export function TaskForm({closeModal, reloadTasks, taskToUpdate}: TaskFormProps) {
    const taskStatus = ['Pendente', 'Em andamento', 'Concluída', 'Atrasada', 'Cancelada']

    const [title, setTitle] = useState(taskToUpdate?.title ?? '');
    const [description, setDescription] = useState(taskToUpdate?.title ?? '');
    const [deadline, setDeadline] = useState(taskToUpdate?.deadline.toString() ?? '');
    const [status, setStatus] = useState(taskToUpdate?.status ?? taskStatus[1])

    async function saveTask(event: FormEvent) {
        event.preventDefault();

        const task: Task = {
            title,
            description,
            deadline: new Date(deadline),
            status
        };

        if(taskToUpdate) {
            updateTask(task);
            return;
        };

        const res = await api.post('/task', task);
        
        if(res.status == 201) {
            alert('A tarefa foi criada')
            closeModal();
            reloadTasks();
        } else  {
            alert('Não foi possivel criar a tarefa')
        }
    }

    async function updateTask(task: Task) {
        const id = taskToUpdate?.id;
        const res = await api.put(`/task/${id}`, {id, ...task});

        console.log(res);
        
        if(res.status == 200) {
            alert('A tarefa foi atualizada com sucesso');
            closeModal();
            reloadTasks();
        } else  {
            alert('Não foi possivel atualizar a tarefa');
        }
    }

    return (
        <form action="" className='task-form'>
            <h2 className='form-title'>Preencha os campos abaixo para criar uma nova tarefa</h2>

            <label htmlFor="title-field" className='task-label'>Título</label>
            <input 
                id='title-field' 
                placeholder='Informe o titulo da tarefa'
                value={title}
                onChange={e => setTitle(e.currentTarget.value)}
            />

            <label htmlFor="description-field" className='task-label'>Título</label>
            <textarea 
                id='description-field' 
                placeholder='Informe uma descrição da tarefa'
                value={description}
                onChange={e => setDescription(e.currentTarget.value)}
            />

            <label htmlFor='deadline-field' className='task-label'>Prazo de conclusão</label>
            <input 
                id='deadline-field' 
                type="date"
                value={deadline}
                onChange={e => setDeadline(e.currentTarget.valueAsDate?.toISOString().split('T')[0] ?? '')}
            />

            <label htmlFor='status-field' className='task-label'>Status Inicial</label>
            <select id='status-field' onChange={e => setStatus(e.currentTarget.value)} value={status}>
                {
                    taskStatus.map(status => <option value={status}>{status}</option>)
                }
            </select>

            <button onClick={saveTask}>Salvar</button>
        </form>
    )
}