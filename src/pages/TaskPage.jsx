import { useNavigate, useParams } from 'react-router-dom'
import { useTask } from '../hooks/useTask'

export function TaskPage() {
	const { id } = useParams()
	const navigate = useNavigate()

	const {
		task,
		editMode,
		toggleEdit,
		updateField,
		save,
		remove
	} = useTask(id, () => navigate('/'))

	if (!task) return <p>Загрузка...</p>

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

			<button onClick={remove}>Удалить</button>
		</>
	)
}
