import { useEffect, useState } from 'react'
import { useTasks } from '../context/TasksContext'

/**
 * Хук для работы с одной задачей по её ID
 * @param {string} id - идентификатор задачи
 * @param {Function} onDelete - колбэк при удалении задачи
 */
export function useTask(id, onDelete) {
	const { getTaskById, updateTask, removeTask } = useTasks()

	const [task, setTask] = useState(null)
	const [editMode, setEditMode] = useState(false)

	useEffect(() => {
		getTaskById(id).then(setTask)
	}, [id, getTaskById])

	const save = async () => {
		await updateTask(id, task)
		setEditMode(false)
	}

	const remove = async () => {
		await removeTask(id)
		onDelete?.()
	}

	const toggleEdit = () => setEditMode(prev => !prev)

	const updateField = (field, value) => {
		setTask(prev => ({ ...prev, [field]: value }))
	}

	return {
		task,
		editMode,
		toggleEdit,
		updateField,
		save,
		remove
	}
}
