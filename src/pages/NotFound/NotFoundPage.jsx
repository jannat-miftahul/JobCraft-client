import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiHome, FiBriefcase, FiArrowRight, FiSearch } from "react-icons/fi";

const NotFoundPage = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12,
            },
        },
    };

    const floatingVariants = {
        animate: {
            y: [-10, 10, -10],
            rotate: [0, 5, -5, 0],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
            },
        },
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primaryDark via-primaryLight to-teal relative overflow-hidden flex items-center justify-center">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-coral rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.1, 0.15, 0.1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute -bottom-40 -left-40 w-[700px] h-[700px] bg-amber rounded-full blur-3xl"
                />

                {/* Floating Particles */}
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            y: [-30, 30, -30],
                            x: [-20, 20, -20],
                            opacity: [0.2, 0.5, 0.2],
                            scale: [0.8, 1.2, 0.8],
                        }}
                        transition={{
                            duration: 5 + Math.random() * 3,
                            repeat: Infinity,
                            delay: i * 0.4,
                            ease: "easeInOut",
                        }}
                        className="absolute rounded-full bg-white/20"
                        style={{
                            top: `${10 + Math.random() * 80}%`,
                            left: `${5 + Math.random() * 90}%`,
                            width: `${6 + Math.random() * 12}px`,
                            height: `${6 + Math.random() * 12}px`,
                        }}
                    />
                ))}
            </div>

            {/* Main Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 container mx-auto px-4 py-16 text-center"
            >
                {/* 404 Number with Animation */}
                <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    className="mb-8"
                >
                    <h1 className="text-[120px] sm:text-[180px] md:text-[220px] font-black leading-none">
                        <span className="bg-gradient-to-br from-white via-cyan to-teal bg-clip-text text-transparent inline-block"
                            style={{
                                textShadow: '0 0 80px rgba(78, 205, 196, 0.5)',
                                WebkitTextStroke: '2px rgba(255, 255, 255, 0.1)'
                            }}
                        >
                            404
                        </span>
                    </h1>
                </motion.div>

                {/* Message */}
                <motion.div variants={itemVariants} className="max-w-2xl mx-auto mb-12">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
                        style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
                    >
                        Oops! Page Not Found
                    </h2>
                    <p className="text-lg sm:text-xl text-white/80 mb-2"
                        style={{ textShadow: '0 1px 8px rgba(0,0,0,0.2)' }}
                    >
                        Looks like this job posting has been filled!
                    </p>
                    <p className="text-base text-white/60">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
                >
                    <Link to="/">
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(78, 205, 196, 0.4)" }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-3 px-8 py-4 bg-teal hover:bg-teal/90 text-white font-semibold rounded-full transition-all duration-300 shadow-lg"
                        >
                            <FiHome className="text-xl" />
                            <span>Back to Home</span>
                            <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <FiArrowRight className="text-xl" />
                            </motion.span>
                        </motion.button>
                    </Link>

                    <Link to="/jobs">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 border-2 border-white/30 text-white font-semibold rounded-full transition-all duration-300"
                        >
                            <FiBriefcase className="text-xl" />
                            <span>Browse Jobs</span>
                        </motion.button>
                    </Link>
                </motion.div>

                {/* Quick Links */}
                <motion.div variants={itemVariants} className="max-w-xl mx-auto">
                    <p className="text-sm text-white/50 mb-4">Or explore these pages:</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {[
                            { to: "/", label: "Home" },
                            { to: "/jobs", label: "Find Jobs" },
                            { to: "/about", label: "About Us" },
                            { to: "/add-job", label: "Post a Job" },
                        ].map((link, index) => (
                            <Link key={index} to={link.to}>
                                <motion.div
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    className="px-4 py-2 bg-white/5 backdrop-blur-sm hover:bg-white/10 border border-white/20 rounded-lg text-white/70 hover:text-white text-sm font-medium transition-all"
                                >
                                    {link.label}
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </motion.div>

                {/* Decorative Icon */}
                <motion.div
                    variants={itemVariants}
                    className="absolute left-1/2 bottom-8 -translate-x-1/2"
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
                    >
                        <FiSearch className="text-white/50 text-2xl" />
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default NotFoundPage;