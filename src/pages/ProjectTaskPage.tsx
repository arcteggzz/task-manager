import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProjectBySlug, listTasks, createTask, updateTask, deleteTask } from '../lib/db'
import { Project, Task } from '../types'
import TaskTable from '../components/TaskTable'
import Input from '../components/Input'
import TextArea from '../components/TextArea'
import Button from '../components/Button'
import { isFirebaseConfigured } from '../lib/env'

export default function ProjectTaskPage() {
  const { projectSlug } = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Completed'>('All')
  const [view, setView] = useState<'table' | 'form'>('table')
  const [editing, setEditing] = useState<Task | null>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const descRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const load = async () => {
      if (!projectSlug) return
      if (!isFirebaseConfigured()) return
      const p = await getProjectBySlug(projectSlug)
      setProject(p)
      if (p) setTasks(await listTasks(p.id))
    }
    load()
  }, [projectSlug])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'n') {
        e.preventDefault()
        setEditing(null)
        setView('form')
        setTimeout(() => nameRef.current?.focus(), 0)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const filtered = useMemo(() => {
    if (filter === 'All') return tasks
    return tasks.filter(t => t.status === filter)
  }, [filter, tasks])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!project) return
    const name = nameRef.current?.value?.trim() ?? ''
    const description = descRef.current?.value?.trim() ?? ''
    if (!name) return
    if (editing) {
      await updateTask(project.id, editing.id, { name, description })
    } else {
      await createTask(project.id, { name, description })
    }
    setTasks(await listTasks(project.id))
    setView('table')
    setEditing(null)
  }

  const onEdit = (t: Task) => {
    setEditing(t)
    setView('form')
    setTimeout(() => {
      if (nameRef.current) nameRef.current.value = t.name
      if (descRef.current) descRef.current.value = t.description
      nameRef.current?.focus()
    }, 0)
  }

  const onDelete = async (t: Task) => {
    if (!project) return
    await deleteTask(project.id, t.id)
    setTasks(await listTasks(project.id))
  }

  const onToggleStatus = async (t: Task) => {
    if (!project) return
    const next = t.status === 'Completed' ? 'Pending' : 'Completed'
    await updateTask(project.id, t.id, { status: next })
    setTasks(await listTasks(project.id))
  }

  return (
    <div className="space-y-6">
      {!isFirebaseConfigured() && (
        <div className="text-center py-24">
          <p className="text-lg">Set your Firebase Realtime Database configuration in <code>.env</code> to manage tasks.</p>
          <Link to="/"><Button className="mt-4">Back</Button></Link>
        </div>
      )}
      {isFirebaseConfigured() && (
        <>
        <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">{project?.name ?? ''}</h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">{project?.description ?? ''}</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            className="px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900"
            value={filter}
            onChange={e => setFilter(e.target.value as 'All' | 'Pending' | 'Completed')}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
          <Button variant="secondary" onClick={() => setView(v => (v === 'table' ? 'form' : 'table'))}>
            {view === 'table' ? 'New Task' : 'Back to List'}
          </Button>
          <Link to="/"><Button variant="ghost">Back</Button></Link>
        </div>
      </div>
      {view === 'table' ? (
        <TaskTable tasks={filtered} onEdit={onEdit} onDelete={onDelete} onToggleStatus={onToggleStatus} />
      ) : (
        <form onSubmit={submit} className="max-w-2xl space-y-4">
          <h3 className="text-lg font-semibold">{editing ? 'Edit Task' : 'Create Task'}</h3>
          <Input ref={nameRef} label="Name" required />
          <TextArea ref={descRef} label="Description" rows={4} />
          <Button type="submit">Save</Button>
        </form>
      )}
        </>
      
      )}
    </div>
  )
}
