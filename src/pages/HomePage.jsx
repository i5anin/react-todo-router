import { useEffect, useState } from 'react'

import { TaskCard } from '../components/TaskCard'
import { TaskForm } from '../components/TaskForm'
import { getTasks, createTask } from '../api/tasks'

export function HomePage() {
	const [tasks, setTasks] = useState([])

	useEffect(() => {
		getTasks().then(setTasks)
	}, [])

	const addTask = async (task) => {
		const newTask = await createTask(task)
		setTasks([...tasks, newTask])
	}

	return (
		<>
			<TaskForm onAdd={addTask} />
			<div>
				{tasks.map(task => (
					<TaskCard key={task.id} task={task} />
				))}
			</div>
		</>
	)
}
