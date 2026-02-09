import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiImage, FiEye, FiEyeOff, FiArrowRight, FiCheck } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi";
import Lottie from "lottie-react";
import registerAnimation from "../../assets/lottie/register.json";
import AuthContext from "../../context/AuthContext";
import toast from "react-hot-toast";
import GoogleLogin from "../../components/GoogleLogin";

const Register = () => {
    const { createUser, setUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const [error, setError] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    // Password strength checks
    const passwordChecks = [
        { label: "At least 6 characters", valid: password.length >= 6 },
        { label: "One uppercase letter", valid: /[A-Z]/.test(password) },
        { label: "One lowercase letter", valid: /[a-z]/.test(password) },
    ];

    const handleRegister = (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = e.target;
        const email = formData.email.value;
        const name = formData.name.value;
        const photo = formData.photoUrl.value;

        // Password validation
        if (!passwordPattern.test(password)) {
            setError({
                password: "Please meet all password requirements.",
            });
            setLoading(false);
            return;
        }

        createUser(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setUser(user);
                updateUserProfile({ displayName: name, photoURL: photo })
                    .then(() => {
                        toast.success("Account created successfully!");
                        navigate("/");
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((error) => {
                const errorMessage = error.message;
                setError({ general: errorMessage });
                toast.error(errorMessage);
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="min-h-screen flex relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-purple-50">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-teal/10 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple/5 to-teal/5 rounded-full blur-3xl" />
            </div>

            <div className="flex flex-col lg:flex-row w-full relative z-10">
                {/* Left Side - Form */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex-1 flex items-center justify-center p-6 lg:p-12 order-2 lg:order-1"
                >
                    <div className="w-full max-w-md">
                        {/* Mobile Animation */}
                        <div className="lg:hidden mb-8">
                            <Lottie animationData={registerAnimation} className="w-48 mx-auto" />
                        </div>

                        {/* Form Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8"
                        >
                            {/* Header */}
                            <div className="text-center mb-6">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple/10 rounded-full text-purple text-sm font-medium mb-4">
                                    <HiOutlineSparkles />
                                    <span>Join JobCraft</span>
                                </div>
                                <h1 className="text-3xl font-bold text-primaryDark mb-2">Create Account</h1>
                                <p className="text-slate">Start your career journey today</p>
                            </div>

                            <form onSubmit={handleRegister} className="space-y-4">
                                {/* Name */}
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-primaryDark">Full Name</label>
                                    <div className="relative">
                                        <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate" />
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Enter your full name"
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-11 py-3 text-primaryDark placeholder-slate/50 focus:outline-none focus:border-purple focus:ring-2 focus:ring-purple/20 transition-all"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Photo URL */}
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-primaryDark">Photo URL</label>
                                    <div className="relative">
                                        <FiImage className="absolute left-4 top-1/2 -translate-y-1/2 text-slate" />
                                        <input
                                            type="url"
                                            name="photoUrl"
                                            placeholder="Enter your photo URL"
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-11 py-3 text-primaryDark placeholder-slate/50 focus:outline-none focus:border-purple focus:ring-2 focus:ring-purple/20 transition-all"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-primaryDark">Email</label>
                                    <div className="relative">
                                        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate" />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-11 py-3 text-primaryDark placeholder-slate/50 focus:outline-none focus:border-purple focus:ring-2 focus:ring-purple/20 transition-all"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-primaryDark">Password</label>
                                    <div className="relative">
                                        <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="Create a password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-11 py-3 text-primaryDark placeholder-slate/50 focus:outline-none focus:border-purple focus:ring-2 focus:ring-purple/20 transition-all"
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

                                    {/* Password Requirements */}
                                    {password.length > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            className="mt-2 space-y-1 bg-gray-50 rounded-lg p-3"
                                        >
                                            {passwordChecks.map((check, index) => (
                                                <div
                                                    key={index}
                                                    className={`flex items-center gap-2 text-xs ${check.valid ? "text-emerald" : "text-slate"}`}
                                                >
                                                    <FiCheck className={check.valid ? "text-emerald" : "text-slate/30"} />
                                                    <span>{check.label}</span>
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                    {error.password && (
                                        <p className="text-red-500 text-sm">{error.password}</p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-purple to-indigo text-white font-semibold py-3.5 rounded-xl hover:shadow-lg hover:shadow-purple/30 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 mt-2"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <span>Create Account</span>
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
                                        <span className="px-4 bg-white text-slate font-medium">or continue with</span>
                                    </div>
                                </div>

                                {/* Google Login */}
                                <GoogleLogin />
                            </form>

                            {/* Sign In Link */}
                            <p className="text-center text-slate mt-6">
                                Already have an account?{" "}
                                <Link
                                    to="/auth/signin"
                                    className="text-purple font-semibold hover:underline"
                                >
                                    Sign In
                                </Link>
                            </p>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Right Side - Animation */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 order-1 lg:order-2"
                >
                    <div className="max-w-md text-center">
                        <Lottie animationData={registerAnimation} className="w-full max-w-sm mx-auto" />
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-3xl font-bold text-primaryDark mt-8 mb-4"
                        >
                            Join Our Community
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-slate"
                        >
                            Create an account to access exclusive job opportunities and connect with top employers.
                        </motion.p>

                        {/* Features List */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mt-8 space-y-3 text-left"
                        >
                            {[
                                "Access 10,000+ job listings",
                                "Apply with one click",
                                "Track your applications",
                                "Get personalized recommendations",
                            ].map((feature, index) => (
                                <div key={index} className="flex items-center gap-3 text-slate">
                                    <div className="w-6 h-6 bg-purple/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <FiCheck className="text-purple text-sm" />
                                    </div>
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Register;
