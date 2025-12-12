import { Routes, Route, Link } from 'react-router-dom'
import ProjectListPage from './pages/ProjectListPage'
import CreateProjectPage from './pages/CreateProjectPage'
import ProjectTaskPage from './pages/ProjectTaskPage'
import ThemeToggle from './components/ThemeToggle'

export default function App() {
  return (
    <div className="container px-4">
      <header className="flex items-center justify-between py-6">
        <Link to="/" className="text-xl font-semibold text-primary">Task Manager</Link>
        <ThemeToggle />
      </header>
      <Routes>
        <Route path="/" element={<ProjectListPage />} />
        <Route path="/create-project" element={<CreateProjectPage />} />
        <Route path="/project/:projectSlug" element={<ProjectTaskPage />} />
      </Routes>
    </div>
  )
}
