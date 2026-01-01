import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listWeeklyAchievements } from "../lib/db";
import { WeeklyAchievement } from "../types";
import Button from "../components/Button";
import { isFirebaseConfigured } from "../lib/env";

export default function WeeklyAchievementsPage() {
  const [weeks, setWeeks] = useState<WeeklyAchievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!isFirebaseConfigured()) return;
      const data = await listWeeklyAchievements();
      setWeeks(data);
      setLoading(false);
    };
    load();
  }, []);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (!isFirebaseConfigured()) {
    return (
      <div className="text-center py-24">
        <p>Please configure Firebase to view achievements.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
            Weekly Achievements
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Track your progress week by week.
          </p>
        </div>
        <Link to="/weekly-achievements-add">
          <Button>
            <span className="mr-2">+</span>
            Log New Week
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12 text-neutral-500">
          Loading achievements...
        </div>
      ) : weeks.length === 0 ? (
        <div className="text-center py-12 bg-neutral-50 dark:bg-neutral-900/50 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700">
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            No weekly achievements logged yet.
          </p>
          <Link to="/weekly-achievements-add">
            <Button variant="secondary">Start Logging</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {weeks.map((week) => (
            <div
              key={week.id}
              className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm p-5 space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-primary">
                    Week {week.weekNumber}
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    {formatDate(week.weekStartDate)} -{" "}
                    {formatDate(week.weekEndDate)}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-500">
                  Achievements
                </h4>
                <ul className="space-y-2">
                  {week.achievements.map((a) => (
                    <li
                      key={a.id}
                      className="text-sm text-neutral-800 dark:text-neutral-200 flex items-center gap-2"
                    >
                      <span className="text-primary">•</span>
                      <span>{a.content}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
