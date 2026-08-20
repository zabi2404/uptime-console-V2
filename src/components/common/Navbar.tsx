import { Bell, ChevronDown, Activity, FolderOpenDot, GlobeCheck, Search, Settings, TextQuote, UserRoundArrowLeft } from "lucide-react"
import SearchBar from "./SearchBar"
import { useLocation, useNavigate } from "react-router-dom";
import Logout from "../Auth/Logout";
import useImage from "@/Hooks/useImage";


const sideBarList1 = [
    {
        name: "Overview",
        path: "/",
        icon: TextQuote
    },
    {
        name: "Projects",
        path: "/projects",
        icon: FolderOpenDot
    },
    {
        name: "Domains",
        path: "/domains",
        icon: GlobeCheck
    }, {
        name: "Health Checks",
        path: "/activity",
        icon: Activity
    },
    {
        name: "Notifications",
        path: "/notifications",
        icon: Bell
    },
    {
        name: "Settings",
        path: "/settings",
        icon: Settings
    }, {
        name: "/profile",
        path: "/profile",
        icon: UserRoundArrowLeft
    }

];
function Navbar() {
    const navigate = useNavigate();
    const pathname = useLocation();

    const {imageUrl} = useImage();
    

    const getDynamicLogo = () => {
        const currentPath = pathname.pathname;
        const currentItem = sideBarList1.find(
            item => item.path === currentPath
        );

        if (!currentItem) return null;

        const Icon = currentItem.icon;

        return <Icon size={15} />;
    };
    return (
        <>
            <div className="flex w-full p-1 px-3     justify-between items-center  bg-[#161D26] text-white">
                {/* first part */}
                <div className="flex items-center gap-3">
                    <div className="border-0 pr-3  border-r-1 border-gray-600 ">
                        <img src="/public/ChatGPT Image Aug 11, 2026, 04_26_33 AM.png" alt=""
                            className="h-8 w-12 "
                        />
                    </div>
                    {/* dynamic logo based on route */}
                    <div className="">
                        {getDynamicLogo()}
                    </div>

                    <div className="">
                        <div className="xsm:hidden sm:block">
                            <SearchBar
                                placeholder="Search for projects, tasks, and more"
                                shortcutEnable={true}
                                bgColor="gray-700"
                            />
                        </div>
                        <div className="sm:hidden">
                            <Search
                                className="pt-[2px]"

                            />
                        </div>
                    </div>

                </div>


                {/* second part */}
                <div className="flex items-center gap-3">
                    <div className="xsm:hidden md:flex items-center gap-1 hover:cursor-pointer hover:bg-gray-700 px-2 py-1 rounded-md whitespace-nowrap">
                        <p className="text-[12px]">All Projects</p>

                        <ChevronDown
                            className="pt-[2px]"
                            size={12}
                        />
                    </div>


                    <Settings
                        size={15}
                        className="cursor-pointer"
                        onClick={() => { navigate('/settings') }}
                    />
                    <Bell
                        size={15}
                        className="cursor-pointer"
                        onClick={() => { navigate('/notifications') }}
                    />
                    <Logout />
                    <div className="w-6 h-6 flex  justify-between justify-center  rounded-full bg-gray-500 cursor-pointer"
                        onClick={() => {
                            navigate('/profile')
                        }}
                    >
                        <img className="cursor-pointer m-auto  rounded-full"
                        src={imageUrl}
                        />
                    </div>

                </div>
            </div>
        </>
    )
}

export default Navbar
