import { type FC, useState } from 'react';
import { BsFlagFill, BsCheckLg, BsTrash, BsPencilSquare, BsSave } from 'react-icons/bs';
import { motion } from 'framer-motion';
import './TaskList.css';

interface Task {
    id: string;
    name: string;
    priority: string;
    done?: boolean;
}

interface TaskListProps {
    tasks: Task[];
    onDelete: (id: string) => void;
    onToggleDone: (id: string) => void;
    onSaveEdit: (id: string, newName: string) => void;
    onStartEditing: (id: string) => void;
    editingId: string | null;
    loading: boolean;
}

const TaskList: FC<TaskListProps> = ({ 
    tasks,
    onDelete,
    onToggleDone,
    onSaveEdit,
    onStartEditing,
    editingId,
    loading

    }) => {
        
    const [editedName, setEditedName] = useState('');

    const handleSaveEdit = (id: string, newName: string) => {
        if (newName.trim()) {
            onSaveEdit(id, newName.trim());
            setEditedName('');
        }
    }

    return (
        <div className="container mt-4">
        <h4 className="mb-3 text-dark">Minhas Tarefas</h4>

        {loading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Carregando...</span>
            </div>
            </div>
        ) : tasks.length === 0 ? (
            <p className="text-dark">Nenhuma tarefa adicionada ainda.</p>
        ) : (
            <div className="row row-cols-1 g-3">
            {tasks.map((task) => {
                const isEditing = editingId === task.id;
                const cardClass = `card shadow-sm border-0 transition ${task.done ? 'opacity-50' : ''}`;

                return (
                <motion.div
                    key={task.id}
                    className="col"
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{
                    opacity: task.done ? 0.5 : 1,
                    scale: task.done ? 0.9 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <div className={cardClass}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12 col-sm-8">
                                {isEditing ? (
                                    <input
                                    type="text"
                                    className="form-control mb-2"
                                    value={editedName}
                                    onChange={(e) => setEditedName(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleSaveEdit(task.id, editedName);
                                    }}
                                    autoFocus
                                    />
                                ) : (
                                    <h6
                                    className={`card-title mb-1 ${
                                        task.done ? 'text-decoration-line-through text-muted' : ''
                                    }`}
                                    >
                                    {task.name}
                                    </h6>
                                )}

                                </div>

                                <div className="col-12 col-sm-4 mt-2 mt-sm-0 d-flex flex-wrap gap-2 justify-content-end align-items-center">
                                <span className={`badge bg-${getPriorityColor(task.priority)} d-flex align-items-center gap-1`}>
                                    <BsFlagFill size={14} />
                                    {task.priority}
                                </span>

                                <button
                                    className="btn btn-sm btn-outline-success"
                                    title="Concluir"
                                    onClick={() => onToggleDone(task.id)}
                                >
                                    <BsCheckLg />
                                </button>

                                {isEditing ? (
                                    <button
                                    className="btn btn-sm btn-outline-primary"
                                    title="Salvar"
                                    onClick={() => handleSaveEdit(task.id, editedName)}
                                    >
                                    <BsSave />
                                    </button>
                                ) : (
                                    <button
                                    className="btn btn-sm btn-outline-primary"
                                    title="Editar"
                                    onClick={() => {
                                        setEditedName(task.name);
                                        onStartEditing(task.id);
                                    }}
                                    >
                                    <BsPencilSquare />
                                    </button>
                                )}

                                <button
                                    className="btn btn-sm btn-outline-danger"
                                    title="Excluir"
                                    onClick={() => onDelete(task.id)}
                                >
                                    <BsTrash />
                                </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
                );
            })}
            </div>
        )}
        </div>
    );
};

const getPriorityColor = (priority: string) => {
    switch (priority) {
        case 'alta':
        return 'danger';
        case 'media':
        return 'warning';
        case 'baixa':
        return 'success';
        default:
        return 'secondary';
    }
};

export default TaskList;
