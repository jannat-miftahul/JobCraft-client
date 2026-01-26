import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import { div } from "motion/react-client";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    const location = useLocation();
    // console.log(location);

    if (loading) {
        return (
            <LoadingSpinner text="Checking Authentication..." />
        );
    }

    if (user && user?.email) {
        return children;
    }

    return <Navigate state={location?.pathname} to="/auth/signin" />;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
