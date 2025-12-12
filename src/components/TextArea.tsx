import { TextareaHTMLAttributes, forwardRef } from 'react'
import clsx from 'clsx'

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
}

const TextArea = forwardRef<HTMLTextAreaElement, Props>(({ label, className, ...props }, ref) => {
  return (
    <label className="block space-y-1">
      {label && <span className="text-sm">{label}</span>}
      <textarea
        ref={ref}
        {...props}
        className={clsx(
          'w-full px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900',
          'focus:outline-none focus:ring-2 focus:ring-primary',
          className
        )}
      />
    </label>
  )
})

export default TextArea
