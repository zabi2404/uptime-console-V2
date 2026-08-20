import { LoaderCircle, RotateCw } from "lucide-react"
import Button from "../Buttons/Button"
import SearchBar from "../SearchBar"
import TableHead from "./TableHead"
import TableBody from "./TableBody"
// import { deleteProject, fetchProjects } from "../../../redux/Projects/ProjectSlice"
import { useEffect, useState } from "react"
import type { AppDispatch, RootState } from "../../../redux/store"
import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../../context/ModalContext"
import { deleteProject, fetchProjects } from "@/redux/Projects/ProjectSlice"
import type { Schema } from "@/amplify/data/resource"
import { generateClient } from "aws-amplify/api"
import { useMonitoring } from "@/Hooks/useMontioring"


type Project = Schema["UptimeProjects"]["type"];


const tabletitleList = [
    { id: 1, title: "projectID" },
    { id: 2, title: "status" },
    { id: 3, title: "name" },
    { id: 4, title: "responseTime" },
    { id: 5, title: "url" },
    { id: 6, title: "lastChecked" },
    { id: 7, title: "Actions" }
]




function Tables() {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector(
        (state: RootState) => state.projects
    );
    const [projects, setProjects] = useState<Project[]>();

    const [selectedProject, setSelectedProject] = useState<string[] | undefined>([]);



    useEffect(() => {
        const loadProjects = async () => {
            const result = await dispatch(fetchProjects());

            if (fetchProjects.fulfilled.match(result)) {
                setProjects(result.payload);
            }
        };

        loadProjects();
    }, [dispatch]);

    const client = generateClient<Schema>();

    useEffect(() => {
        const subscription = client.models.UptimeProjects
            .observeQuery()
            .subscribe({
                next: ({ items, isSynced }) => {
                    console.log("Projects updated:", items);
                    console.log("Synced:", isSynced);

                    setProjects([...items]);
                },
                error: (error) => {
                    console.error("Subscription error:", error);
                },
            });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const { openModal } = useModal();
    const { createlog } = useMonitoring();
    const { user } = useSelector((state: RootState) => state.user)

    const CheckDeleteButton =
        selectedProject?.length !== 0;

    const DeleteSelectedProject = () => {
        const selectedProjects = projects?.filter((project) =>
            selectedProject?.includes(project?.id || "")
        );

        selectedProjects?.forEach(async (project) => {
            dispatch(deleteProject({ id: project?.id }));
            await createlog({
                userId: user?.id || "",
                title: `Project ${project.name} created`,
                message: `Project ${project.name} with ID ${project.projectID} created.`,
                tags: "CREATED",
                createdAt: new Date().toISOString(),
            });
        });
    };




    return (
        <div className="w-full  border border-gray-200 shadow-md rounded-[8px] p-2">

            {/* top bar */}
            <div className="w-full">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="font-bold text-[24px]">
                        Tables
                    </h1>

                    <div className="flex gap-2 items-center">
                        <div className="rounded-full p-1 border-[1.5px] border-[#1B76E2] hover:bg-blue-50"
                            onClick={() => {
                                dispatch(fetchProjects())
                            }}
                        >
                            <RotateCw
                                size={15}
                                className="text-[#1B76E2] cursor-pointer "

                            />
                        </div>


                        <div onClick={() => {
                            DeleteSelectedProject()
                        }}>
                            <Button name="Delete Project"
                                disableButton={CheckDeleteButton ? false : true}
                            />
                        </div>

                        <div className="h-7 border-r-2 border-gray-300" />

                        <div onClick={openModal}>

                            <Button name="Create Project"
                            />
                        </div>

                    </div>
                </div>
            </div>

            {/* search */}
            <div className="max-w-[600px]">
                <SearchBar
                    placeholder="Search for projects"
                    shortcutEnable={false}
                    bgColor="gray-700"
                />
            </div>

            {/* table */}
            <div className="overflow-auto w-full">

                <table className=" min-w-[1040px] w-full">
                    <thead className="border-b border-gray-200">
                        <tr className="text-left">
                            <th className="py-4 w-[5%]">
                                <input type="checkbox"
                                    checked={selectedProject?.length === projects?.length}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedProject(projects?.map((item) => item?.id || ""));

                                        } else {
                                            setSelectedProject([]);
                                        }
                                    }}
                                />
                            </th>

                            {tabletitleList.map((item) => (
                                <TableHead
                                    key={item.id}
                                    title={item.title}
                                />
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={8} className="py-10 text-center">
                                    <div className="flex items-center justify-center gap-2 text-gray-500">
                                        <LoaderCircle
                                            className="animate-spin"
                                            size={18}
                                        />
                                        Loading projects...
                                    </div>
                                </td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan={8} className="py-10 text-center">
                                    <div className="text-red-500">
                                        Failed to load projects
                                    </div>

                                    <button
                                        onClick={() => dispatch(fetchProjects())}
                                        className="mt-2 text-sm text-[#1B76E2] hover:underline"
                                    >
                                        Try again
                                    </button>
                                </td>
                            </tr>
                        ) : projects?.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={8}
                                    className="py-10 text-center text-gray-500"
                                >
                                    No projects found
                                </td>
                            </tr>
                        ) : (
                            projects?.map((item) => (
                                <TableBody
                                    key={item?.projectID}
                                    id={item?.id || ""}
                                    projectID={item?.projectID || "N/A"}
                                    status={item?.status || "N/A"}
                                    name={item?.name || "N/A"}
                                    url={item?.url || "N/A"}
                                    responseTime={item?.responseTime || "N/A"}
                                    lastChecked={item?.lastChecked || "N/A"}
                                    selectedProject={selectedProject}
                                    setSelectedProject={setSelectedProject}

                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Tables