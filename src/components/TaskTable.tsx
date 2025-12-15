import { Task } from '../types'
import Button from './Button'
import clsx from 'clsx'

type Props = {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
  onToggleStatus: (task: Task) => void
}

export default function TaskTable({ tasks, onEdit, onDelete, onToggleStatus }: Props) {
  const formatDate = (iso: string) => {
    const d = new Date(iso)
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    const day = d.getDate()
    const mon = months[d.getMonth()]
    const hh = String(d.getHours()).padStart(2, '0')
    const mm = String(d.getMinutes()).padStart(2, '0')
    return `${day}-${mon} ${hh}:${mm}`
  }
  return (
    <div className="rounded-xl overflow-hidden shadow-sm border border-neutral-200 dark:border-neutral-800">
      <table className="w-full">
        <thead className="bg-neutral-100 dark:bg-neutral-800">
          <tr>
            <th className="text-left p-3">#</th>
            <th className="text-left p-3">Name</th>
            <th className="text-left p-3">Description</th>
            <th className="text-left p-3">Date Created</th>
            <th className="text-left p-3">Status</th>
            <th className="text-left p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t, i) => (
            <tr
              key={t.id}
              className={clsx(i % 2 === 0 ? 'bg-white dark:bg-neutral-900' : 'bg-neutral-50 dark:bg-neutral-950')}
            >
              <td className="p-3">{t.ordinalIndex}</td>
              <td className="p-3">{t.name}</td>
              <td className="p-3">{t.description}</td>
              <td className="p-3">{formatDate(t.dateCreated)}</td>
              <td className="p-3">
                <span
                  className={clsx(
                    'inline-block px-2 py-1 rounded-full text-xs font-semibold',
                    t.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                      : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                  )}
                >
                  {t.status}
                </span>
              </td>
              <td className="p-3 space-x-2">
                <button
                  title="Edit"
                  aria-label="Edit task"
                  onClick={() => onEdit(t)}
                  className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7f56d9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                  </svg>
                </button>
                <button
                  title={t.status === 'Completed' ? 'Mark Pending' : 'Mark Completed'}
                  aria-label={t.status === 'Completed' ? 'Mark Pending' : 'Mark Completed'}
                  onClick={() => onToggleStatus(t)}
                  className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                >
                  {t.status === 'Completed' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 12h18" />
                      <path d="M12 3v18" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                </button>
                <button
                  title="Delete"
                  aria-label="Delete task"
                  onClick={() => onDelete(t)}
                  className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-red-600 dark:text-red-400"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                    <path d="M10 11v6" />
                    <path d="M14 11v6" />
                    <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
