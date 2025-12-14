import { db } from './firebase'
import { ref, set, push, update, remove, get, child } from 'firebase/database'
import { Project, Task, TaskStatus, ProjectStatus } from '../types'
import { slugify } from './slug'
import { isFirebaseConfigured } from './env'

const OWNER_ID = '00000000-0000-0000-0000-000000000001'

function ensureDB() {
  if (!isFirebaseConfigured() || !db) {
    throw new Error('Firebase is not configured. Please set .env variables.')
  }
}

export async function createProject(input: { name: string; description: string; status?: ProjectStatus; isQuickAccess?: boolean }) {
  ensureDB()
  const id = crypto.randomUUID()
  const slug = slugify(input.name)
  const dateCreated = new Date().toISOString()
  const project: Project = {
    id,
    name: input.name,
    slug,
    description: input.description,
    ownerId: OWNER_ID,
    status: input.status ?? 'Ongoing',
    dateCreated,
    isQuickAccess: input.isQuickAccess ?? false
  }
  await set(ref(db!, `projects/${id}`), project)
  await set(ref(db!, `slugIndex/${slug}`), id)
  return project
}

export async function getProjectBySlug(slug: string) {
  ensureDB()
  const idSnap = await get(ref(db!, `slugIndex/${slug}`))
  if (!idSnap.exists()) return null
  const id = idSnap.val() as string
  const pSnap = await get(ref(db!, `projects/${id}`))
  return pSnap.exists() ? (pSnap.val() as Project) : null
}

export async function listProjects(filter?: { status?: ProjectStatus }) {
  ensureDB()
  const snap = await get(ref(db!, 'projects'))
  const all: Project[] = snap.exists() ? Object.values(snap.val()) : []
  const filtered = filter?.status ? all.filter(p => p.status === filter.status) : all
  return filtered.sort((a, b) => Date.parse(b.dateCreated) - Date.parse(a.dateCreated))
}

export async function updateProject(id: string, updates: Partial<Pick<Project, 'name' | 'description' | 'status' | 'isQuickAccess'>>) {
  ensureDB()
  await update(ref(db!, `projects/${id}`), updates)
}

export async function deleteProject(id: string) {
  ensureDB()
  await remove(ref(db!, `projects/${id}`))
}

export async function createTask(projectId: string, input: { name: string; description: string }) {
  ensureDB()
  const tasksSnap = await get(ref(db!, `tasks/${projectId}`))
  const nextIndex = tasksSnap.exists() ? Object.keys(tasksSnap.val()).length + 1 : 1
  const id = crypto.randomUUID()
  const task: Task = {
    id,
    ordinalIndex: nextIndex,
    projectId,
    name: input.name,
    description: input.description,
    status: 'Pending',
    dateCreated: new Date().toISOString()
  }
  await set(ref(db!, `tasks/${projectId}/${id}`), task)
  return task
}

export async function listTasks(projectId: string, filter?: { status?: TaskStatus }) {
  ensureDB()
  const snap = await get(ref(db!, `tasks/${projectId}`))
  const all: Task[] = snap.exists() ? Object.values(snap.val()) : []
  const filtered = filter?.status ? all.filter(t => t.status === filter.status) : all
  return filtered.sort((a, b) => Date.parse(b.dateCreated) - Date.parse(a.dateCreated))
}

export async function updateTask(projectId: string, id: string, updates: Partial<Pick<Task, 'name' | 'description' | 'status'>>) {
  ensureDB()
  await update(ref(db!, `tasks/${projectId}/${id}`), updates)
}

export async function deleteTask(projectId: string, id: string) {
  ensureDB()
  await remove(ref(db!, `tasks/${projectId}/${id}`))
}
