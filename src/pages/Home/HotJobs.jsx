import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiOutlineFire, HiOutlineSparkles } from "react-icons/hi";
import { FiArrowRight } from "react-icons/fi";
import JobCard from "./JobCard";
import LoadingSpinner from "../../components/LoadingSpinner";

const HotJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://jobportal-server-side.vercel.app/jobs")
            .then((res) => res.json())
            .then((data) => {
                // Sort by date (newest first) and take only 8 jobs for 2 rows
                const sortedJobs = data
                    .sort((a, b) => new Date(b.createdAt || b.deadline) - new Date(a.createdAt || a.deadline))
                    .slice(0, 8)
                    .map((job) => ({
                        ...job,
                        salaryRange: job.salaryRange
                            ? {
                                ...job.salaryRange,
                                min: Number(job.salaryRange.min),
                                max: Number(job.salaryRange.max),
                            }
                            : job.salaryRange,
                    }));
                setJobs(sortedJobs);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <section className="bg-background py-16 sm:py-20 lg:py-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header - Centered */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 lg:mb-16"
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent text-sm font-medium mb-4">
                        <HiOutlineFire className="text-lg" />
                        <span>Trending Now</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primaryDark mb-4">
                        Hot{" "}
                        <span className="bg-gradient-to-r from-accent to-orange-500 bg-clip-text text-transparent">
                            Job Openings
                        </span>
                    </h2>

                    {/* Description */}
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Explore the most recent opportunities from leading companies.
                        Your perfect job is just a click away.
                    </p>
                </motion.div>

                {/* Loading State */}
                {loading && <LoadingSpinner color="accent" text="Loading hot jobs..." />}

                {/* Jobs Grid - 4 columns x 2 rows = 8 jobs */}
                {!loading && jobs.length > 0 && (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
                    >
                        {jobs.map((job) => (
                            <motion.div key={job._id} variants={itemVariants}>
                                <JobCard job={job} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Empty State */}
                {!loading && jobs.length === 0 && (
                    <div className="text-center py-20">
                        <HiOutlineSparkles className="text-6xl text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600">
                            No jobs available at the moment
                        </h3>
                        <p className="text-gray-400 mt-2">
                            Check back later for new opportunities!
                        </p>
                    </div>
                )}

                {/* View All Button - Bottom Center */}
                {!loading && jobs.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-center mt-12"
                    >
                        <Link
                            to="/jobs"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-primaryDark hover:bg-primaryLight text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-primaryDark/20 hover:scale-105 group"
                        >
                            <span>View All Jobs</span>
                            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default HotJobs;
