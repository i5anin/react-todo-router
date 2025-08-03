import { useState } from 'react';

/**
 * Форма создания задачи
 * @param {Function} onAdd - функция добавления задачи
 * @param {boolean} saving - флаг состояния загрузки
 */
export function TaskForm({ onAdd, saving }) {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();

		if (!title.trim()) return;

		onAdd({ title, description });
		setTitle('');
		setDescription('');
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				name="title"
				value={title}
				placeholder="Заголовок"
				onChange={(e) => setTitle(e.target.value)}
			/>

			<textarea
				name="description"
				value={description}
				placeholder="Описание"
				onChange={(e) => setDescription(e.target.value)}
			/>

			<button type="submit" disabled={saving}>
				{saving ? 'Сохраняем...' : 'Добавить'}
			</button>
		</form>
	);
}
