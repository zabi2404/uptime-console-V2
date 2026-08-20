
import { X } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { type AppDispatch, type RootState } from "../../redux/store";
import { createProject } from "../../redux/Projects/ProjectSlice";
import Button from "./Buttons/Button";
import { toast } from "react-toastify";
import { useTestUrl } from "@/Hooks/useTestUrl";
import { useMonitoring } from "@/Hooks/useMontioring";

interface CreateProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CreateProjectModal({
    isOpen,
    onClose,
}: CreateProjectModalProps) {
    type ProjectStatus = "ACTIVE" | "DOWN";

    interface ProjectForm {
        userId: string;
        projectID: string;
        name: string;
        url: string;
        status: ProjectStatus;
    }
    const { user } = useSelector((state: RootState) => state.user)

    const [form, setForm] = useState<ProjectForm>(
        {
            userId: user?.id || "",
            projectID: crypto.randomUUID(),
            name: "",
            url: "",
            status: "ACTIVE",
        }
    )
    const dispatch = useDispatch<AppDispatch>();

    const { createlog } = useMonitoring();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(createProject(form));
        setForm((prev) => ({
            ...prev,
            userId: user?.id || "",
            projectID: crypto.randomUUID(),
            name: "",
            url: "",
            status: "ACTIVE",
        }))

        onClose();
        await createlog({
            userId: user?.id || "",
            title: `Project ${form.name} created`,
            message: `Project ${form.name} with ID ${form.projectID} created.`,
            tags: "CREATED",
            createdAt: new Date().toISOString(),
        });
        

    }

    // const [loading, setLoading] = useState(false);

    const { testUrl, loading, error } = useTestUrl()
    const testConnection = async () => {
        if (form.url === "") {
            toast.error("Please enter a URL");
            return;
        }
        if (!form.url.startsWith("http://") && !form.url.startsWith("https://")) {
            toast.error("Please enter a valid URL starting with http:// or https://");
            return;
        }

        const data = await testUrl(form.url);

        toast.success(`Status Code: ${data?.statusCode}, Message: ${data?.message}`);
        if (error) {
            toast.error(`Error: ${error}`);
            console.error(error);
            return;
        }

        console.log(data);
    };



    const closeModal = () => {
        setForm((prev) => ({
            ...prev,
            userId: user?.id || "",
            name: "",
            url: "",
            status: "ACTIVE",
        }))
        onClose();
    };


    if (!isOpen) return null;
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
            onClick={closeModal}
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
                        onClick={closeModal}
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
                            disabled={true}
                            // onChange={(e) => setForm(({ ...form, projectID: e.target.value }))}
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
                        <div className="flex justify-between items-center mb-2">
                            <label className="  flex items-center text-sm font-medium text-gray-800">
                                URL
                            </label>
                            <div onClick={testConnection}>
                                <Button
                                    name="Test URL"
                                    variant="secondary"
                                    loading={loading}
                                />

                            </div>
                        </div>

                        <input
                            type="url"
                            value={form.url}
                            placeholder="https://example.com"
                            onChange={(e) => setForm(({ ...form, url: e.target.value }))}
                            className="h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                        />
                    </div>
                    <div className="w-ful px-4 py-3">




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