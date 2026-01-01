export type ProjectStatus = "Ongoing" | "Completed";
export type TaskStatus = "Pending" | "Completed" | "Archived";

export type Project = {
  id: string;
  name: string;
  slug: string;
  description: string;
  ownerId: string;
  status: ProjectStatus;
  dateCreated: string;
  isQuickAccess: boolean;
};

export type Task = {
  id: string;
  ordinalIndex: number;
  projectId: string;
  name: string;
  description: string;
  status: TaskStatus;
  dateCreated: string;
};

export type SingleAchievement = {
  id: number;
  content: string;
};

export type WeeklyAchievement = {
  id: string;
  dateCreated: string;
  weekNumber: number;
  weekStartDate: string;
  weekEndDate: string;
  achievements: SingleAchievement[];
};
