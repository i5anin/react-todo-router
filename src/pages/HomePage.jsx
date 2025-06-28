import { TaskCard } from '../components/TaskCard'
import { TaskForm } from '../components/TaskForm'
import { useTasks } from '../hooks/useTasks'

export function HomePage() {
	const { tasks, addTask } = useTasks()

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
