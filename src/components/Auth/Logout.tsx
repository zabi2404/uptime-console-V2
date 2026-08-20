import { signOut } from "aws-amplify/auth";
import { LogOut } from "lucide-react";

function Logout() {

    const handleLogout = async () => {
        try {
            await signOut();

            console.log("User logged out");

            window.location.href = "/login";
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (


        <>
            <LogOut
                size={15}
                className="cursor-pointer"
                onClick={handleLogout}
            />
        </>
    )
}

export default Logout   