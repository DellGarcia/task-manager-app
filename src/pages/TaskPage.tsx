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
    backgroundColor: '#666',
  },
};


import './TaskPage.css'
import { useState } from 'react';
import { TaskForm } from '../components/TaskForm/TaskForm';

export default function TaskPage() {

    const [modalIsOpen, setIsOpen] = useState(true);
  
    function openModal() {
      setIsOpen(true);
    }
  
    function afterOpenModal() {
      // references are now sync'd and can be accessed
    }
  
    function closeModal() {
      setIsOpen(false);
    }

    return (
        <main className='container'>
            <h2>Aplicativo de Gerenciamento de Tarefas</h2>

            <TaskList />
            <TaskButton onClick={openModal}/>

            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <TaskForm />
            </Modal>
        </main>
    );
}