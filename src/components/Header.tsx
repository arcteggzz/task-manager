import { Link, useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import ProjectQuickAccess from './ProjectQuickAccess'

export default function Header() {
  const location = useLocation()
  const onProjectPage = location.pathname.startsWith('/project/')
  const projectSlug = onProjectPage ? location.pathname.split('/project/')[1] ?? undefined : undefined
  
  return (
    <header className="flex items-center justify-between py-6">
      <Link to="/" className="text-xl font-semibold text-primary">Task Manager</Link>
      {onProjectPage && <ProjectQuickAccess currentSlug={projectSlug} />}
      <ThemeToggle />
    </header>
  )
}
