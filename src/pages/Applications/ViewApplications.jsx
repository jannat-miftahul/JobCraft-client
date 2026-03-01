import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLoaderData } from "react-router-dom";
import {
    FiMail, FiLinkedin, FiGithub, FiFileText, FiClock, FiUsers, FiFilter, FiSearch,
    FiExternalLink, FiChevronDown, FiCheckCircle, FiAlertCircle, FiXCircle
} from "react-icons/fi";
import toast from "react-hot-toast";

const ViewApplications = () => {
    const loadedApplications = useLoaderData();
    const [applications, setApplications] = useState(loadedApplications);
    const [filter, setFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const handleStatusUpdate = (e, id) => {
        const newStatus = e.target.value;
        const data = { status: newStatus };

        fetch(`https://jobportal-server-side.vercel.app/job-applications/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((responseData) => {
                if (responseData.modifiedCount) {
                    // Update local state to reflect the change
                    setApplications((prevApps) =>
                        prevApps.map((app) =>
                            app._id === id ? { ...app, status: newStatus } : app
                        )
                    );

                    toast.success(`Status updated to "${getStatusConfig(newStatus).label}"`, {
                        icon: "✅",
                        style: {
                            borderRadius: "12px",
                            background: "#333",
                            color: "#fff",
                        },
                    });
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                toast.error("Failed to update status");
            });
    };

    const getStatusConfig = (status) => {
        const configs = {
            pending: {
                color: "bg-amber/10 text-amber border-amber/20",
                icon: FiClock,
                label: "Pending",
            },
            reviewed: {
                color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
                icon: FiAlertCircle,
                label: "Under Review",
            },
            accepted: {
                color: "bg-emerald/10 text-emerald border-emerald/20",
                icon: FiCheckCircle,
                label: "Accepted",
            },
            rejected: {
                color: "bg-coral/10 text-coral border-coral/20",
                icon: FiXCircle,
                label: "Rejected",
            },
        };
        return configs[status] || configs.pending;
    };

    // Filter and search logic
    const filteredApplications = applications.filter((app) => {
        const matchesFilter = filter === "all" || app.status === filter;
        const matchesSearch =
            app.application_email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.linkedin?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.github?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const statusCounts = {
        all: applications.length,
        pending: applications.filter((a) => a.status === "pending").length,
        reviewed: applications.filter((a) => a.status === "reviewed").length,
        accepted: applications.filter((a) => a.status === "accepted").length,
        rejected: applications.filter((a) => a.status === "rejected").length,
    };

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
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
            },
        },
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
            {/* Background Decorations */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple/10 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple to-indigo rounded-2xl flex items-center justify-center shadow-lg">
                            <FiUsers className="text-white text-2xl" />
                        </div>
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primaryDark to-purple bg-clip-text text-transparent">
                                Job Applications
                            </h1>
                            <p className="text-slate text-sm mt-1">
                                Manage and review all applications for your job postings
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6"
                >
                    {[
                        { key: "all", label: "Total", color: "from-primaryDark to-primaryLight", icon: FiUsers },
                        { key: "pending", label: "Pending", color: "from-amber to-orange", icon: FiClock },
                        { key: "reviewed", label: "Under Review", color: "from-blue-500 to-blue-600", icon: FiAlertCircle },
                        { key: "accepted", label: "Accepted", color: "from-emerald to-teal", icon: FiCheckCircle },
                        { key: "rejected", label: "Rejected", color: "from-coral to-red-400", icon: FiXCircle },
                    ].map((stat) => (
                        <motion.button
                            key={stat.key}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setFilter(stat.key)}
                            className={`relative overflow-hidden rounded-2xl p-4 transition-all duration-300 ${filter === stat.key
                                ? "bg-white shadow-lg border-2 border-purple"
                                : "bg-white/80 backdrop-blur-sm border-2 border-transparent hover:border-gray-200"
                                }`}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5`} />
                            <div className="relative">
                                <div className={`inline-flex p-2 rounded-xl bg-gradient-to-br ${stat.color} mb-2`}>
                                    <stat.icon className="text-white text-lg" />
                                </div>
                                <p className="text-2xl font-bold text-primaryDark">{statusCounts[stat.key]}</p>
                                <p className="text-xs text-slate font-medium">{stat.label}</p>
                            </div>
                        </motion.button>
                    ))}
                </motion.div>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6"
                >
                    <div className="relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate text-xl" />
                        <input
                            type="text"
                            placeholder="Search by email, LinkedIn, or GitHub..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl pl-12 pr-4 py-4 text-primaryDark placeholder-slate/50 focus:outline-none focus:border-purple focus:ring-4 focus:ring-purple/10 transition-all"
                        />
                    </div>
                </motion.div>

                {/* Applications List */}
                <AnimatePresence mode="popLayout">
                    {filteredApplications.length > 0 ? (
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
                                        layout
                                        className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-xl border-2 border-gray-100 hover:border-purple/20 transition-all duration-300"
                                    >
                                        {/* Header */}
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-purple to-indigo rounded-xl flex items-center justify-center text-white font-bold text-sm">
                                                        {application.application_email?.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <FiMail className="text-slate text-sm" />
                                                            <span className="font-semibold text-primaryDark">
                                                                {application.application_email}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Status Badge */}
                                            <div
                                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border-2 font-medium text-sm ${statusConfig.color}`}
                                            >
                                                <StatusIcon className="text-base" />
                                                <span>{statusConfig.label}</span>
                                            </div>
                                        </div>

                                        {/* Details Grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                            {/* LinkedIn */}
                                            {application.linkedin && (
                                                <a
                                                    href={application.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors group/link"
                                                >
                                                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                                        <FiLinkedin className="text-white" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs text-slate font-medium">LinkedIn</p>
                                                        <p className="text-sm text-primaryDark truncate">
                                                            {application.linkedin.replace("https://", "")}
                                                        </p>
                                                    </div>
                                                    <FiExternalLink className="text-slate opacity-0 group-hover/link:opacity-100 transition-opacity flex-shrink-0" />
                                                </a>
                                            )}

                                            {/* GitHub */}
                                            {application.github && (
                                                <a
                                                    href={application.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group/link"
                                                >
                                                    <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                                                        <FiGithub className="text-white" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs text-slate font-medium">GitHub</p>
                                                        <p className="text-sm text-primaryDark truncate">
                                                            {application.github.replace("https://", "")}
                                                        </p>
                                                    </div>
                                                    <FiExternalLink className="text-slate opacity-0 group-hover/link:opacity-100 transition-opacity flex-shrink-0" />
                                                </a>
                                            )}

                                            {/* Resume */}
                                            {application.resume && (
                                                <a
                                                    href={application.resume}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors group/link"
                                                >
                                                    <div className="w-10 h-10 bg-gradient-to-br from-purple to-indigo rounded-lg flex items-center justify-center flex-shrink-0">
                                                        <FiFileText className="text-white" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs text-slate font-medium">Resume</p>
                                                        <p className="text-sm text-primaryDark font-semibold">View Resume</p>
                                                    </div>
                                                    <FiExternalLink className="text-slate opacity-0 group-hover/link:opacity-100 transition-opacity flex-shrink-0" />
                                                </a>
                                            )}
                                        </div>

                                        {/* Cover Letter */}
                                        {application.coverLetter && (
                                            <div className="mb-4 p-4 bg-gray-50 rounded-xl">
                                                <p className="text-xs font-semibold text-slate uppercase tracking-wide mb-2">
                                                    Cover Letter
                                                </p>
                                                <p className="text-sm text-primaryDark leading-relaxed">
                                                    {application.coverLetter}
                                                </p>
                                            </div>
                                        )}

                                        {/* Status Update Dropdown */}
                                        <div className="relative">
                                            <label className="text-xs font-semibold text-slate uppercase tracking-wide block mb-2">
                                                Update Status
                                            </label>
                                            <div className="relative">
                                                <select
                                                    value={application.status || "pending"}
                                                    onChange={(e) => handleStatusUpdate(e, application._id)}
                                                    className="w-full sm:max-w-xs appearance-none bg-white border-2 border-gray-200 rounded-xl px-4 py-3 pr-10 text-primaryDark font-medium focus:outline-none focus:border-purple focus:ring-4 focus:ring-purple/10 transition-all cursor-pointer hover:border-gray-300"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="reviewed">Under Review</option>
                                                    <option value="accepted">Accepted</option>
                                                    <option value="rejected">Rejected</option>
                                                </select>
                                                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate pointer-events-none" />
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-16"
                        >
                            <div className="inline-flex w-20 h-20 bg-gray-100 rounded-full items-center justify-center mb-4">
                                <FiFilter className="text-slate text-3xl" />
                            </div>
                            <h3 className="text-xl font-bold text-primaryDark mb-2">No Applications Found</h3>
                            <p className="text-slate mb-6">
                                {searchQuery
                                    ? "Try adjusting your search or filters"
                                    : "No applications match the selected filter"}
                            </p>
                            {(filter !== "all" || searchQuery) && (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        setFilter("all");
                                        setSearchQuery("");
                                    }}
                                    className="px-6 py-3 bg-gradient-to-r from-purple to-indigo text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                                >
                                    Clear Filters
                                </motion.button>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ViewApplications;
