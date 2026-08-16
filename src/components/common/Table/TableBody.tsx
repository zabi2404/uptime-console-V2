import Button from "../Buttons/Button";
// import { testConnection } from "../../../graphql/mutations";
import { LoaderCircle } from "lucide-react";


interface TableBodyProps {
    projectID: string | null,
    status: string | null,
    name: string | null,
    url: string | null,
    responseTime: string | null,
    lastChecked: string | null,
    selectedProject: string[];
    setSelectedProject: React.Dispatch<React.SetStateAction<string[]>>;
}
function TableBody({ projectID, status, name, url, responseTime, lastChecked, selectedProject, setSelectedProject }: TableBodyProps) {


    // const [loading, setLoading] = useState(false);
    // const [ApiError, setError] = useState<Error | undefined>(undefined);
    // const test = async () => {
    //     const client = generateClient();

    //     try {
    //         setLoading(true)
    //         const result = await client.graphql({
    //             query: testConnection,
    //             variables: {
    //                 input: {
    //                     url: url || "",
    //                 }
    //             }
    //         })

    //         if (result?.data?.testConnection === null || result?.data?.testConnection?.statusCode !== 200) {
    //             toast.error("Test connection failed!");
    //         } else {

    //             toast.success(
    //                 `${result?.data?.testConnection?.message} Status Code (${result?.data?.testConnection?.statusCode})`
    //             );
    //         }
    //         setLoading(false)
    //     } catch (error) {
    //         setLoading(false)
    //         if (error instanceof Error) {
    //             setError(error);
    //         } else {
    //             setError(new Error("Something went wrong"));
    //         }
    //     }

    // }
    return (
        <>
            <tr className="border-b  border-gray-200">
                <td className="w-1/15 py-2"><input type="checkbox"
                    checked={selectedProject.includes(projectID || "")}
                    onChange={(e) => {
                        if (e.target.checked) {
                            setSelectedProject([...selectedProject, projectID || ""])
                            console.log(projectID)
                        } else {
                            setSelectedProject(selectedProject.filter((id) => id !== projectID))
                        }
                    }}
                /></td>
                <td className="w-1/5 pl-5">{projectID}</td>
                <td className="w-1/5 pl-5">{status}</td>
                <td className="w-1/5 pl-5">{name}</td>
                <td className="w-1/5 pl-5">{responseTime}</td>
                <td className="w-1/5 pl-5">{url}</td>
                <td className="w-1/5 pl-5">{lastChecked}</td>
                <td className="w-1/5 pl-5">
                    {/* {loading ? <div className="flex items-center justify-center gap-2 text-gray-500"> */}
                        <LoaderCircle className="animate-spin" size={18} />
                    {/* </div> : */}
                        {/* ApiError ? <p>Error: {ApiError.message}</p> : */}
                           { <div
                                onClick={() => {  }
                                }                >
                                <Button name="Test" /></div>}
                </td>
            </tr>
        </>
    )
}

export default TableBody