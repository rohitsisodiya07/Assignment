import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");

    // User login nahi hai
    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    // User ka role allowed nahi hai
    if (!allowedRoles.includes(user.role)) {
        if (user.role === "admin") {
            return <Navigate to="/admin" replace />;
        }

        if (user.role === "manager") {
            return <Navigate to="/manager" replace />;
        }

        return <Navigate to="/user" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;