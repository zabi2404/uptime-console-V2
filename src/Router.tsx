import { createBrowserRouter, Outlet } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import Overview from "./pages/Overview/Overview";
import Layout from "./Layout";
import VersionPage from "./components/common/VersionPage";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

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
                    <Overview />
                ),
            },
            {
                path: "/domains",
                element: (
                    <VersionPage />
                ),
            },
            {
                path: "/Projects",
                element: (
                    <VersionPage />
                ),
            },
            {
                path: "/activity",
                element: (
                    <VersionPage />
                ),
            },
            {
                path: "/notifications",
                element: (
                    <VersionPage />
                ),
            },
            {
                path: "/settings",
                element: (
                    <VersionPage />
                ),
            },
            {
                path: "/profile",
                element: (
                    <Profile />
                ),
            },
            {
                path: "/login",
                element: (
                    <Login />
                ),
            },
            {
                path: "/signUp",
                element: (
                    <Signup />
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