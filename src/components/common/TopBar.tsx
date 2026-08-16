import { Menu } from "lucide-react"
import { useNavbarContext } from "../../context/NavbarContext";

function TopBar() {
    const { isSidebarOpen, setIsSidebarOpen } = useNavbarContext();
    return (
        <div className="flex items-center justify-between p-2 border-b border-gray-200 shadow-stone-950 "
        >
            
            <Menu
            className="cursor-pointer"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                size={15}
            />
        </div>
    )
}

export default TopBar