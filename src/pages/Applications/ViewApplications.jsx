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


            </div>
        </div>
    );
};

export default ViewApplications;
