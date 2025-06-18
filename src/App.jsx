import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { HomePage } from './pages/HomePage'
import { TaskPage } from './pages/TaskPage'
import { NotFoundPage } from './pages/NotFoundPage'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/task/:id" element={<TaskPage />} />
				<Route path="/404" element={<NotFoundPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
