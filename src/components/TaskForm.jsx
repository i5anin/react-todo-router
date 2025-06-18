import { useState } from 'react'

export function TaskForm({ onAdd }) {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')

	const submit = (e) => {
		e.preventDefault()
		if (!title.trim()) return
		onAdd({ title, description })
		setTitle('')
		setDescription('')
	}

	return (
		<form onSubmit={submit}>
			<input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Заголовок" />
			<textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Описание" />
			<button type="submit">Добавить</button>
		</form>
	)
}
