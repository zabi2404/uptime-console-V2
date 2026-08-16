
import Navbar from "./components/common/Navbar"
import Sidebar from "./components/common/Sidebar"
import TopBar from "./components/common/TopBar"
import { useNavbarContext } from "./context/NavbarContext";

function Layout({ children }: { children: React.ReactNode }) {
   const { isSidebarOpen } = useNavbarContext();
    return (
        <div className="flex flex-col min-h-screen">
            <div className=" flex flex-col">
                <Navbar />
                <TopBar />
            </div>
            <div className="flex">
                <div className={`${isSidebarOpen ? 'w-52' : 'w-0'} transition-all duration-300`}>
                <Sidebar />
                </div>
                <div className="flex-1 min-w-0 p-2">
                {children}
                </div>
            </div>
        </div>
    )
}

export default Layout