import { Routes, Route } from 'react-router-dom'
import ProjectListPage from './pages/ProjectListPage'
import CreateProjectPage from './pages/CreateProjectPage'
import ProjectTaskPage from './pages/ProjectTaskPage'
import Header from './components/Header'

export default function App() {
  return (
    <div className="container px-4">
      <Header />
      <Routes>
        <Route path="/" element={<ProjectListPage />} />
        <Route path="/create-project" element={<CreateProjectPage />} />
        <Route path="/project/:projectSlug" element={<ProjectTaskPage />} />
      </Routes>
    </div>
  )
}
