import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import Button from '../components/Button'
import { createWeeklyAchievement } from '../lib/db'

export default function AddWeeklyAchievementsPage() {
  const nav = useNavigate()
  const [weekNumber, setWeekNumber] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [achievements, setAchievements] = useState<{ id: number; content: string }[]>([])
  const [currentAchievement, setCurrentAchievement] = useState('')
  const [loading, setLoading] = useState(false)
  const achievementInputRef = useRef<HTMLInputElement>(null)

  const handleAddAchievement = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!currentAchievement.trim()) return
    
    const newId = achievements.length > 0 ? Math.max(...achievements.map(a => a.id)) + 1 : 1
    setAchievements([...achievements, { id: newId, content: currentAchievement.trim() }])
    setCurrentAchievement('')
    achievementInputRef.current?.focus()
  }

  const handleRemoveAchievement = (id: number) => {
    setAchievements(achievements.filter(a => a.id !== id))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!weekNumber || !startDate || !endDate || achievements.length === 0) {
      alert('Please fill in all fields and add at least one achievement.')
      return
    }

    setLoading(true)
    try {
      await createWeeklyAchievement({
        weekNumber: parseInt(weekNumber),
        weekStartDate: startDate,
        weekEndDate: endDate,
        achievements
      })
      nav('/weekly-achievements')
    } catch (error) {
      console.error(error)
      alert('Failed to save achievement log.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Log Weekly Achievements</h1>
        <p className="text-neutral-600 dark:text-neutral-400">Record your wins for the week.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Week Number"
            type="number"
            value={weekNumber}
            onChange={e => setWeekNumber(e.target.value)}
            placeholder="e.g. 42"
            required
          />
          <Input
            label="Start Date"
            type="date" // DD-MM-YYYY is handled by browser date input usually as YYYY-MM-DD value but local display
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            required
          />
          <Input
            label="End Date"
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            required
          />
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Achievements
          </label>
          
          <div className="flex gap-2">
            <Input
              ref={achievementInputRef}
              value={currentAchievement}
              onChange={e => setCurrentAchievement(e.target.value)}
              placeholder="What did you achieve?"
              className="flex-1"
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleAddAchievement()
                }
              }}
            />
            <Button type="button" onClick={() => handleAddAchievement()} variant="secondary">
              Add
            </Button>
          </div>

          {achievements.length > 0 && (
            <ul className="space-y-2 mt-4">
              {achievements.map(a => (
                <li 
                  key={a.id} 
                  className="flex items-start justify-between p-3 bg-white dark:bg-neutral-800 rounded-md border border-neutral-200 dark:border-neutral-700"
                >
                  <span className="text-neutral-800 dark:text-neutral-200">{a.content}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveAchievement(a.id)}
                    className="text-red-500 hover:text-red-700 dark:hover:text-red-400 px-2"
                    aria-label="Remove achievement"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" variant="ghost" onClick={() => nav('/weekly-achievements')}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Weekly Log'}
          </Button>
        </div>
      </form>
    </div>
  )
}
