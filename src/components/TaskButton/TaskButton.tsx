import './TaskButton.css';

interface TaskButtonProps {
    onClick: () => void;

}

export function TaskButton({onClick}: TaskButtonProps) {
    return (
        <button onClick={onClick}>
            Criar Nova Tarefa
        </button>
    );
}