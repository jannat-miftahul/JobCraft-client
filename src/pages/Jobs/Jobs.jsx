import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiMapPin, FiFilter, FiGrid, FiList, FiChevronDown, FiX, FiBriefcase } from "react-icons/fi";
import JobCard from "../Home/JobCard";
import LoadingSpinner from "../../components/LoadingSpinner";

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState("grid");
    const [searchTerm, setSearchTerm] = useState("");
    const [locationFilter, setLocationFilter] = useState("");
    const [jobTypeFilter, setJobTypeFilter] = useState("");
    const [showFilters, setShowFilters] = useState(false);

    const jobTypes = [
        "All Types",
        "Full-time",
        "Part-time",
        "Remote",
        "Contract",
        "Internship",
    ];

    useEffect(() => {
        fetch("https://jobportal-server-side.vercel.app/jobs")
            .then((res) => res.json())
            .then((data) => {
                setJobs(data);
                setFilteredJobs(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    useEffect(() => {
        let result = jobs;

        if (searchTerm) {
            result = result.filter(
                (job) =>
                    job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    job.company?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (locationFilter) {
            result = result.filter((job) =>
                job.location?.toLowerCase().includes(locationFilter.toLowerCase())
            );
        }

        if (jobTypeFilter && jobTypeFilter !== "All Types") {
            result = result.filter((job) => job.jobType === jobTypeFilter);
        }

        setFilteredJobs(result);
    }, [searchTerm, locationFilter, jobTypeFilter, jobs]);

    const clearFilters = () => {
        setSearchTerm("");
        setLocationFilter("");
        setJobTypeFilter("");
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-purple via-indigo to-primaryDark py-16 sm:py-20 lg:py-24 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 8, repeat: Infinity }}
                        className="absolute top-10 right-10 w-72 h-72 bg-teal/30 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 10, repeat: Infinity }}
                        className="absolute bottom-0 left-0 w-96 h-96 bg-coral/20 rounded-full blur-3xl"
                    />
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm mb-6">
                            <FiBriefcase className="text-teal" />
                            <span>{jobs.length}+ Jobs Available</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Find Your{" "}
                            <span className="bg-gradient-to-r from-teal via-cyan to-emerald bg-clip-text text-transparent">
                                Dream Job
                            </span>
                        </h1>

                        <p className="text-lg text-white/70 mb-8">
                            Explore thousands of job opportunities from top companies worldwide.
                            Your next career move is just a search away.
                        </p>

                        {/* Search Box */}
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4">
                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="flex-1 flex items-center gap-3 bg-white rounded-xl px-4 py-3">
                                    <FiSearch className="text-slate text-xl flex-shrink-0" />
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Job title or company..."
                                        className="w-full bg-transparent outline-none text-gray-700 placeholder-slate"
                                    />
                                </div>
                                <div className="flex-1 flex items-center gap-3 bg-white rounded-xl px-4 py-3">
                                    <FiMapPin className="text-slate text-xl flex-shrink-0" />
                                    <input
                                        type="text"
                                        value={locationFilter}
                                        onChange={(e) => setLocationFilter(e.target.value)}
                                        placeholder="Location..."
                                        className="w-full bg-transparent outline-none text-gray-700 placeholder-slate"
                                    />
                                </div>
                                <button className="flex items-center justify-center gap-2 bg-teal hover:bg-emerald text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-teal/30">
                                    <FiSearch className="text-lg" />
                                    <span>Search</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Wave */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 100" fill="none" className="w-full">
                        <path
                            d="M0 100L60 90C120 80 240 60 360 50C480 40 600 40 720 45C840 50 960 60 1080 65C1200 70 1320 70 1380 70L1440 70V100H0Z"
                            fill="#FAFAFA"
                        />
                    </svg>
                </div>
            </section>

            {/* Filters & Results Section */}
            <section className="py-8 sm:py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Filter Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-wrap items-center justify-between gap-4 mb-8"
                    >
                        {/* Left - Results Count & Filter Toggle */}
                        <div className="flex items-center gap-4">
                            <p className="text-slate">
                                Showing{" "}
                                <span className="font-semibold text-primaryDark">
                                    {filteredJobs.length}
                                </span>{" "}
                                jobs
                            </p>
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-slate hover:border-purple transition-colors"
                            >
                                <FiFilter />
                                Filters
                            </button>
                        </div>

                        {/* Right - View Mode & Sort */}
                        <div className="flex items-center gap-3">
                            {/* Job Type Filter */}
                            <div className="hidden lg:block relative">
                                <select
                                    value={jobTypeFilter}
                                    onChange={(e) => setJobTypeFilter(e.target.value)}
                                    className="appearance-none px-4 py-2.5 pr-10 bg-white border border-gray-200 rounded-xl text-slate focus:border-purple focus:ring-2 focus:ring-purple/20 outline-none cursor-pointer"
                                >
                                    {jobTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate pointer-events-none" />
                            </div>

                            {/* Clear Filters */}
                            {(searchTerm || locationFilter || jobTypeFilter) && (
                                <button
                                    onClick={clearFilters}
                                    className="flex items-center gap-1 px-3 py-2 text-coral hover:bg-coral/10 rounded-lg transition-colors"
                                >
                                    <FiX />
                                    Clear
                                </button>
                            )}

                            {/* View Toggle */}
                            <div className="hidden sm:flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`p-2.5 transition-colors ${viewMode === "grid"
                                        ? "bg-purple text-white"
                                        : "text-slate hover:bg-gray-50"
                                        }`}
                                >
                                    <FiGrid />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`p-2.5 transition-colors ${viewMode === "list"
                                        ? "bg-purple text-white"
                                        : "text-slate hover:bg-gray-50"
                                        }`}
                                >
                                    <FiList />
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Mobile Filters */}
                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="lg:hidden mb-6 p-4 bg-white rounded-2xl border border-gray-100"
                        >
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-slate mb-2 block">
                                        Job Type
                                    </label>
                                    <select
                                        value={jobTypeFilter}
                                        onChange={(e) => setJobTypeFilter(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none"
                                    >
                                        {jobTypes.map((type) => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Loading State */}
                    {loading && <LoadingSpinner color="purple" text="Loading jobs..." />}

                    {/* Jobs Grid */}
                    {!loading && filteredJobs.length > 0 && (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className={`grid gap-4 sm:gap-6 ${viewMode === "grid"
                                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                                : "grid-cols-1"
                                }`}
                        >
                            {filteredJobs.map((job) => (
                                <motion.div key={job._id} variants={itemVariants}>
                                    <JobCard job={job} />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {/* No Results */}
                    {!loading && filteredJobs.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-20"
                        >
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FiSearch className="text-4xl text-slate" />
                            </div>
                            <h3 className="text-2xl font-bold text-primaryDark mb-2">
                                No jobs found
                            </h3>
                            <p className="text-slate mb-6">
                                Try adjusting your search or filter criteria
                            </p>
                            <button
                                onClick={clearFilters}
                                className="px-6 py-3 bg-purple hover:bg-indigo text-white font-medium rounded-xl transition-all duration-300"
                            >
                                Clear All Filters
                            </button>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-teal via-emerald to-teal">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                            Can&apos;t find what you&apos;re looking for?
                        </h2>
                        <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                            Create a job alert and we&apos;ll notify you when new opportunities
                            matching your criteria are posted.
                        </p>
                        <button className="px-8 py-4 bg-white text-emerald font-semibold rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105">
                            Create Job Alert
                        </button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Jobs;
