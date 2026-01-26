import { motion } from "framer-motion";

const LoadingSpinner = ({ size = "medium", color = "purple", text = "" }) => {
    const sizes = {
        small: {
            container: "w-12 h-12",
            ring1: "w-12 h-12 border-2",
            ring2: "w-10 h-10 border-2",
            ring3: "w-8 h-8 border-[1.5px]",
            dots: "w-1 h-1",
        },
        medium: {
            container: "w-20 h-20",
            ring1: "w-20 h-20 border-4",
            ring2: "w-16 h-16 border-3",
            ring3: "w-12 h-12 border-2",
            dots: "w-1.5 h-1.5",
        },
        large: {
            container: "w-28 h-28",
            ring1: "w-28 h-28 border-4",
            ring2: "w-24 h-24 border-3",
            ring3: "w-20 h-20 border-2",
            dots: "w-2 h-2",
        },
    };

    const colors = {
        purple: {
            primary: "#6C5CE7",
            secondary: "#5C6BC0",
            light: "rgba(108, 92, 231, 0.2)",
            gradient: "from-purple via-indigo to-purple",
        },
        teal: {
            primary: "#4ECDC4",
            secondary: "#2D9B83",
            light: "rgba(78, 205, 196, 0.2)",
            gradient: "from-teal via-emerald to-teal",
        },
        accent: {
            primary: "#E63946",
            secondary: "#FF6B6B",
            light: "rgba(230, 57, 70, 0.2)",
            gradient: "from-accent via-coral to-accent",
        },
        primaryDark: {
            primary: "#1D3557",
            secondary: "#457B9D",
            light: "rgba(29, 53, 87, 0.2)",
            gradient: "from-primaryDark via-primaryLight to-primaryDark",
        },
        primaryLight: {
            primary: "#457B9D",
            secondary: "#4ECDC4",
            light: "rgba(69, 123, 157, 0.2)",
            gradient: "from-primaryLight via-teal to-primaryLight",
        },
    };

    const sizeConfig = sizes[size];
    const colorConfig = colors[color];

    return (
        <div className="flex flex-col justify-center items-center py-20">
            <div className={`relative ${sizeConfig.container}`}>
                {/* Pulsing Background Glow */}
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className={`absolute inset-0 rounded-full blur-xl`}
                    style={{ backgroundColor: colorConfig.light }}
                />

                {/* Outer Spinning Ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className={`absolute top-0 left-0 ${sizeConfig.ring1} rounded-full`}
                    style={{
                        borderColor: colorConfig.light,
                        borderTopColor: colorConfig.primary,
                        borderRightColor: colorConfig.primary,
                    }}
                />

                {/* Middle Counter-Spinning Ring */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${sizeConfig.ring2} rounded-full`}
                    style={{
                        borderColor: colorConfig.light,
                        borderTopColor: colorConfig.secondary,
                        borderLeftColor: colorConfig.secondary,
                    }}
                />

                {/* Inner Fast Spinning Ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${sizeConfig.ring3} rounded-full`}
                    style={{
                        borderColor: colorConfig.light,
                        borderTopColor: colorConfig.primary,
                    }}
                />

                {/* Center Pulsing Dot */}
                <motion.div
                    animate={{
                        scale: [0.8, 1.2, 0.8],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${sizeConfig.dots} rounded-full`}
                    style={{ backgroundColor: colorConfig.primary }}
                />

                {/* Orbiting Dots */}
                {[0, 120, 240].map((angle, index) => (
                    <motion.div
                        key={angle}
                        animate={{
                            rotate: 360,
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                            delay: index * 0.3,
                        }}
                        className="absolute inset-0"
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.6, 1, 0.6],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: index * 0.2,
                            }}
                            className={`absolute ${sizeConfig.dots} rounded-full top-0 left-1/2 -translate-x-1/2`}
                            style={{
                                backgroundColor: colorConfig.primary,
                                boxShadow: `0 0 10px ${colorConfig.primary}`,
                            }}
                        />
                    </motion.div>
                ))}
            </div>

            {/* Loading Text */}
            {text && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 text-center"
                >
                    <p className="text-slate font-medium mb-2">{text}</p>

                    {/* Animated Dots */}
                    <div className="flex items-center justify-center gap-1">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    y: [0, -8, 0],
                                    opacity: [0.3, 1, 0.3],
                                }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    delay: i * 0.15,
                                    ease: "easeInOut",
                                }}
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: colorConfig.primary }}
                            />
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default LoadingSpinner;
