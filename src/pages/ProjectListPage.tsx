import { useEffect, useState } from "react";
import type React from "react";
import { Link } from "react-router-dom";
import { listProjects } from "../lib/db";
import { Project, ProjectStatus } from "../types";
import ProjectCard from "../components/ProjectCard";
import FilterDropdown from "../components/FilterDropdown";
import Button from "../components/Button";
import { isFirebaseConfigured } from "../lib/env";
import Modal from "../components/Modal";
import { updateProject } from "../lib/db";
import Input from "../components/Input";
import TextArea from "../components/TextArea";

export default function ProjectListPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<string>("All");
  const [editing, setEditing] = useState<Project | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState<ProjectStatus>("Ongoing");
  const [editQuick, setEditQuick] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!isFirebaseConfigured()) return;
      if (filter === "All") {
        setProjects(await listProjects());
      } else {
        setProjects(await listProjects({ status: filter as ProjectStatus }));
      }
    };
    load();
  }, [filter]);

  const openEdit = (p: Project) => {
    setEditing(p);
    setEditName(p.name);
    setEditDescription(p.description);
    setEditStatus(p.status);
    setEditQuick(p.isQuickAccess);
  };

  const saveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    if (editQuick) {
      const count = projects.filter(
        (pr) => pr.isQuickAccess && pr.id !== editing.id
      ).length;
      if (count >= 4) {
        alert("You can only have a maximum of 4 Quick Access projects.");
        return;
      }
    }
    await updateProject(editing.id, {
      name: editName,
      description: editDescription,
      status: editStatus,
      isQuickAccess: editQuick,
    });
    setProjects(
      await listProjects(
        filter === "All" ? undefined : { status: filter as ProjectStatus }
      )
    );
    setEditing(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Welcome Oghenetega, what do you want to do today?
        </h1>
        <div className="flex items-center space-x-4">
          <FilterDropdown
            options={[
              { label: "All", value: "All" },
              { label: "Ongoing", value: "Ongoing" },
              { label: "Completed", value: "Completed" },
            ]}
            value={filter}
            onChange={setFilter}
          />
          <Link to="/create-project">
            <Button className="">New Project</Button>
          </Link>
        </div>
      </div>
      {!isFirebaseConfigured() ? (
        <div className="text-center py-24">
          <p className="text-lg">
            Set your Firebase Realtime Database configuration in{" "}
            <code>.env</code> to continue.
          </p>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-lg">Create your first project</p>
          <Link to="/create-project">
            <Button className="mt-4">Create Project</Button>
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} onEdit={openEdit} />
          ))}
        </div>
      )}
      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title="Edit Project"
      >
        <form onSubmit={saveEdit} className="space-y-3">
          <Input
            label="Name"
            value={editName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEditName(e.target.value)
            }
            required
          />
          <TextArea
            label="Description"
            value={editDescription}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setEditDescription(e.target.value)
            }
            rows={3}
          />
          <label className="block space-y-1">
            <span className="text-sm">Status</span>
            <select
              className="w-full px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900"
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value as ProjectStatus)}
            >
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={editQuick}
              onChange={(e) => setEditQuick(e.target.checked)}
            />
            <span className="text-sm">Add to Quick Access</span>
          </label>
          <div className="flex items-center gap-2 pt-2">
            <Button type="submit">Save</Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setEditing(null)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
