import { X } from "lucide-react";
import {  useState } from "react";
// import { useDispatch } from "react-redux";
// import { type AppDispatch } from "../../redux/store";
// import { createProject } from "../../redux/Projects/ProjectSlice";

interface CreateProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CreateProjectModal({
    isOpen,
    onClose,
}: CreateProjectModalProps) {



    const [form, setForm] = useState(
        {
            projectID: "",
            name: "",
            url: "",
            status: "active",
            // Enable: false
        }
    )
// const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // dispatch(createProject(form));
        onClose();
       
    }

    if (!isOpen) return null;
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
            onClick={onClose}
        >
            <div
                className="w-full max-w-[520px] rounded-xl border border-gray-200 bg-white shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                            Create Project
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Add a service to start monitoring its uptime.
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form className="space-y-5 px-6 py-6"
                onSubmit={handleSubmit}
                >
                    {/* Project ID */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-800">
                            Project ID
                        </label>

                        <input
                            type="text"
                            placeholder="e.g. health-check"
                            value={form.projectID}
                            onChange={(e) => setForm(({ ...form, projectID: e.target.value }))}
                            className="h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                        />
                    </div>

                    {/* Project Name */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-800">
                            Project Name
                        </label>

                        <input
                            type="text"
                            value={form.name}
                            placeholder="e.g. HealthCheck"
                            onChange={(e) => setForm(({ ...form, name: e.target.value }))}
                            className="h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                        />
                    </div>

                    {/* URL */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-800">
                            URL
                        </label>

                        <input
                            type="url"
                            value={form.url}
                            placeholder="https://example.com"
                            onChange={(e) => setForm({ ...form, url: e.target.value })}
                            className="h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                        />
                    </div>
                    <div className="flex items-center justify-between rounded-lg  px-4 py-3">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900">
                                Keep Track
                            </h3>

                            <p className="mt-1 text-xs text-gray-500">
                                Monitor your project’s uptime and status automatically.
                            </p>
                        </div>

                        <label className="relative inline-flex shrink-0 cursor-pointer items-center">
                            <input
                                type="checkbox"
                                checked={true}
                                onChange={(e) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        Enable: e.target.checked,
                                    }))
                                }
                                className="peer sr-only"
                            />

                            <div className="h-6 w-11 rounded-full bg-gray-200 transition-colors duration-200 peer-checked:bg-[#1B76E2]" />

                            <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 peer-checked:translate-x-5" />
                        </label>
                    </div>
                    {/* Actions */}
                    <div className="flex justify-end gap-3 border-t border-gray-200 pt-5">
                        <button
                            type="button"
                            onClick={onClose}
                            className="h-10 rounded-lg border border-gray-300 px-5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="h-10 rounded-lg bg-blue-600 px-5 text-sm font-medium text-white transition hover:bg-blue-700"
                       
                       >
                            Create Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}