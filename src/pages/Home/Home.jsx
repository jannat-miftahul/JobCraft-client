import { motion } from "framer-motion";
import { FiUsers, FiBriefcase, FiTrendingUp, FiShield, FiZap, FiTarget } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi";
import Banner from "./Banner";
import HotJobs from "./HotJobs";

const Home = () => {
    const features = [
        {
            icon: FiBriefcase,
            title: "10,000+ Jobs",
            description:
                "Access thousands of job opportunities from verified employers worldwide.",
            color: "bg-blue-500",
        },
        {
            icon: FiUsers,
            title: "Top Companies",
            description:
                "Connect with leading companies actively looking for talent like you.",
            color: "bg-purple-500",
        },
        {
            icon: FiTrendingUp,
            title: "Career Growth",
            description:
                "Find positions that match your skills and accelerate your career path.",
            color: "bg-green-500",
        },
        {
            icon: FiShield,
            title: "Verified Listings",
            description:
                "All job postings are verified to ensure authenticity and safety.",
            color: "bg-orange-500",
        },
    ];

    const steps = [
        {
            step: "01",
            title: "Create Profile",
            description:
                "Sign up and build your professional profile in minutes.",
            icon: FiUsers,
        },
        {
            step: "02",
            title: "Search Jobs",
            description:
                "Browse through thousands of job listings filtered for you.",
            icon: FiTarget,
        },
        {
            step: "03",
            title: "Apply & Get Hired",
            description:
                "Submit applications and land your dream job faster.",
            icon: FiZap,
        },
    ];

    return (
        <div className="bg-background">
            {/* Hero Banner */}
            <Banner />

            {/* Features Section */}
            <section className="py-16 sm:py-20 lg:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primaryLight/10 rounded-full text-primaryLight text-sm font-medium mb-4">
                            <HiOutlineSparkles />
                            <span>Why Choose JobCraft</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-primaryDark">
                            Everything You Need to{" "}
                            <span className="text-gradient">Land Your Dream Job</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                                className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-transparent hover:shadow-xl hover:shadow-gray-100 transition-all duration-300"
                            >
                                <div
                                    className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                                >
                                    <feature.icon className="text-white text-2xl" />
                                </div>
                                <h3 className="text-xl font-bold text-primaryDark mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-500">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-primaryDark to-primaryLight relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                    />
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12 lg:mb-16"
                    >
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                            How It Works
                        </h2>
                        <p className="text-white/70 text-lg max-w-2xl mx-auto">
                            Getting started with JobCraft is simple. Follow
                            these three easy steps to begin your journey.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.2,
                                }}
                                className="relative text-center"
                            >
                                {/* Connector Line */}
                                {index < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-white/20">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: "100%" }}
                                            viewport={{ once: true }}
                                            transition={{
                                                duration: 0.8,
                                                delay: 0.5 + index * 0.2,
                                            }}
                                            className="h-full bg-accent"
                                        />
                                    </div>
                                )}

                                {/* Step Number */}
                                <div className="relative inline-block mb-6">
                                    <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                                        <step.icon className="text-5xl text-white" />
                                    </div>
                                    <span className="absolute -top-2 -right-2 w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                                        {step.step}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-white/70">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Hot Jobs Section */}
            <HotJobs />

            {/* CTA Section */}
            <section className="py-16 sm:py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative bg-gradient-to-r from-primaryDark via-primaryLight to-primaryDark rounded-3xl p-8 sm:p-12 lg:p-16 text-center overflow-hidden"
                    >
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

                        <div className="relative z-10">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                                Ready to Craft Your Career?
                            </h2>
                            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                                Join thousands of professionals who have found
                                their dream jobs through JobCraft. Your next
                                opportunity is waiting!
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button className="px-8 py-4 bg-accent hover:bg-accent/90 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-accent/30">
                                    Get Started Free
                                </button>
                                <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl backdrop-blur-sm border border-white/20 transition-all duration-300">
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;
