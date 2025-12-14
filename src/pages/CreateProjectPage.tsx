import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import Button from "../components/Button";
import { createProject } from "../lib/db";
import { listProjects } from "../lib/db";

export default function CreateProjectPage() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"Ongoing" | "Completed">("Ongoing");
  const [loading, setLoading] = useState(false);
  const [isQuickAccess, setIsQuickAccess] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    if (isQuickAccess) {
      const all = await listProjects()
      const count = all.filter(p => p.isQuickAccess).length
      if (count >= 4) {
        alert("You can only have a maximum of 4 Quick Access projects.")
        return
      }
    }
    setLoading(true);
    const p = await createProject({ name, description, status, isQuickAccess });
    setLoading(false);
    nav(`/project/${p.slug}`);
  };

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={submit} className="w-full max-w-lg space-y-4">
        <h2 className="text-xl font-semibold">Create Project</h2>
        <Input
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextArea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
        <label className="block space-y-1">
          <span className="text-sm">Status</span>
          <select
            className="w-full px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900"
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as "Ongoing" | "Completed")
            }
          >
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isQuickAccess}
            onChange={(e) => setIsQuickAccess(e.target.checked)}
          />
          <span className="text-sm">Add to Quick Access</span>
        </label>
        <div>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Create"}
          </Button>

          <Link to="/">
            <Button
              type="button"
              className="ml-4 bg-red-600 text-white hover:bg-red-700"
            >
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
