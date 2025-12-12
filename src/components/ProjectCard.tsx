import { Link } from 'react-router-dom'
import { Project } from '../types'
import clsx from 'clsx'

type Props = {
  project: Project
}

export default function ProjectCard({ project }: Props) {
  return (
    <Link
      to={`/project/${project.slug}`}
      className={clsx(
        'block p-4 rounded-xl shadow-card bg-white dark:bg-neutral-900 transition-all',
        'hover:shadow-primary/30 hover:scale-[1.01]'
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{project.name}</h3>
        <span
          className={clsx(
            'px-2 py-1 rounded text-xs',
            project.status === 'Ongoing'
              ? 'bg-primary/10 text-primary'
              : 'bg-green-500/10 text-green-600 dark:text-green-400'
          )}
        >
          {project.status}
        </span>
      </div>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{project.description}</p>
      <p className="mt-3 text-xs text-neutral-500">Created {new Date(project.dateCreated).toLocaleString()}</p>
    </Link>
  )
}
