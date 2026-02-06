import { useContext } from "react";
import { motion } from "framer-motion";
import AuthContext from "../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const GoogleLogin = () => {
    const { signinWithGoogle } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const handleGoogleSignin = () => {
        signinWithGoogle()
            .then(() => {
                toast.success("Signed in with Google successfully!");
                navigate(location?.state ? location.state : "/");
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    return (
        <motion.button
            onClick={handleGoogleSignin}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative w-full bg-white border-2 border-gray-200 hover:border-gray-300 text-primaryDark font-semibold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden shadow-sm hover:shadow-md"
        >
            {/* Animated Background */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-50 via-red-50 to-yellow-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
            />

            {/* Content */}
            <div className="relative flex items-center gap-3">
                {/* Google Icon with Animation */}
                <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-6 h-6 flex items-center justify-center"
                >
                    <FcGoogle className="w-full h-full" />
                </motion.div>

                {/* Text */}
                <span className="text-base">Continue with Google</span>
            </div>

            {/* Shine Effect */}
            <motion.div
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-700"
                style={{ width: "50%", transform: "skewX(-20deg)" }}
            />
        </motion.button>
    );
};

export default GoogleLogin;
