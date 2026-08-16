import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react';

interface TableHeadProps {
    title: string;
}
function TableHead({ title }: TableHeadProps) {
    const [isClicked, setIsClicked] = useState("");
    return (
        <>

            <th className="w-1/5 cursor-pointer"
                onClick={() => {
                    setIsClicked(isClicked === "title" ? "" : "title")
                }}
            >
                <div className="flex justify-between items-center  mx-1 border-l-1 pl-4 border-gray-400">
                    <p>{title}</p>
                    {isClicked === "title" ? <ChevronDown
                        size={18}
                    /> :
                        <ChevronUp
                            size={18}
                        />}
                </div>
            </th>


        </>
    )
}

export default TableHead