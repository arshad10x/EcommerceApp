import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
    const location = useLocation(); //check current location

    if (
        !isAuthenticated &&
        !(
            location.pathname.includes("/login") ||
            location.pathname.includes("/register")
        )
    ) {
        return <Navigate to="/auth/login" />;
    }
    if (
        (isAuthenticated && location.pathname.includes("/login")) ||
        location.pathname.includes("/register")
    ) {
        if (user?.role === "admin") {
            return <Navigate to="/admin/dashboard" />;
        } else {
            return <Navigate to="/shop/home" />;
        }
    }
    if (
        isAuthenticated &&
        user?.role !== "admin" &&
        location.pathname.includes("admin")
    ) {
        return <Navigate to="/unauth-page" />;
    }
    // admin user try to access shop page
    if (
        isAuthenticated &&
        user?.role === "admin" &&
        location.pathname.includes("shop")
    ) {
        return <Navigate to="/admin/dashboard" />;
    }
    return children;
};

export default CheckAuth;