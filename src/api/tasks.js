const API = 'http://localhost:3001/tasks'

export async function getTasks() {
	const res = await fetch(API)
	return res.json()
}

export async function getTask(id) {
	const res = await fetch(`${API}/${id}`)
	return res.json()
}

export async function createTask(data) {
	const res = await fetch(API, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	})
	return res.json()
}

export async function updateTask(id, data) {
	const res = await fetch(`${API}/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	})
	return res.json()
}

export async function deleteTask(id) {
	await fetch(`${API}/${id}`, { method: 'DELETE' })
}
