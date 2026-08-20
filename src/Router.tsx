import { createBrowserRouter, Outlet } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import Overview from "./pages/Overview/Overview";
import Layout from "./Layout";
import VersionPage from "./components/common/VersionPage";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import ForgetPassword from "./components/Auth/ForgetPassword";
import ProtectedRoute from "./ProtectedRoutes";
import NotificationsPage from "./pages/Notification/Notification";
import ActivityPage from "./pages/Domains/ActivityPage";

interface ProviderWrapperProps {
    children: React.ReactNode;
}
//eslint-disable-next-line
const ProviderWrapper: React.FC<ProviderWrapperProps> = () => {
    return (
        <ErrorBoundary>
            <Layout>
                <Outlet />
            </Layout>
        </ErrorBoundary>
    );
}

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            // wrap the children with ProviderWrapper using outlet
            <ProviderWrapper>
                <div />
            </ProviderWrapper>
        ),
        children: [
            {
                path: "/",
                element: (
                    <ProtectedRoute>
                        <Overview />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/domains",
                element: (
                       <ProtectedRoute>
                           <ActivityPage />
                       </ProtectedRoute>
                ),
            },
            {
                path: "/Projects",
                element: (
                       <ProtectedRoute>
                           <VersionPage />
                       </ProtectedRoute>
                ),
            },
            {
                path: "/activity",
                element: (
                       <ProtectedRoute>
                           <VersionPage />
                       </ProtectedRoute>
                ),
            },
            {
                path: "/notifications",
                element: (
                       <ProtectedRoute>
                           <NotificationsPage />
                       </ProtectedRoute>
                ),
            },
            {
                path: "/settings",
                element: (
                       <ProtectedRoute>
                          <Profile />
                       </ProtectedRoute>
                ),
            },
            {
                path: "/profile",
                element: (
                       <ProtectedRoute>
                           <Profile />
                       </ProtectedRoute>
                ),
            },
            {
                path: "/login",
                element: (
                       <ProtectedRoute protected={false}>
                           <Login />
                       </ProtectedRoute>
                ),
            },
            {
                path: "/signUp",
                element: (
                       <ProtectedRoute protected={false}>
                           <Signup />
                       </ProtectedRoute>
                ),
            },
            {
                path: "/forgot-password",  
                element: (
                       <ProtectedRoute protected={false}>
                           <ForgetPassword />
                       </ProtectedRoute>
                ),
            },
            {
                path: "*",
                element: (
                    <div>404 Not Found</div>
                ),
            },

        ]
    }
])

export default router;