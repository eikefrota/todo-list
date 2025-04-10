import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Tarefas.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPenToSquare, faTrashCan, faRotateLeft, faSignOut } from '@fortawesome/free-solid-svg-icons';

function Tarefas() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // Carrega o usuário atual e suas tarefas ao montar o componente
  useEffect(() => {
    const userJson = localStorage.getItem('usuarioAtual');
    if (!userJson) {
      navigate('/login');
      return;
    }

    const user = JSON.parse(userJson);
    setCurrentUser(user);

    // Carrega as tarefas do usuário
    const allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const userTasks = allTasks.filter(task => task.userId === user.id && task.status !== 'excluida');
    setTasks(userTasks);
  }, [navigate]);

  // Salva as tarefas no localStorage
  const saveTasks = (updatedTasks) => {
    const allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const otherUsersTasks = allTasks.filter(task => task.userId !== currentUser.id);
    const newTasks = [...otherUsersTasks, ...updatedTasks];
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    setTasks(updatedTasks.filter(task => task.status !== 'excluida'));
  };

  const addTask = () => {
    if (newTask.trim() === '') return;

    const newTaskObj = {
      id: Date.now(),
      title: newTask,
      status: 'pendente',
      userId: currentUser.id
    };

    const updatedTasks = [...tasks, newTaskObj];
    saveTasks(updatedTasks);
    setNewTask('');
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, status: 'excluida' } : task
    );
    saveTasks(updatedTasks);
  };

  const toggleComplete = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId 
        ? { ...task, status: task.status === 'concluida' ? 'pendente' : 'concluida' }
        : task
    );
    saveTasks(updatedTasks);
  };

  const startEditing = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    setEditingTask(taskId);
    setEditingText(task.title);
  };

  const saveEdit = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, title: editingText } : task
    );
    saveTasks(updatedTasks);
    setEditingTask(null);
    setEditingText('');
  };

  const handleLogout = () => {
    localStorage.removeItem('usuarioAtual');
    navigate('/');
  };

  return (
    <div className="tarefas-container">
      <div className="header">
        <h2 className='welcome-title'>Bem-vindo, {currentUser?.username}!</h2>
      </div>

      <div className="add-task-container">
        <input 
          type="text" 
          placeholder="Digite uma nova tarefa" 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <button className="add-task-button" onClick={addTask}>Adicionar</button>
      </div>

      <div className="tasks-list">
        <h2 className='tarefas-title'>TAREFAS</h2>
        
        {tasks.map((task) => (
          <div key={task.id} className={`task-item ${task.status === 'concluida' ? 'completed' : ''}`}>
            {editingTask === task.id ? (
              <input 
                type="text" 
                className="edit-input" 
                value={editingText} 
                onChange={(e) => setEditingText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && saveEdit(task.id)}
              />
            ) : (
              <span>{task.title}</span>
            )}

            <div className="task-buttons">
              {editingTask === task.id ? (
                <button className="save-button" onClick={() => saveEdit(task.id)}>
                  <FontAwesomeIcon icon={faCheck} />
                </button>
              ) : (
                <>
                  <button className="complete-button" onClick={() => toggleComplete(task.id)}>
                    <FontAwesomeIcon icon={task.status === 'concluida' ? faRotateLeft : faCheck} />
                  </button>
                  
                  <button className="edit-button" onClick={() => startEditing(task.id)}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  
                  <button className="delete-button" onClick={() => deleteTask(task.id)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <button className="logout-button" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOut} /> Sair
      </button>
    </div>
  );
}

export default Tarefas;