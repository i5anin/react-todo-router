const BASE_URL = 'http://localhost:3001/tasks'

/**
 * Получить список всех задач
 */
export const getTasks = async () => {
	const res = await fetch(BASE_URL)

	if (!res.ok) {
		throw new Error(`Ошибка ${res.status}: ${res.statusText}`)
	}

	return await res.json()
}

/**
 * Получить одну задачу по ID
 * @param {string} id
 */
export const getTask = async (id) => {
	const res = await fetch(`${BASE_URL}/${id}`)

	if (!res.ok) {
		throw new Error(`Ошибка ${res.status}: ${res.statusText}`)
	}

	return await res.json()
}

/**
 * Создать новую задачу
 * @param {Object} task - { title, description }
 */
export const createTask = async (task) => {
	const res = await fetch(BASE_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(task)
	})

	if (!res.ok) {
		throw new Error(`Ошибка ${res.status}: ${res.statusText}`)
	}

	return await res.json()
}

/**
 * Обновить задачу по ID
 * @param {string} id
 * @param {Object} task
 */
export const updateTask = async (id, task) => {
	const res = await fetch(`${BASE_URL}/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(task),
	})

	if (!res.ok) {
		throw new Error(`Ошибка ${res.status}: ${res.statusText}`)
	}

	return await res.json()
}

/**
 * Удалить задачу по ID
 * @param {string} id
 */
export const deleteTask = async (id) => {
	const res = await fetch(`${BASE_URL}/${id}`, {
		method: 'DELETE'
	})

	if (!res.ok) {
		throw new Error(`Ошибка ${res.status}: ${res.statusText}`)
	}
}
