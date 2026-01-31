import { useContext, useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiMenu, FiX, FiLogOut, FiUser, FiChevronDown,
    FiHome, FiBriefcase, FiInfo, FiFileText, FiPlusCircle, FiList
} from "react-icons/fi";
import AuthContext from "../context/AuthContext";
import logo from "../assets/jobcraft-logo.png";
import toast from "react-hot-toast";

const Navbar = () => {
    const { user, signoutUser } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
        setIsProfileOpen(false);
    }, [location]);

    const handleSignout = () => {
        signoutUser()
            .then(() => {
                toast.success("Signed out successfully");
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    const publicNavItems = [
        { path: "/", label: "Home", icon: FiHome },
        { path: "/jobs", label: "Find Jobs", icon: FiBriefcase },
        { path: "/about", label: "About", icon: FiInfo },
    ];

    const authNavItems = [
        { path: "/my-applications", label: "My Applications", icon: FiFileText },
        { path: "/add-job", label: "Post Job", icon: FiPlusCircle },
        { path: "/my-posted-jobs", label: "My Jobs", icon: FiList },
    ];

    const NavLink_Component = ({ item, mobile = false }) => (
        <NavLink
            to={item.path}
            className={({ isActive }) =>
                `relative flex items-center gap-2 px-4 py-2.5 font-medium transition-all duration-300 rounded-xl ${mobile
                    ? "text-base w-full hover:bg-gray-50"
                    : "text-sm"
                } ${isActive
                    ? mobile
                        ? "bg-accent/10 text-accent"
                        : "text-accent"
                    : "text-slate hover:text-primaryDark"
                }`
            }
        >
            {({ isActive }) => (
                <>
                    {mobile && <item.icon className="text-lg" />}
                    <span>{item.label}</span>
                    {isActive && !mobile && (
                        <motion.span
                            layoutId="navbar-indicator"
                            className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-accent to-coral rounded-full"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                    )}
                </>
            )}
        </NavLink>
    );

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-white/95 backdrop-blur-lg shadow-lg shadow-gray-100/50"
                    : "bg-white/80 backdrop-blur-md"
                    }`}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
                            <img
                                className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-full ring-2 ring-teal/20 group-hover:ring-teal/40 transition-all duration-300"
                                src={logo}
                                alt="JobCraft"
                            />
                            <div className="flex flex-col">
                                <motion.span
                                    className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primaryDark via-teal to-primaryLight bg-clip-text text-transparent relative"
                                    style={{ backgroundSize: '200% auto' }}
                                    animate={{
                                        backgroundPosition: ['0% center', '100% center', '0% center']
                                    }}
                                    transition={{
                                        duration: 5,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                >
                                    JobCraft
                                </motion.span>
                                <span className="hidden sm:block text-[10px] font-medium text-slate/70 -mt-0.5 tracking-wide">
                                    Craft Your Career
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-1">
                            {publicNavItems.map((item) => (
                                <NavLink_Component key={item.path} item={item} />
                            ))}

                            {/* Auth Nav Items - Only show when logged in */}
                            {user && (
                                <>
                                    <div className="w-px h-6 bg-gray-200 mx-2" />
                                    {authNavItems.map((item) => (
                                        <NavLink_Component key={item.path} item={item} />
                                    ))}
                                </>
                            )}
                        </div>

                        {/* Right Section */}
                        <div className="flex items-center gap-2 sm:gap-4">
                            {user && user?.email ? (
                                <div className="flex items-center gap-2 sm:gap-3">
                                    {/* Profile Dropdown - Desktop */}
                                    <div className="relative hidden sm:block">
                                        <motion.button
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                                            className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-300"
                                        >
                                            <div className="relative">
                                                <img
                                                    src={
                                                        user?.photoURL ||
                                                        "https://i.ibb.co.com/P1n2z8D/profile-icon-design-free-vector.jpg"
                                                    }
                                                    alt="Profile"
                                                    className="w-8 h-8 rounded-full object-cover ring-2 ring-white"
                                                />
                                                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald rounded-full ring-2 ring-white" />
                                            </div>
                                            <div className="hidden md:block text-left">
                                                <p className="text-sm font-medium text-gray-800 max-w-[100px] truncate">
                                                    {user?.displayName || "User"}
                                                </p>
                                            </div>
                                            <FiChevronDown
                                                className={`text-gray-400 transition-transform ${isProfileOpen ? "rotate-180" : ""
                                                    }`}
                                            />
                                        </motion.button>

                                        {/* Dropdown Menu */}
                                        <AnimatePresence>
                                            {isProfileOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden"
                                                >
                                                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-primaryDark to-primaryLight">
                                                        <img
                                                            src={
                                                                user?.photoURL ||
                                                                "https://i.ibb.co.com/P1n2z8D/profile-icon-design-free-vector.jpg"
                                                            }
                                                            alt="Profile"
                                                            className="w-12 h-12 rounded-full object-cover ring-2 ring-white/30"
                                                        />
                                                        <div>
                                                            <p className="font-semibold text-white">
                                                                {user?.displayName || "User"}
                                                            </p>
                                                            <p className="text-xs text-white/70 truncate max-w-[150px]">
                                                                {user?.email}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="p-2">
                                                        <button
                                                            onClick={handleSignout}
                                                            className="w-full flex items-center gap-3 px-4 py-3 text-coral hover:bg-coral/10 rounded-xl transition-colors"
                                                        >
                                                            <FiLogOut />
                                                            <span className="font-medium">Sign Out</span>
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Mobile Logout */}
                                    <button
                                        onClick={handleSignout}
                                        className="sm:hidden p-2.5 bg-gray-100 hover:bg-coral hover:text-white text-slate rounded-xl transition-all"
                                        aria-label="Sign out"
                                    >
                                        <FiLogOut className="w-5 h-5" />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <Link
                                        to="/auth/register"
                                        className="hidden sm:inline-flex px-4 py-2.5 text-sm text-primaryDark hover:text-accent font-medium transition-colors"
                                    >
                                        Register
                                    </Link>
                                    <Link
                                        to="/auth/signin"
                                        className="flex items-center gap-2 px-4 sm:px-6 py-2.5 bg-gradient-to-r from-accent to-coral hover:from-coral hover:to-accent text-white text-sm font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 hover:scale-105"
                                    >
                                        <FiUser className="sm:hidden" />
                                        <span>Sign In</span>
                                    </Link>
                                </div>
                            )}

                            {/* Mobile Menu Button */}
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="lg:hidden p-2.5 text-slate hover:text-accent hover:bg-gray-50 rounded-xl transition-colors"
                                aria-label="Toggle menu"
                            >
                                <AnimatePresence mode="wait">
                                    {isMenuOpen ? (
                                        <motion.div
                                            key="close"
                                            initial={{ rotate: -90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: 90, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <FiX className="w-6 h-6" />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="menu"
                                            initial={{ rotate: 90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: -90, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <FiMenu className="w-6 h-6" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
                        >
                            <div className="container mx-auto px-4 py-4">
                                {/* Navigation Links */}
                                <div className="space-y-1">
                                    <p className="px-4 py-2 text-xs font-semibold text-slate uppercase tracking-wider">
                                        Navigation
                                    </p>
                                    {publicNavItems.map((item) => (
                                        <NavLink_Component
                                            key={item.path}
                                            item={item}
                                            mobile
                                        />
                                    ))}
                                </div>

                                {/* Auth Navigation */}
                                {user && (
                                    <div className="mt-4 pt-4 border-t border-gray-100 space-y-1">
                                        <p className="px-4 py-2 text-xs font-semibold text-slate uppercase tracking-wider">
                                            Dashboard
                                        </p>
                                        {authNavItems.map((item) => (
                                            <NavLink_Component
                                                key={item.path}
                                                item={item}
                                                mobile
                                            />
                                        ))}
                                    </div>
                                )}

                                {/* User Info - Mobile */}
                                {user && (
                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-primaryDark to-primaryLight rounded-2xl">
                                            <img
                                                src={
                                                    user?.photoURL ||
                                                    "https://i.ibb.co.com/P1n2z8D/profile-icon-design-free-vector.jpg"
                                                }
                                                alt="Profile"
                                                className="w-12 h-12 rounded-full object-cover ring-2 ring-white/30"
                                            />
                                            <div>
                                                <p className="font-semibold text-white">
                                                    {user?.displayName || "User"}
                                                </p>
                                                <p className="text-xs text-white/70 truncate max-w-[200px]">
                                                    {user?.email}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Auth Buttons - Mobile (when not logged in) */}
                                {!user && (
                                    <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                                        <Link
                                            to="/auth/signin"
                                            className="block w-full py-3 bg-gradient-to-r from-accent to-coral text-white font-semibold text-center rounded-xl"
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            to="/auth/register"
                                            className="block w-full py-3 border border-gray-200 text-primaryDark font-medium text-center rounded-xl hover:bg-gray-50 transition-colors"
                                        >
                                            Create Account
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Spacer for fixed navbar */}
            <div className="h-16 lg:h-20" />
        </>
    );
};

export default Navbar;
