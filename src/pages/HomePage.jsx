import { TaskCard } from '../components/TaskCard';
import { TaskForm } from '../components/TaskForm';
import { useTasks } from '../context/TasksContext';

export function HomePage() {
	const { tasks, addTask, saving } = useTasks();

	return (
		<>
			<TaskForm onAdd={addTask} saving={saving} />
			<div>
				{tasks.map(task => (
					<TaskCard key={task.id} task={task} />
				))}
			</div>
		</>
	);
}
