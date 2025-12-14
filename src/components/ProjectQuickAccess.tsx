import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listProjects } from '../lib/db'
import { Project } from '../types'
import { isFirebaseConfigured } from '../lib/env'

type Props = {
  currentSlug?: string
}

export default function ProjectQuickAccess({ currentSlug }: Props) {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const load = async () => {
      if (!isFirebaseConfigured()) return
      const all = await listProjects()
      setProjects(all.filter(p => p.isQuickAccess).slice(0, 4))
    }
    load()
  }, [])

  if (!isFirebaseConfigured()) return null

  return (
    <nav className="flex items-center gap-8 border border-gray-300 dark:border-gray-600 rounded-full p-2 px-8 shadow-header bg-white dark:bg-neutral-900">
      {projects.map(p => {
        const active = p.slug === currentSlug
        return (
          <Link
            key={p.id}
            to={`/project/${p.slug}`}
            className={
              active
                ? 'underline text-primary'
                : 'text-neutral-800 dark:text-neutral-200 hover:underline hover:text-primary'
            }
          >
            {p.name}
          </Link>
        )
      })}
    </nav>
  )
}
