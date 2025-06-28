const BASE_URL = 'http://localhost:3001/tasks'

export const getTasks = async () => {
	const res = await fetch(BASE_URL)
	return await res.json()
}

export const getTask = async (id) => {
	const res = await fetch(`${BASE_URL}/${id}`)
	return await res.json()
}

export const createTask = async (task) => {
	const res = await fetch(BASE_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(task),
	})
	return await res.json()
}

export const updateTask = async (id, task) => {
	const res = await fetch(`${BASE_URL}/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(task),
	})
	return await res.json()
}

export const deleteTask = async (id) => {
	await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
}
