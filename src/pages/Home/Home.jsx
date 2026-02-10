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

            {/* Hot Jobs Section */}
            <HotJobs />


        </div>
    );
};

export default Home;
