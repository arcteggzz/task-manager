import { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
}

export default function Button({ className, variant = 'primary', ...props }: Props) {
  const styles =
    variant === 'primary'
      ? 'bg-primary text-white hover:opacity-90'
      : variant === 'secondary'
      ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:opacity-90'
      : 'bg-transparent text-primary hover:bg-primary/10'
  return (
    <button
      {...props}
      className={clsx(
        'px-4 py-2 rounded-md shadow-sm transition-all',
        styles,
        className
      )}
    />
  )
}
