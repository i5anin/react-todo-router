import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001';

const TasksContext = createContext(null);

export const TasksProvider = ({ children }) => {
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		axios.get(`${API_URL}/tasks`).then(({ data }) => setTasks(data));
	}, []);

	const addTask = async (task) => {
		const { data } = await axios.post(`${API_URL}/tasks`, task);
		setTasks(prev => [...prev, data]);
	};

	const updateTask = async (id, updates) => {
		await axios.patch(`${API_URL}/tasks/${id}`, updates);
		setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
	};

	const removeTask = async (id) => {
		await axios.delete(`${API_URL}/tasks/${id}`);
		setTasks(prev => prev.filter(t => t.id !== id));
	};

	return (
		<TasksContext.Provider value={{ tasks, addTask, updateTask, removeTask }}>
			{children}
		</TasksContext.Provider>
	);
};

export const useTasks = () => {
	const ctx = useContext(TasksContext);
	if (!ctx) throw new Error('useTasks must be used within <TasksProvider>');
	return ctx;
};
