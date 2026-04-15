import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ProjectListPage from "./pages/ProjectListPage";
import CreateProjectPage from "./pages/CreateProjectPage";
import ProjectTaskPage from "./pages/ProjectTaskPage";
import Header from "./components/Header";

import WeeklyAchievementsPage from "./pages/WeeklyAchievementsPage";
import AddWeeklyAchievementsPage from "./pages/AddWeeklyAchievementsPage";
import { subscribePendingTaskCount } from "./lib/db";

export default function App() {
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const unsubscribe = subscribePendingTaskCount(setPendingCount);
    return unsubscribe;
  }, []);

  useEffect(() => {
    document.title =
      pendingCount > 0 ? `(${pendingCount}) - Task Manager` : "Task Manager";
  }, [pendingCount]);

  return (
    <div className="container px-4">
      <Header />
      <Routes>
        <Route path="/" element={<ProjectListPage />} />
        <Route path="/create-project" element={<CreateProjectPage />} />
        <Route path="/project/:projectSlug" element={<ProjectTaskPage />} />

        <Route
          path="/weekly-achievements"
          element={<WeeklyAchievementsPage />}
        />
        <Route
          path="/weekly-achievements-add"
          element={<AddWeeklyAchievementsPage />}
        />
      </Routes>
    </div>
  );
}
