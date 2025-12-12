import { useState } from 'react'
import clsx from 'clsx'

type Option = { label: string; value: string }

type Props = {
  options: Option[]
  value: string
  onChange: (value: string) => void
}

export default function FilterDropdown({ options, value, onChange }: Props) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button
        className="px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900"
        onClick={() => setOpen(o => !o)}
      >
        {options.find(o => o.value === value)?.label ?? 'Filter'}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 min-w-[160px] rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-md">
          {options.map(o => (
            <button
              key={o.value}
              className={clsx(
                'block w-full text-left px-3 py-2 hover:bg-primary/10',
                value === o.value && 'bg-primary/10 text-primary'
              )}
              onClick={() => {
                onChange(o.value)
                setOpen(false)
              }}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
