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
                <Button variant="ghost" onClick={() => onEdit(t)}>Edit</Button>
                <Button variant="ghost" onClick={() => onToggleStatus(t)}>
                  {t.status === 'Completed' ? 'Mark Pending' : 'Mark Completed'}
                </Button>
                <Button variant="ghost" onClick={() => onDelete(t)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
