import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listProjects } from '../lib/db'
import { Project, ProjectStatus } from '../types'
import ProjectCard from '../components/ProjectCard'
import FilterDropdown from '../components/FilterDropdown'
import Button from '../components/Button'
import { isFirebaseConfigured } from '../lib/env'

export default function ProjectListPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filter, setFilter] = useState<string>('All')

  useEffect(() => {
    const load = async () => {
      if (!isFirebaseConfigured()) return
      if (filter === 'All') {
        setProjects(await listProjects())
      } else {
        setProjects(await listProjects({ status: filter as ProjectStatus }))
      }
    }
    load()
  }, [filter])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Welcome Oghenetega, what do you want to do today?</h1>
        <FilterDropdown
          options={[
            { label: 'All', value: 'All' },
            { label: 'Ongoing', value: 'Ongoing' },
            { label: 'Completed', value: 'Completed' }
          ]}
          value={filter}
          onChange={setFilter}
        />
      </div>
      {!isFirebaseConfigured() ? (
        <div className="text-center py-24">
          <p className="text-lg">Set your Firebase Realtime Database configuration in <code>.env</code> to continue.</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-lg">Create your first project</p>
          <Link to="/create-project">
            <Button className="mt-4">Create Project</Button>
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map(p => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}
    </div>
  )
}
