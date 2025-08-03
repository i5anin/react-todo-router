import { createContext, useContext, useState, useEffect } from 'react';
import {
	getTasks as apiGetTasks,
	createTask as apiCreateTask,
	updateTask as apiUpdateTask,
	deleteTask as apiDeleteTask,
} from '../api/tasks';

const TasksContext = createContext(null);

export const TasksProvider = ({ children }) => {
	const [tasks, setTasks] = useState([]);
	const [loading, setLoading] = useState(false);
	const [saving, setSaving] = useState(false);
	const [deleting, setDeleting] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchTasks = async () => {
			setLoading(true);
			try {
				const data = await apiGetTasks();
				setTasks(data);
			} catch (err) {
				setError(err);
			} finally {
				setLoading(false);
			}
		};

		fetchTasks();
	}, []);

	const addTask = async (task) => {
		setSaving(true);
		try {
			const data = await apiCreateTask(task);
			setTasks(prev => [...prev, data]);
		} catch (err) {
			setError(err);
		} finally {
			setSaving(false);
		}
	};

	const updateTask = async (id, updates) => {
		setSaving(true);
		try {
			const data = await apiUpdateTask(id, updates);
			setTasks(prev => prev.map(t => t.id === id ? data : t));
		} catch (err) {
			setError(err);
		} finally {
			setSaving(false);
		}
	};

	const removeTask = async (id) => {
		setDeleting(true);
		try {
			await apiDeleteTask(id);
			setTasks(prev => prev.filter(t => t.id !== id));
		} catch (err) {
			setError(err);
		} finally {
			setDeleting(false);
		}
	};

	if (loading) return <p>Загрузка задач...</p>;
	if (error) return <p style={{ color: 'red' }}>Ошибка: {error.message}</p>;

	return (
		<TasksContext.Provider
			value={{
				tasks,
				addTask,
				updateTask,
				removeTask,
				loading,
				saving,
				deleting,
				error,
			}}
		>
			{children}
		</TasksContext.Provider>
	);
};

export const useTasks = () => {
	const ctx = useContext(TasksContext);
	if (!ctx) throw new Error('useTasks must be used within <TasksProvider>');
	return ctx;
};
