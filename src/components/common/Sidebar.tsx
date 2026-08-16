import { Activity, Bell, ChevronLeft, FolderOpenDot, GlobeCheck, Settings, TextQuote } from "lucide-react"
import { useNavbarContext } from "../../context/NavbarContext";
import { Link, useNavigate } from "react-router-dom";


function Sidebar() {

       const { isSidebarOpen, setIsSidebarOpen } = useNavbarContext();
       const navigate = useNavigate();
   const sideBarList1 = [
    {
        name: "Overview",
        path: "/",
        icon:<TextQuote />
    },
    {
        name: "Projects",
        path: "/projects",
        icon:<FolderOpenDot />
    },
    {
        name: "Domains",
        path: "/domains",
        icon:<GlobeCheck />
    },{
        name: "Health Checks",
        path: "/activity",
        icon:<Activity />
    }

   ];

   const sideBarList2 = [
       {
           name: "Notifications",
           path: "/notifications",
           icon:<Bell />
       },
    {
        name: "Settings",
        path: "/settings",
        icon:<Settings />
    }
   ]

    return (
        <div className={`p-4   ${isSidebarOpen ? 'translate-x-0 w-52' : '-translate-x-64 '} transition-all duration-300 border-r border-gray-200 shadow-stone-950 text-white h-screen`}>
            <div className="flex items-center gap-20 mb-4">
           <p className="font-bold pl-2 text-black">Overview</p>
           <ChevronLeft
           className="cursor-pointer text-black"
           onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
            </div>

            <div>
                {sideBarList1.map((item, index) => (
                    <div key={index} className="py-2 hover:bg-gray-200 px-2 rounded-md cursor-pointer"
                     onClick={() => navigate(item.path)}
                    >
                     <div className="flex items-center gap-2">
                        <div className="w-4 h-4 flex justify-center items-center text-black" >
                          {item.icon}
                        </div>
                        <Link
                        className="text-[12px] text-black"
                        to={item.path}>{item.name}</Link>
                    
                     </div>
                     </div>
                ))}
            </div>
            <div>
                {sideBarList2.map((item, index) => (
                    <div key={index} className="py-2 hover:bg-gray-200 px-2 rounded-md cursor-pointer"
                     onClick={() => navigate(item.path)}
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 flex justify-center text-black items-center" >
                                {item.icon}
                            </div>
                            <Link className="text-[12px] text-black" to={item.path}>{item.name}</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sidebar