import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { getTask, updateTask, deleteTask } from '../api/tasks'

export function TaskPage() {
	const { id } = useParams()
	const navigate = useNavigate()
	const [task, setTask] = useState(null)
	const [edit, setEdit] = useState(false)

	useEffect(() => {
		getTask(id).then(setTask)
	}, [id])

	const save = async () => {
		await updateTask(id, task)
		setEdit(false)
	}

	const remove = async () => {
		await deleteTask(id)
		navigate('/')
	}

	if (!task) return <p>Загрузка...</p>

	return (
		<>
			<button onClick={() => navigate(-1)}>← Назад</button>
			{edit ? (
				<>
					<input value={task.title} onChange={e => setTask({ ...task, title: e.target.value })} />
					<textarea value={task.description} onChange={e => setTask({ ...task, description: e.target.value })} />
					<button onClick={save}>Сохранить</button>
				</>
			) : (
				<>
					<h2>{task.title}</h2>
					<p>{task.description}</p>
					<button onClick={() => setEdit(true)}>Редактировать</button>
				</>
			)}
			<button onClick={remove}>Удалить</button>
		</>
	)
}
