import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "aws-amplify/auth";

interface ProtectedRouteProps {
    children: React.ReactNode;
    protected?: boolean;
}

const ProtectedRoute = ({ children, protected: isProtected = true }: ProtectedRouteProps) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await getCurrentUser();
                setAuthenticated(true);
            } catch {
                setAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    return isProtected
        ? (authenticated
            ? children
            : <Navigate to="/login" replace />)
        : (authenticated
            ? <Navigate to="/" replace />
            : children);
};

export default ProtectedRoute;