import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FiArrowRight, FiBriefcase } from "react-icons/fi";
import { Link } from "react-router-dom";
import team1 from "../../assets/team1.jpg";
import team2 from "../../assets/team2.jpg";

const Banner = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
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

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8, rotate: -5 },
        visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 80,
                damping: 15,
            },
        },
    };

    const badgeVariants = {
        hidden: { opacity: 0, scale: 0.5, x: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 150,
                damping: 12,
                delay: 0.6,
            },
        },
    };

    return (
        <div
            ref={containerRef}
            className="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-primaryDark via-primaryLight to-primaryDark"
        >
            {/* Subtle Background Orbs */}
            <motion.div className="absolute inset-0 overflow-hidden" style={{ opacity }}>
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-teal rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute -bottom-40 -left-40 w-[700px] h-[700px] bg-coral rounded-full blur-3xl"
                />
            </motion.div>

            {/* Main Content */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Left Content */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex-1 text-center lg:text-left order-2 lg:order-1"
                    >
                        {/* Main Heading */}
                        <motion.h1
                            variants={itemVariants}
                            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
                            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
                        >
                            Craft Your
                            <br />
                            <span className="relative inline-block">
                                <motion.span
                                    className="bg-gradient-to-r from-cyan via-teal to-amber bg-clip-text text-transparent"
                                    animate={{
                                        backgroundPosition: ['0% center', '100% center'],
                                    }}
                                    transition={{
                                        duration: 5,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        ease: "easeInOut"
                                    }}
                                    style={{ backgroundSize: '200% auto', filter: 'brightness(1.3) saturate(1.2)' }}
                                >
                                    Perfect Career
                                </motion.span>
                            </span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            variants={itemVariants}
                            className="text-xl text-white mb-10 max-w-xl mx-auto lg:mx-0"
                            style={{ textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}
                        >
                            Discover thousands of opportunities from top companies.
                            Your next career move starts here.
                        </motion.p>

                        {/* CTA Button */}
                        <motion.div
                            variants={itemVariants}
                            className="flex gap-4 justify-center lg:justify-start mb-12"
                        >
                            <Link to="/jobs">
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(78, 205, 196, 0.4)" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-teal hover:bg-teal/90 text-white font-semibold rounded-full transition-all duration-300 flex items-center gap-3 text-lg shadow-lg"
                                >
                                    Browse Jobs
                                    <motion.span
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        <FiArrowRight className="text-xl" />
                                    </motion.span>
                                </motion.button>
                            </Link>

                            <Link to="/add-job">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 border-2 border-white/30 text-white font-semibold rounded-full transition-all duration-300 flex items-center gap-3 text-lg"
                                >
                                    Post a Job
                                    <FiBriefcase className="text-xl" />
                                </motion.button>
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Images with Parallax */}
                    <div className="flex-1 order-1 lg:order-2 w-full max-w-md lg:max-w-none">
                        <div className="relative h-[400px] sm:h-[500px] lg:h-[550px]">
                            {/* Main Image */}
                            <motion.div
                                variants={imageVariants}
                                initial="hidden"
                                animate="visible"
                                style={{ y: y1 }}
                                className="absolute top-0 right-0 lg:right-10 w-56 sm:w-64 lg:w-80"
                            >
                                <motion.div
                                    animate={{ y: [-10, 10, -10] }}
                                    transition={{
                                        duration: 6,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                >
                                    <motion.img
                                        whileHover={{ scale: 1.05, rotate: 2 }}
                                        src={team1}
                                        alt="Team collaboration"
                                        className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-3xl shadow-2xl border-4 border-white/20"
                                    />
                                </motion.div>

                                {/* Floating Badge */}
                                <motion.div
                                    variants={badgeVariants}
                                    initial="hidden"
                                    animate="visible"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-5 py-3 shadow-xl cursor-pointer"
                                >
                                    <motion.div
                                        animate={{ y: [-2, 2, -2] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="w-10 h-10 bg-teal/20 rounded-full flex items-center justify-center">
                                            <FiBriefcase className="text-teal text-lg" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate font-medium">New Jobs</p>
                                            <p className="font-bold text-primaryDark">+250 Today</p>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </motion.div>

                            {/* Secondary Image */}
                            <motion.div
                                variants={imageVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: 0.3 }}
                                style={{ y: y2 }}
                                className="absolute bottom-0 left-0 lg:left-10 w-56 sm:w-64 lg:w-80"
                            >
                                <motion.div
                                    animate={{ y: [10, -10, 10] }}
                                    transition={{
                                        duration: 7,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                >
                                    <motion.img
                                        whileHover={{ scale: 1.05, rotate: -2 }}
                                        src={team2}
                                        alt="Professional team"
                                        className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-3xl shadow-2xl border-4 border-white/20"
                                    />
                                </motion.div>

                                {/* Success Badge */}
                                <motion.div
                                    variants={badgeVariants}
                                    initial="hidden"
                                    animate="visible"
                                    whileHover={{ scale: 1.1, rotate: -5 }}
                                    className="absolute -top-4 -right-4 bg-white rounded-2xl px-5 py-3 shadow-xl cursor-pointer"
                                >
                                    <motion.div
                                        animate={{ y: [2, -2, 2] }}
                                        transition={{ duration: 2.5, repeat: Infinity }}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="flex -space-x-2">
                                            {[
                                                { bg: 'bg-teal' },
                                                { bg: 'bg-coral' },
                                                { bg: 'bg-purple' }
                                            ].map((item, i) => (
                                                <motion.div
                                                    key={i}
                                                    animate={{ scale: [1, 1.1, 1] }}
                                                    transition={{
                                                        duration: 1,
                                                        repeat: Infinity,
                                                        delay: i * 0.2
                                                    }}
                                                    className={`w-8 h-8 ${item.bg} rounded-full border-2 border-white`}
                                                />
                                            ))}
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate font-medium">Success Rate</p>
                                            <p className="font-bold text-primaryDark">95%</p>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </motion.div>

                            {/* Decorative Ring */}
                            <motion.div
                                animate={{
                                    rotate: 360,
                                    scale: [1, 1.05, 1]
                                }}
                                transition={{
                                    rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                                    scale: { duration: 5, repeat: Infinity }
                                }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 border-2 border-dashed border-white/10 rounded-full pointer-events-none"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Wave */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg
                    viewBox="0 0 1440 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full"
                >
                    <path
                        d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                        fill="#FAFAFA"
                    />
                </svg>
            </div>
        </div>
    );
};

export default Banner;
