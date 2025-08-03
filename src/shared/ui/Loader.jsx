import { useTasks } from '../../context/TasksContext';

export const Loader = () => {
	const { loading, saving, deleting } = useTasks();
	const isAnyLoading = loading || saving || deleting;

	return isAnyLoading ? (
		<div className="loader">Загрузка...</div>
	) : null;
};
