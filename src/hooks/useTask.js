import { useEffect, useState } from 'react'

import { getTask, updateTask, deleteTask } from '../api/tasks'

export function useTask(id, onDelete) {
	const [task, setTask] = useState(null)
	const [editMode, setEditMode] = useState(false)

	useEffect(() => {
		getTask(id).then(setTask)
	}, [id])

	const save = async () => {
		await updateTask(id, task)
		setEditMode(false)
	}

	const remove = async () => {
		await deleteTask(id)
		onDelete?.()
	}

	const toggleEdit = () => setEditMode(prev => !prev)

	const updateField = (field, value) =>
		setTask(prev => ({ ...prev, [field]: value }))

	return {
		task,
		editMode,
		toggleEdit,
		updateField,
		save,
		remove
	}
}
