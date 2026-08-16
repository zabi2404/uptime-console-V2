import { createContext, useContext, useState } from "react";

interface NavbarContextType {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
//eslint-disable-next-line
export const NavbarContext = createContext<NavbarContextType | null>(null);


export const NavbarProvider = ({ children }: { children: React.ReactNode }) => {
const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <NavbarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
            {children}
        </NavbarContext.Provider>
    );
};

//eslint-disable-next-line
export const useNavbarContext = () => {
    const context = useContext(NavbarContext);
    if (!context) {
        throw new Error("useNavbarContext must be used within a NavbarProvider");
    }
    return context;
}