import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

import { useTasks } from '../context/TasksContext';

export function TaskPage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const {
		tasks,
		getTaskById,
		updateTask,
		removeTask,
		loading,
		error
	} = useTasks();

	const [editMode, setEditMode] = useState(false);
	const [localTask, setLocalTask] = useState(null);

	// Загружаем задачу при загрузке компонента
	useEffect(() => {
		const load = async () => {
			const task = tasks.find(t => t.id === id) || await getTaskById(id);
			setLocalTask(task);
		};

		load();
	}, [id, tasks, getTaskById]);

	// Включить/выключить режим редактирования
	const toggleEdit = useCallback(() => {
		setEditMode(prev => !prev);
	}, []);

	// Обновить поле в локальном состоянии
	const updateField = useCallback((field, value) => {
		if (!localTask) return;
		setLocalTask(prev => ({ ...prev, [field]: value }));
	}, [localTask]);

	// Сохранить изменения на сервере
	const handleSave = useCallback(async () => {
		if (!localTask) return;
		await updateTask(id, localTask);
		setEditMode(false);
	}, [id, localTask, updateTask]);

	// Удаление задачи
	const handleDelete = useCallback(async () => {
		await removeTask(id);
		navigate('/');
	}, [id, removeTask, navigate]);

	// UI
	if (loading) return <p>Загрузка задачи...</p>;
	if (error) return <p style={{ color: 'red' }}>Ошибка: {error.message}</p>;
	if (!localTask) return <p>Задача не найдена</p>;

	return (
		<>
			<button onClick={() => navigate(-1)}>← Назад</button>

			{editMode ? (
				<>
					<input
						value={localTask.title}
						onChange={e => updateField('title', e.target.value)}
					/>
					<textarea
						value={localTask.description}
						onChange={e => updateField('description', e.target.value)}
					/>
					<button onClick={handleSave}>Сохранить</button>
				</>
			) : (
				<>
					<h2>{localTask.title}</h2>
					<p>{localTask.description}</p>
					<button onClick={toggleEdit}>Редактировать</button>
				</>
			)}

			<button onClick={handleDelete}>Удалить</button>
		</>
	);
}
