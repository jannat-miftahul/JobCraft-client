import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FiMapPin, FiBriefcase, FiDollarSign, FiCalendar, FiUser,
    FiMail, FiCheckCircle, FiArrowLeft, FiShare2, FiBookmark
} from "react-icons/fi";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/LoadingSpinner";
const Jobdetails = () => {
    const {
        _id,
        title,
        company,
        company_logo,
        location,
        jobType,
        category,
        applicationDeadline,
        salaryRange,
        description,
        requirements,
        responsibilities,
        status,
        hr_name,
        hr_email,
    } = useLoaderData();

    const navigate = useNavigate();
    const [isSaved, setIsSaved] = useState(false);
    const [loading, setLoading] = useState(true);

    // Show loading spinner while validating data
    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <LoadingSpinner color="primaryDark" text="Loading job details..." />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header Banner */}
            <div className="relative bg-gradient-to-br from-primaryDark via-primaryLight to-indigo py-12 sm:py-16 overflow-hidden">
                {/* Background Decorations */}
                <div className="absolute inset-0 opacity-10">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 8, repeat: Infinity }}
                        className="absolute top-0 right-0 w-96 h-96 bg-teal rounded-full blur-3xl"
                    />
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Back Button */}
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl backdrop-blur-sm border border-white/10 transition-all mb-6"
                    >
                        <FiArrowLeft />
                        <span>Back to Jobs</span>
                    </motion.button>

                    <div className="flex flex-col lg:flex-row gap-6 items-start">
                        {/* Company Logo */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-24 h-auto bg-white rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0"
                        >
                            <img
                                src={company_logo}
                                alt={`${company} logo`}
                                className="w-full h-full object-contain"
                            />
                        </motion.div>

                        {/* Job Title & Company */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex-1"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full text-white/90 text-sm mb-3 backdrop-blur-sm border border-white/10">
                                <FiBriefcase />
                                <span>{category}</span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
                                {title}
                            </h1>
                            <p className="text-xl text-white/80 mb-4">{company}</p>

                            {/* Key Info Badges */}
                            <div className="flex flex-wrap gap-3">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl text-white backdrop-blur-sm border border-white/10">
                                    <FiMapPin className="text-teal" />
                                    <span>{location}</span>
                                </div>
                                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border ${getJobTypeColor(jobType)}`}>
                                    <FiBriefcase />
                                    <span className="font-medium">{jobType}</span>
                                </div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald/10 text-gold rounded-xl border border-emerald/20">
                                    <FiDollarSign />
                                    <span className="font-medium">
                                        {salaryRange?.min?.toLocaleString()} - {salaryRange?.max?.toLocaleString()} {salaryRange?.currency}
                                    </span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex gap-2"
                        >
                            <button
                                onClick={handleSave}
                                className={`p-3 rounded-xl backdrop-blur-sm border transition-all ${isSaved
                                    ? "bg-accent text-white border-accent"
                                    : "bg-white/10 text-white border-white/10 hover:bg-white/20"
                                    }`}
                            >
                                <FiBookmark className={isSaved ? "fill-current" : ""} />
                            </button>
                            <button
                                onClick={handleShare}
                                className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-xl backdrop-blur-sm border border-white/10 transition-all"
                            >
                                <FiShare2 />
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Job Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Description */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100"
                        >
                            <h2 className="text-2xl font-bold text-primaryDark mb-4 flex items-center gap-2">
                                <div className="w-1 h-6 bg-gradient-to-b from-teal to-emerald rounded-full" />
                                Job Description
                            </h2>
                            <p className="text-slate leading-relaxed">{description}</p>
                        </motion.div>

                        {/* Responsibilities */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100"
                        >
                            <h2 className="text-2xl font-bold text-primaryDark mb-4 flex items-center gap-2">
                                <div className="w-1 h-6 bg-gradient-to-b from-coral to-amber rounded-full" />
                                Responsibilities
                            </h2>
                            <ul className="space-y-3">
                                {responsibilities?.map((responsibility, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 + index * 0.05 }}
                                        className="flex items-start gap-3 text-slate"
                                    >
                                        <FiCheckCircle className="text-teal mt-1 flex-shrink-0" />
                                        <span>{responsibility}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-6">
                        {/* Apply Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-6"
                        >
                            <div className="space-y-4">
                                {/* Deadline */}
                                <div className="flex items-center gap-3 p-4 bg-amber/10 rounded-xl border border-amber/20">
                                    <FiCalendar className="text-amber text-xl" />
                                    <div>
                                        <p className="text-xs text-slate">Application Deadline</p>
                                        <p className="font-semibold text-primaryDark">
                                            {applicationDeadline}
                                        </p>
                                    </div>
                                </div>

                                {/* Apply Button */}
                                <Link
                                    to={`/jobs-apply/${_id}`}
                                    className="block w-full"
                                >
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-4 bg-gradient-to-r from-teal to-emerald hover:from-emerald hover:to-teal text-white font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-teal/30"
                                    >
                                        Apply Now
                                    </motion.button>
                                </Link>

                                <p className="text-xs text-center text-slate">
                                    By applying, you agree to our terms and conditions
                                </p>
                            </div>
                        </motion.div>

                        {/* HR Contact */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                        >
                            <h3 className="text-lg font-bold text-primaryDark mb-4">
                                Contact Information
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-primaryDark/10 rounded-lg flex items-center justify-center">
                                        <FiUser className="text-primaryDark" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate">HR Manager</p>
                                        <p className="font-medium text-primaryDark">{hr_name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-teal/10 rounded-lg flex items-center justify-center">
                                        <FiMail className="text-teal" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate">Email</p>
                                        <a
                                            href={`mailto:${hr_email}`}
                                            className="font-medium text-teal hover:underline"
                                        >
                                            {hr_email}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Job Status */}
                        {status && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-emerald/10 rounded-2xl p-4 border border-emerald/20"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-emerald rounded-full animate-pulse" />
                                    <span className="text-sm font-medium text-emerald">
                                        This position is currently {status}
                                    </span>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobdetails;
