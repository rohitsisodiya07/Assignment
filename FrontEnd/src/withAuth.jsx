import { Navigate } from "react-router-dom";

const withAuth = (WrappedComponent) => {
    return (props) => {
        const token = localStorage.getItem("token");
        const user = JSON.parse(
            localStorage.getItem("user") || "null"
        );

        if (!token || !user) {
            return <Navigate to="/login" replace />;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
