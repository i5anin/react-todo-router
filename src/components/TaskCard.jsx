import { Link } from 'react-router-dom'

export function TaskCard({ task }) {
	return (
		<div className="card">
			<Link to={`/task/${task.id}`} style={{ textDecoration: 'none' }}>
				<p style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
					{task.title}
				</p>
			</Link>
		</div>
	)
}
