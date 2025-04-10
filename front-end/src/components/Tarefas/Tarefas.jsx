import { useState } from 'react';
import './Tarefas.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPenToSquare, faTrashCan, faRotateLeft } from '@fortawesome/free-solid-svg-icons';

function Tarefas() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editingText, setEditingText] = useState('');

  const addTask = () => {
    if (newTask.trim() === '') return;
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask('');
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleComplete = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const startEditing = (index) => {
    setEditingTask(index);
    setEditingText(tasks[index].text);
  };

  const saveEdit = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, text: editingText } : task
      )
    );
    setEditingTask(null);
    setEditingText('');
  };

  return (
    <div className="tarefas-container">
      
      <h2 className='welcome-title'>BEM-VINDO!</h2>

      <div className="add-task-container">
        <input type="text" placeholder="Digite uma nova tarefa" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
        <button className="add-task-button" onClick={addTask}>Adicionar</button>
      </div>

      <div className="tasks-list">
        <h2 className='tarefas-title'>TAREFAS</h2>
        
        {tasks.map((task, index) => (
          <div key={index} className={`task-item ${task.completed ? 'completed' : ''}`}>
            {editingTask === index ? (
              <input type="text" className="edit-input" value={editingText} onChange={(e)  => setEditingText(e.target.value)} />
            ) : (
              <span>{task.text}</span>
            )}

            <div className="task-buttons">
              {editingTask === index ? (
                <button className="save-button" onClick={() => saveEdit(index)}>
                  <FontAwesomeIcon icon={faCheck} />
                </button>
              ) : (
                <>
                  <button className="complete-button" onClick={() => toggleComplete(index)}>
                    <FontAwesomeIcon icon={task.completed ? faRotateLeft : faCheck} />
                  </button>
                  
                  <button className="edit-button" onClick={() => startEditing(index)}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  
                  <button className="delete-button" onClick={() => deleteTask(index)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tarefas;