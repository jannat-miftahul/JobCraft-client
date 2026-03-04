import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiTrash2, FiEye, FiUsers, FiMapPin, FiBriefcase, FiPlus, FiSearch,
    FiCalendar, FiDollarSign, FiMoreVertical, FiTrendingUp, FiCheckCircle
} from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/LoadingSpinner";

const MyPostedJobs = () => {
    const { user } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeDropdown, setActiveDropdown] = useState(null);

    useEffect(() => {
        fetch(`https://jobportal-server-side.vercel.app/jobs?email=${user.email}`)
            .then((res) => res.json())
            .then((data) => {
                setJobs(data);
                setLoading(false);
            })
            .catch((error) => {
                toast.error("Failed to load jobs");
                setLoading(false);
            });
    }, [user.email]);

    const filteredJobs = jobs.filter(
        (job) =>
            job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDeleteJob = (id) => {
        Swal.fire({
            title: "Delete this job?",
            text: "All applications for this job will also be removed.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#E63946",
            cancelButtonColor: "#64748B",
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://jobportal-server-side.vercel.app/jobs/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your job has been removed.",
                                icon: "success",
                                confirmButtonColor: "#457B9D",
                            });
                            setJobs(jobs.filter((job) => job._id !== id));
                        }
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                        toast.error("Failed to delete job");
                    });
            }
        });
        setActiveDropdown(null);
    };

    const getStatusConfig = (status) => {
        const configs = {
            active: {
                color: "bg-emerald/10 text-emerald border-emerald/20",
                dot: "bg-emerald",
                label: "Active",
            },
            closed: {
                color: "bg-slate/10 text-slate border-slate/20",
                dot: "bg-slate",
                label: "Closed",
            },
            draft: {
                color: "bg-amber/10 text-amber border-amber/20",
                dot: "bg-amber",
                label: "Draft",
            },
        };
        return configs[status] || configs.active;
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    // Calculate stats
    const totalApplications = jobs.reduce(
        (acc, job) => acc + (job.applicationCount || 0),
        0
    );
    const activeJobs = jobs.filter((j) => j.status === "active" || !j.status).length;

    return (
        <div className="min-h-screen bg-background py-8 sm:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-teal/10 rounded-full text-teal text-sm font-medium mb-2">
                                <FiBriefcase />
                                <span>Job Management</span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-primaryDark">
                                My Posted{" "}
                                <span className="bg-gradient-to-r from-teal to-emerald bg-clip-text text-transparent">
                                    Jobs
                                </span>
                            </h1>
                            <p className="text-slate mt-2">
                                Manage your job listings and track applications.
                            </p>
                        </div>

                        <Link
                            to="/add-job"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-teal to-emerald text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-teal/30 transition-all hover:scale-105"
                        >
                            <FiPlus className="w-5 h-5" />
                            <span>Post New Job</span>
                        </Link>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-primaryLight/10 rounded-xl flex items-center justify-center">
                                    <FiBriefcase className="text-xl text-primaryLight" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-primaryDark">
                                        {jobs.length}
                                    </p>
                                    <p className="text-xs text-slate">Total Jobs</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-emerald/10 rounded-xl flex items-center justify-center">
                                    <FiCheckCircle className="text-xl text-emerald" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-primaryDark">
                                        {activeJobs}
                                    </p>
                                    <p className="text-xs text-slate">Active</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-purple/10 rounded-xl flex items-center justify-center">
                                    <FiUsers className="text-xl text-purple" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-primaryDark">
                                        {totalApplications}
                                    </p>
                                    <p className="text-xs text-slate">Applications</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-coral/10 rounded-xl flex items-center justify-center">
                                    <FiTrendingUp className="text-xl text-coral" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-primaryDark">
                                        {jobs.length > 0
                                            ? Math.round(totalApplications / jobs.length)
                                            : 0}
                                    </p>
                                    <p className="text-xs text-slate">Avg/Job</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Search Bar */}
                    <div className="relative max-w-md">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search your jobs..."
                            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
                        />
                    </div>
                </motion.div>

                {/* Loading State */}
                {loading && <LoadingSpinner color="teal" text="Loading your jobs..." />}

                {/* Jobs Grid */}
                {!loading && filteredJobs.length > 0 && (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        {filteredJobs.map((job) => {
                            const statusConfig = getStatusConfig(job.status);

                            return (
                                <motion.div
                                    key={job._id}
                                    variants={itemVariants}
                                    className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-teal/20 transition-all duration-300 overflow-hidden"
                                >
                                    {/* Card Header */}
                                    <div className="p-5 sm:p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            {/* Company Logo */}
                                            <div className="w-14 h-14 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
                                                <img
                                                    src={job.company_logo}
                                                    alt={job.company}
                                                    className="w-8 h-8 object-contain"
                                                />
                                            </div>

                                            {/* Status & Menu */}
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${statusConfig.color}`}
                                                >
                                                    <span
                                                        className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`}
                                                    />
                                                    {statusConfig.label}
                                                </span>

                                                {/* Dropdown Menu */}
                                                <div className="relative">
                                                    <button
                                                        onClick={() =>
                                                            setActiveDropdown(
                                                                activeDropdown === job._id
                                                                    ? null
                                                                    : job._id
                                                            )
                                                        }
                                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                    >
                                                        <FiMoreVertical className="text-slate" />
                                                    </button>

                                                    <AnimatePresence>
                                                        {activeDropdown === job._id && (
                                                            <motion.div
                                                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                                                className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-10"
                                                            >
                                                                <Link
                                                                    to={`/jobs/${job._id}`}
                                                                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate hover:bg-gray-50 transition-colors"
                                                                >
                                                                    <FiEye className="w-4 h-4" />
                                                                    View Details
                                                                </Link>
                                                                <button
                                                                    onClick={() => handleDeleteJob(job._id)}
                                                                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-coral hover:bg-coral/10 transition-colors"
                                                                >
                                                                    <FiTrash2 className="w-4 h-4" />
                                                                    Delete Job
                                                                </button>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Job Info */}
                                        <h3 className="text-lg font-bold text-primaryDark group-hover:text-teal transition-colors mb-1 line-clamp-1">
                                            {job.title}
                                        </h3>
                                        <p className="text-slate text-sm mb-3">{job.company}</p>

                                        {/* Meta Info */}
                                        <div className="flex flex-wrap gap-2 text-xs text-slate mb-4">
                                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-50 rounded-lg">
                                                <FiMapPin className="w-3 h-3" />
                                                {job.location?.split(",")[0]}
                                            </span>
                                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-50 rounded-lg">
                                                <FiBriefcase className="w-3 h-3" />
                                                {job.jobType}
                                            </span>
                                            {job.salaryRange && (
                                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald/10 text-emerald rounded-lg">
                                                    <FiDollarSign className="w-3 h-3" />
                                                    {job.salaryRange.min?.toLocaleString()} -{" "}
                                                    {job.salaryRange.max?.toLocaleString()}
                                                </span>
                                            )}
                                        </div>

                                        {/* Applications Count */}
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 bg-purple/10 rounded-lg flex items-center justify-center">
                                                    <FiUsers className="text-purple text-sm" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-primaryDark">
                                                        {job.applicationCount || 0}
                                                    </p>
                                                    <p className="text-xs text-slate">Applications</p>
                                                </div>
                                            </div>

                                            <Link
                                                to={`/view-applications/${job._id}`}
                                                className="inline-flex items-center gap-1.5 px-4 py-2 bg-primaryDark hover:bg-teal text-white text-sm font-medium rounded-xl transition-all"
                                            >
                                                <FiEye className="w-4 h-4" />
                                                View
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Card Footer - Deadline */}
                                    {job.applicationDeadline && (
                                        <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center gap-2 text-xs text-slate">
                                            <FiCalendar className="w-3.5 h-3.5" />
                                            <span>Deadline: {job.applicationDeadline}</span>
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </motion.div>
                )}

                {/* Empty State */}
                {!loading && filteredJobs.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20"
                    >
                        <div className="w-24 h-24 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FiBriefcase className="text-4xl text-teal" />
                        </div>
                        <h3 className="text-2xl font-bold text-primaryDark mb-2">
                            {searchTerm ? "No matching jobs" : "No jobs posted yet"}
                        </h3>
                        <p className="text-slate mb-6">
                            {searchTerm
                                ? "Try a different search term"
                                : "Start by posting your first job listing!"}
                        </p>
                        <Link
                            to="/add-job"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal to-emerald text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-teal/30 transition-all"
                        >
                            <FiPlus />
                            <span>Post Your First Job</span>
                        </Link>
                    </motion.div>
                )}
            </div>

            {/* Click outside to close dropdown */}
            {activeDropdown && (
                <div
                    className="fixed inset-0 z-0"
                    onClick={() => setActiveDropdown(null)}
                />
            )}
        </div>
    );
};

export default MyPostedJobs;
