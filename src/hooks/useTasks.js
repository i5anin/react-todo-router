import { useEffect, useState } from 'react'
import { getTasks, createTask } from '../api/tasks'

export function useTasks() {
	const [tasks, setTasks] = useState([])

	useEffect(() => {
		getTasks().then(setTasks)
	}, [])

	const addTask = async (task) => {
		const newTask = await createTask(task)
		setTasks(prev => [...prev, newTask])
	}

	return { tasks, addTask }
}
