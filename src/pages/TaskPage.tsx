import { TaskButton } from '../components/TaskButton/TaskButton';
import { TaskList } from '../components/TaskList/TaskList';

import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: '600px',
    backgroundColor: '#333',
  },
};


import './TaskPage.css'
import { useEffect, useState } from 'react';
import { TaskForm } from '../components/TaskForm/TaskForm';
import { Task } from '../models/Task';
import { api } from '../api/api';

export default function TaskPage() {
    const [tasks, setTasks] = useState([] as Task[])
    const [modalIsOpen, setIsOpen] = useState(false);
    const [taskToUpdate, setTaskToUpdate] = useState({} as Task | null);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed
    }

    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() => {
        getTasks()
    }, []);

    async function getTasks() {
        const result = await api.get('/task')

        if(result.data) {
            setTasks(result.data);
            console.log(result.data);
        }
    }

    return (
        <main className='container'>
            <h2>Aplicativo de Gerenciamento de Tarefas</h2>

            <TaskList tasks={tasks} reloadTasks={getTasks} setTaskToUpdate={setTaskToUpdate} openModal={openModal}/>
            <TaskButton onClick={openModal}/>

            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                {
                    taskToUpdate ? 
                    <TaskForm reloadTasks={getTasks} closeModal={closeModal} taskToUpdate={taskToUpdate}/>:
                    <TaskForm reloadTasks={getTasks} closeModal={closeModal}/>
                }
            </Modal>
        </main>
    );
}