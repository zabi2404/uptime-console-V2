import { useTestUrl } from "@/Hooks/useTestUrl";
import Button from "../Buttons/Button";
import { toast } from "react-toastify";
import { LoaderCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { updateProject } from "@/redux/Projects/ProjectSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { useMonitoring } from "@/Hooks/useMontioring";
// import { testConnection } from "../../../graphql/mutations";
// import { LoaderCircle } from "lucide-react";


interface TableBodyProps {
    id: string,
    projectID: string | null,
    status: string | null,
    name: string | null,
    url: string | null,
    responseTime: string | null,
    lastChecked: string | null,
    selectedProject: string[] | undefined;
    setSelectedProject: React.Dispatch<React.SetStateAction<string[] | undefined>>;
}
function TableBody({ projectID, status, name, url, responseTime, lastChecked, selectedProject, setSelectedProject, id }: TableBodyProps) {

    const dispatch = useDispatch<AppDispatch>();
    const checkClick = useRef<HTMLTableRowElement | null>(null);
    const { testUrl, loading, error } = useTestUrl()




    const testConnection = async () => {
        if (url === "") {
            toast.error("Please enter a URL");
            return;
        }
        if (!url?.startsWith("http://") && !url?.startsWith("https://")) {
            toast.error("Please enter a valid URL starting with http:// or https://");
            return;
        }

        const data = await testUrl(url || "");
        dispatch(updateProject({
            id: id,
            updateInput: {
                responseTime: data?.responseTime || "",
                lastChecked: data?.date || "",
            }
        })
        );
        toast.success(`Status Code: ${data?.statusCode}, Message: ${data?.message}`);
        if (error) {
            toast.error(`Error: ${error}`);
            console.error(error);
            return;
        }

        console.log(data);
    };

    const [doubleClick, setDoubleClick] = useState<string[]>([]);


    const handleDoubleClick = (
        e: React.MouseEvent<HTMLTableRowElement>
    ) => {
        const target = e.target as HTMLElement;
        const td = target.closest("td");
        const columnName = td?.dataset.column;

        switch (columnName) {
            case "projectID":
                setDoubleClick((prev) => {
                    if (prev.includes("projectID")) {
                        return prev.filter((item) => item !== "projectID");
                    } else {
                        return [...prev, "projectID"];
                        saveChanges();
                    }
                });
                break;
            case "name":
                setDoubleClick((prev) => {
                    if (prev.includes("name")) {
                        return prev.filter((item) => item !== "name");
                    } else {
                        return [...prev, "name"];
                        saveChanges();
                    }
                });
                break;
            case "url":
                setDoubleClick((prev) => {
                    if (prev.includes("url")) {
                        return prev.filter((item) => item !== "url");
                    } else {
                        return [...prev, "url"];
                        saveChanges();
                    }
                });
                break;
            default:
                break;
        }
    };


    const [form, setForm] = useState({
        id: id,
        projectID: projectID || "",
        name: name || "",
        url: url || "",
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const { value, name } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
        console.log("form", value, name)

    };

    const { user } = useSelector((state: RootState) => state.user)
    const { createlog } = useMonitoring();


    const saveChanges = async () => {
        console.log("Saving changes:", form);
        dispatch(updateProject({
            id: form.id,
            updateInput: {
                projectID: form.projectID,
                name: form.name,
                url: form.url,
            }
        }));
         await createlog({
            userId: user?.id || "",
            title: `Project ${form.name} created`,
            message: `Project ${form.name} with ID ${form.projectID} created.`,
            tags: "CREATED",
            createdAt: new Date().toISOString(),
        });

}

useEffect(() => {
    const handleClick = (event: MouseEvent) => {
        if (
            checkClick.current &&
            !checkClick.current.contains(event.target as Node)
        ) {
            if (doubleClick.length > 0) {
                saveChanges();
            }
            setDoubleClick([]);
        }
    };

    window.addEventListener("click", handleClick);

    return () => {
        window.removeEventListener("click", handleClick);
    };
}, [form]);




return (
    <>
        <tr ref={checkClick} onDoubleClick={handleDoubleClick} className="border-b  border-gray-200">
            <td className="w-1/15 py-2"><input type="checkbox"
                checked={selectedProject?.includes(id || "")}
                onChange={(e) => {
                    if (e.target.checked) {
                        setSelectedProject([...(selectedProject || []), id || ""])

                    } else {
                        setSelectedProject(selectedProject?.filter((selectedId) => selectedId !== id))
                    }
                }}
            /></td>
            <td data-column="projectID" className="w-1/5 pl-5">
                {doubleClick.includes("projectID") ? (
                    <input type="text"
                        className="border border-[#047D95] rounded-md px-2 py-1 text-sm focus:outline-none  "
                        name="projectID"
                        value={form.projectID}
                        onChange={handleInputChange}
                    />
                ) : projectID}
            </td>

            <td className="w-1/5 pl-5">{status}</td>
            <td data-column="name" className="w-1/5 pl-5">
                {doubleClick.includes("name") ? (
                    <input type="text"
                        className="border border-[#047D95] rounded-md px-2 py-1 text-sm focus:outline-none  "
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                    />
                ) : name}
            </td>
            <td className="w-1/5 pl-5">{responseTime}</td>
            <td data-column="url" className="w-1/5 pl-5">
                {doubleClick.includes("url") ? (
                    <input type="text"
                        className="border border-[#047D95] rounded-md px-2 py-1 text-sm focus:outline-none  "
                        name="url"
                        value={form.url}
                        onChange={handleInputChange}
                    />
                ) : url}
            </td>
            <td className="w-1/5 pl-5">{lastChecked}</td>
            <td className="w-1/5 pl-5">
                {loading ? (
                    <div className="flex items-center justify-center gap-2 text-gray-500">
                        <LoaderCircle className="animate-spin" size={18} />
                    </div>
                ) : (
                    <div onClick={testConnection}>
                        <Button name="Test" />
                    </div>
                )}
            </td>
        </tr>
    </>
)
}

export default TableBody
