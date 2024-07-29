import { FormEvent, useState } from 'react';
import './TaskForm.css';

export function TaskForm() {
    const taskStatus = ['Pendente', 'Em andamento', 'Concluída', 'Atrasada', 'Cancelada']

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [status, setStatus] = useState(taskStatus[1])

    function saveTask(event: FormEvent) {
        event.preventDefault();

        console.log({
            title,
            description,
            deadline,
            status
        });
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