import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiTrash2, FiExternalLink, FiMapPin, FiBriefcase, FiClock,
    FiSearch, FiFileText, FiCheckCircle, FiXCircle, FiAlertCircle
} from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";

const MyApplications = () => {
    const { user } = useAuth();
    const [applications, setApplications] = useState([]);
    const [filteredApplications, setFilteredApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure
            .get(`/job-applications?email=${user.email}`)
            .then((res) => {
                setApplications(res.data);
                setFilteredApplications(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [user.email, axiosSecure]);


    const handleDeleteApplication = (id) => {
        Swal.fire({
            title: "Withdraw Application?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#E63946",
            cancelButtonColor: "#64748B",
            confirmButtonText: "Yes, withdraw it",
            cancelButtonText: "Keep it",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .delete(`/job-applications/${id}`)
                    .then((res) => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Withdrawn!",
                                text: "Your application has been withdrawn.",
                                icon: "success",
                                confirmButtonColor: "#457B9D",
                            });
                            setApplications(
                                applications.filter((app) => app._id !== id)
                            );
                        }
                    })
                    .catch((error) => console.error("Error:", error));
            }
        });
    };


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
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple/10 rounded-full text-purple text-sm font-medium mb-2">
                                <FiFileText />
                                <span>My Applications</span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-primaryDark">
                                Track Your{" "}
                                <span className="bg-gradient-to-r from-purple to-indigo bg-clip-text text-transparent">
                                    Applications
                                </span>
                            </h1>
                            <p className="text-slate mt-2">
                                Monitor the status of your job applications in one place.
                            </p>
                        </div>

                        {/* Stats Cards */}
                        <div className="flex gap-3">
                            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center min-w-[100px]">
                                <p className="text-3xl font-bold text-primaryDark">
                                    {applications.length}
                                </p>
                                <p className="text-xs text-slate">Total</p>
                            </div>
                            <div className="bg-emerald/10 rounded-2xl p-4 text-center min-w-[100px]">
                                <p className="text-3xl font-bold text-emerald">
                                    {applications.filter((a) => a.status === "accepted").length}
                                </p>
                                <p className="text-xs text-emerald">Accepted</p>
                            </div>
                        </div>
                    </div>

                    {/* Search & Filter Bar */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1 relative">
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by job title or company..."
                                className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-purple focus:ring-2 focus:ring-purple/20 transition-all"
                            />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-purple cursor-pointer"
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="reviewed">Under Review</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                </motion.div>

                {/* Loading State */}
                {loading && <LoadingSpinner color="purple" text="Loading your applications..." />}

                {/* Applications List */}
                {!loading && filteredApplications.length > 0 && (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-4"
                    >
                        {filteredApplications.map((application) => {
                            const statusConfig = getStatusConfig(application.status);
                            const StatusIcon = statusConfig.icon;

                            return (
                                <motion.div
                                    key={application._id}
                                    variants={itemVariants}
                                    className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-purple/20 transition-all duration-300 overflow-hidden"
                                >
                                    <div className="p-5 sm:p-6">
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            {/* Company Logo */}
                                            <div className="flex-shrink-0">
                                                <div className="w-16 h-16 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
                                                    <img
                                                        src={application.company_logo}
                                                        alt={application.company}
                                                        className="w-10 h-10 object-contain"
                                                    />
                                                </div>
                                            </div>

                                            {/* Job Details */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                                                    <div>
                                                        <h3 className="text-lg font-bold text-primaryDark group-hover:text-purple transition-colors">
                                                            {application.title}
                                                        </h3>
                                                        <p className="text-slate font-medium">
                                                            {application.company}
                                                        </p>
                                                    </div>

                                                    {/* Status Badge */}
                                                    <div
                                                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-medium ${statusConfig.color}`}
                                                    >
                                                        <StatusIcon className="w-4 h-4" />
                                                        <span>{statusConfig.label}</span>
                                                    </div>
                                                </div>

                                                {/* Meta Info */}
                                                <div className="flex flex-wrap items-center gap-4 text-sm text-slate mb-3">
                                                    <span className="flex items-center gap-1.5">
                                                        <FiMapPin className="w-4 h-4" />
                                                        {application.location}
                                                    </span>
                                                    <span className="flex items-center gap-1.5">
                                                        <FiBriefcase className="w-4 h-4" />
                                                        {application.jobType}
                                                    </span>
                                                    {application.category && (
                                                        <span className="px-2 py-0.5 bg-gray-100 rounded-md text-xs">
                                                            {application.category}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Actions */}
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <Link
                                                        to={`/jobs/${application.job_id}`}
                                                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-primaryDark hover:bg-primaryLight text-white text-sm font-medium rounded-xl transition-colors"
                                                    >
                                                        <FiExternalLink className="w-4 h-4" />
                                                        View Job
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteApplication(application._id)
                                                        }
                                                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-coral/10 hover:bg-coral text-coral hover:text-white text-sm font-medium rounded-xl transition-all"
                                                    >
                                                        <FiTrash2 className="w-4 h-4" />
                                                        Withdraw
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Progress Bar (for pending/reviewed) */}
                                    {(application.status === "pending" ||
                                        application.status === "reviewed") && (
                                            <div className="h-1 bg-gray-100">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{
                                                        width:
                                                            application.status === "pending"
                                                                ? "25%"
                                                                : "60%",
                                                    }}
                                                    transition={{ duration: 1, delay: 0.3 }}
                                                    className={`h-full ${application.status === "pending"
                                                        ? "bg-amber"
                                                        : "bg-blue-500"
                                                        }`}
                                                />
                                            </div>
                                        )}
                                </motion.div>
                            );
                        })}
                    </motion.div>
                )}

        
            </div>
        </div>
    );
};

export default MyApplications;
