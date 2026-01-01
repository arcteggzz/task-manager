import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import ProjectQuickAccess from "./ProjectQuickAccess";

export default function Header() {
  const location = useLocation();
  const onProjectPage = location.pathname.startsWith("/project/");
  const projectSlug = onProjectPage
    ? location.pathname.split("/project/")[1] ?? undefined
    : undefined;

  return (
    <header className="flex items-center justify-between py-2">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-xl font-semibold text-primary">
          Task Manager
        </Link>
        <Link
          to="/weekly-achievements"
          className="text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-primary transition-colors"
        >
          Achievements
        </Link>
      </div>
      {onProjectPage && <ProjectQuickAccess currentSlug={projectSlug} />}
      <ThemeToggle />
    </header>
  );
}
