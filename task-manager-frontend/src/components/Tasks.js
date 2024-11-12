import React, { useEffect, useState } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';
import './Tasks.css';

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', description: '', status: 'in_progress', due_date: '' });
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await getTasks();
            setTasks(response.data);
        } catch (error) {
            setMessage('Error fetching tasks');
        }
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            await createTask(newTask);
            setMessage('Task created successfully');
            fetchTasks();
            setNewTask({ title: '', description: '', status: 'in_progress', due_date: '' });
        } catch (error) {
            console.error('Error creating task:', error.response?.data || error.message);
            setMessage('Error creating task');
        }
    };

    const handleUpdateTask = async (id, updatedTask) => {
        try {
            await updateTask(id, updatedTask);
            setMessage('Task updated successfully');
            fetchTasks();
        } catch (error) {
            console.error('Error updating task:', error.response?.data || error.message);
            setMessage('Error updating task');
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await deleteTask(id);
            setMessage('Task deleted successfully');
            fetchTasks();
        } catch (error) {
            setMessage('Error deleting task');
        }
    };

    const handleStatusChange = (id, newStatus) => {
        const updatedTask = tasks.find(task => task.id === id);
        updatedTask.status = newStatus;
        handleUpdateTask(id, updatedTask);
    };

    return (
        <div className="tasks-container">
            <h2 className="tasks-title">Tasks</h2>
            <form onSubmit={handleCreateTask} className="create-task-form">
                <input 
                    type="text" 
                    placeholder="Task Title" 
                    value={newTask.title} 
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} 
                />
                <input 
                    type="text" 
                    placeholder="Description" 
                    value={newTask.description} 
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} 
                />
                <input 
                    type="date" 
                    placeholder="Due Date" 
                    value={newTask.due_date} 
                    onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })} 
                />
                <button type="submit" className="create-task-button">Create Task</button>
            </form>

            {message && <p className="message">{message}</p>}

            <table className="tasks-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task.id}>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>
                                <input 
                                    type="date" 
                                    value={task.due_date ? task.due_date.substring(0, 10) : ''} 
                                    onChange={(e) => handleUpdateTask(task.id, { ...task, due_date: e.target.value })}
                                />
                            </td>
                            <td>
                                <select 
                                    value={task.status} 
                                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                                >
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </td>
                            <td>
                                <button 
                                    className="update-button" 
                                    onClick={() => handleUpdateTask(task.id, task)}
                                >
                                    Update
                                </button>
                                <button 
                                    className="delete-button" 
                                    onClick={() => handleDeleteTask(task.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Tasks;
