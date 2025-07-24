import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react'; // 🔹 Обязательный импорт
import { useTasks } from '../context/TasksContext';

export function TaskPage() {
	const { id } = useParams();
	const navigate = useNavigate();

	const { tasks, updateTask, removeTask } = useTasks();

	const task = tasks.find(t => t.id === id);
	const [editMode, setEditMode] = useState(false);

	const toggleEdit = () => setEditMode(prev => !prev);

	const updateField = (field, value) => {
		if (!task) return;
		updateTask(task.id, { ...task, [field]: value });
	};

	const save = () => {
		toggleEdit();
	};

	if (!task) return <p>Загрузка...</p>;

	return (
		<>
			<button onClick={() => navigate(-1)}>← Назад</button>

			{editMode ? (
				<>
					<input
						value={task.title}
						onChange={e => updateField('title', e.target.value)}
					/>
					<textarea
						value={task.description}
						onChange={e => updateField('description', e.target.value)}
					/>
					<button onClick={save}>Сохранить</button>
				</>
			) : (
				<>
					<h2>{task.title}</h2>
					<p>{task.description}</p>
					<button onClick={toggleEdit}>Редактировать</button>
				</>
			)}

			<button onClick={() => {
				removeTask(task.id);
				navigate('/');
			}}>Удалить</button>
		</>
	);
}
