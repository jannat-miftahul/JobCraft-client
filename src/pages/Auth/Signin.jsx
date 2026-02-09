import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi";
import Lottie from "lottie-react";
import signinAnimation from "../../assets/lottie/signin.json";
import toast from "react-hot-toast";
import GoogleLogin from "../../components/GoogleLogin";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const Signin = () => {
    const { signinUser } = useAuth();
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const handleSignin = (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = e.target;
        const email = formData.email.value;
        const password = formData.password.value;

        signinUser(email, password)
            .then((userCredential) => {
                const userData = userCredential.user;

                const user = { email: email };
                axios
                    .post("https://jobportal-server-side.vercel.app/jwt", user, {
                        withCredentials: true,
                    })
                    .then((res) => {
                        console.log(res.data);
                    });

                toast.success(`Welcome back, ${userData?.displayName || 'User'}!`);
                navigate(location?.state ? location.state : "/");
            })
            .catch((err) => {
                setError({ login: err.code });
                toast.error(err.message);
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="min-h-screen flex relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-teal-50">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primaryLight/10 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-teal/5 to-primaryLight/5 rounded-full blur-3xl" />
            </div>

            <div className="flex flex-col lg:flex-row w-full relative z-10">
                {/* Left Side - Animation */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="hidden lg:flex lg:w-1/2 items-center justify-center p-12"
                >
                    <div className="max-w-md text-center">
                        <Lottie animationData={signinAnimation} className="w-full max-w-sm mx-auto" />
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-3xl font-bold text-primaryDark mt-8 mb-4"
                        >
                            Welcome Back!
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-slate"
                        >
                            Sign in to access your account and continue your job search journey with JobCraft.
                        </motion.p>
                    </div>
                </motion.div>

                {/* Right Side - Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex-1 flex items-center justify-center p-6 lg:p-12"
                >
                    <div className="w-full max-w-md">
                        {/* Mobile Animation */}
                        <div className="lg:hidden mb-8">
                            <Lottie animationData={signinAnimation} className="w-48 mx-auto" />
                        </div>

                        {/* Form Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white/80 backdrop-blur-sm rounded-xl p-8"
                        >
                            {/* Header */}
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal/10 rounded-full text-teal text-sm font-medium mb-4">
                                    <HiOutlineSparkles />
                                    <span>Welcome Back</span>
                                </div>
                                <h1 className="text-3xl font-bold text-primaryDark mb-2">Sign In</h1>
                                <p className="text-slate">Access your JobCraft account</p>
                            </div>

                            <form onSubmit={handleSignin} className="space-y-5">
                                {/* Email */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-primaryDark">Email Address</label>
                                    <div className="relative">
                                        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate" />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-11 py-3.5 text-primaryDark placeholder-slate/50 focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-primaryDark">Password</label>
                                    <div className="relative">
                                        <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="Enter your password"
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-11 py-3.5 text-primaryDark placeholder-slate/50 focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate hover:text-primaryDark transition-colors"
                                        >
                                            {showPassword ? <FiEyeOff /> : <FiEye />}
                                        </button>
                                    </div>
                                    {error?.login && (
                                        <p className="text-red-500 text-sm">{error.login}</p>
                                    )}
                                </div>

                                {/* Forgot Password */}
                                <div className="text-right">
                                    <Link
                                        to="/auth/forgot-password"
                                        className="text-sm text-teal hover:text-teal/80 font-medium hover:underline"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-teal to-primaryLight text-white font-semibold py-3.5 rounded-xl hover:shadow-lg hover:shadow-teal/30 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <span>Sign In</span>
                                            <FiArrowRight />
                                        </>
                                    )}
                                </motion.button>

                                {/* Divider */}
                                <div className="relative my-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-4 bg-white text-slate">or continue with</span>
                                    </div>
                                </div>

                                {/* Google Login */}
                                <GoogleLogin />
                            </form>

                            {/* Register Link */}
                            <p className="text-center text-slate mt-6">
                                Don&apos;t have an account?{" "}
                                <Link
                                    to="/auth/register"
                                    className="text-teal font-semibold hover:underline"
                                >
                                    Register
                                </Link>
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Signin;
