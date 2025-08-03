import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

import { useTasks } from '../context/TasksContext';

export function TaskPage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { tasks, updateTask, removeTask, loading, error } = useTasks();

	const [editMode, setEditMode] = useState(false);
	const [localTask, setLocalTask] = useState(null);

	// Ищем задачу при загрузке или изменении tasks
	useEffect(() => {
		const found = tasks.find(t => t.id === id);
		if (found) setLocalTask(found);
	}, [id, tasks]);

	const toggleEdit = useCallback(() => {
		setEditMode(prev => !prev);
	}, []);

	const updateField = useCallback((field, value) => {
		if (!localTask) return;
		const updated = { ...localTask, [field]: value };
		setLocalTask(updated);
		updateTask(localTask.id, updated);
	}, [localTask, updateTask]);

	const handleDelete = useCallback(async () => {
		await removeTask(id);
		navigate('/');
	}, [id, removeTask, navigate]);

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
					<button onClick={toggleEdit}>Сохранить</button>
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
