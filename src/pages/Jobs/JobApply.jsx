import { useLoaderData, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { FaLinkedin, FaGithub, FaFileAlt, FaEnvelope, FaBriefcase, FaArrowLeft, FaCheckCircle } from "react-icons/fa";

const JobApply = () => {
    const { user } = useAuth();
    const job = useLoaderData();
    const { _id, title, company, jobType, category, location, salaryRange } = job;
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        linkedin: "",
        github: "",
        resume: "",
        coverLetter: "",
    });

    // Calculate form completion percentage
    const calculateProgress = () => {
        const fields = Object.values(formData);
        const filledFields = fields.filter(field => field.trim() !== "").length;
        return (filledFields / fields.length) * 100;
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleJobApplication = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const jobApplication = {
            job_id: _id,
            application_email: user.email,
            ...formData,
        };

        try {
            const response = await fetch("https://jobportal-server-side.vercel.app/job-applications", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(jobApplication),
            });

            const data = await response.json();

            if (data.insertedId) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Application Submitted!",
                    text: "Your application has been successfully submitted. Good luck!",
                    showConfirmButton: false,
                    timer: 2000,
                });
                setTimeout(() => navigate("/my-applications"), 2000);
            }
        } catch (error) {
            toast.error("Failed to submit application. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const progress = calculateProgress();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 py-20 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    onClick={() => navigate(-1)}
                    className="mb-6 flex items-center gap-2 text-primaryDark hover:text-teal transition-colors group"
                >
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Back to Job Details</span>
                </motion.button>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Application Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-2"
                    >
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                            {/* Header */}
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-primaryDark via-teal to-primaryLight bg-clip-text text-transparent mb-2">
                                    Apply for Position
                                </h1>
                                <p className="text-slate-600">
                                    Complete the form below to submit your application
                                </p>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-slate-700">
                                        Application Progress
                                    </span>
                                    <span className="text-sm font-semibold text-teal">
                                        {Math.round(progress)}%
                                    </span>
                                </div>
                                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 0.3 }}
                                        className="h-full bg-gradient-to-r from-teal to-primaryLight rounded-full"
                                    />
                                </div>
                            </div>

                            {/* Application Form */}
                            <form onSubmit={handleJobApplication} className="space-y-6">
                                {/* LinkedIn URL */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        LinkedIn Profile
                                    </label>
                                    <div className="relative group">
                                        <FaLinkedin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                        <input
                                            type="url"
                                            name="linkedin"
                                            value={formData.linkedin}
                                            onChange={handleInputChange}
                                            placeholder="https://linkedin.com/in/yourprofile"
                                            className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all outline-none"
                                            required
                                        />
                                    </div>
                                </motion.div>

                                {/* GitHub URL */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        GitHub Profile
                                    </label>
                                    <div className="relative group">
                                        <FaGithub className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-800 transition-colors" />
                                        <input
                                            type="url"
                                            name="github"
                                            value={formData.github}
                                            onChange={handleInputChange}
                                            placeholder="https://github.com/yourusername"
                                            className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all outline-none"
                                            required
                                        />
                                    </div>
                                </motion.div>

                                {/* Resume URL */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Resume URL
                                    </label>
                                    <div className="relative group">
                                        <FaFileAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-coral transition-colors" />
                                        <input
                                            type="url"
                                            name="resume"
                                            value={formData.resume}
                                            onChange={handleInputChange}
                                            placeholder="https://drive.google.com/your-resume"
                                            className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all outline-none"
                                            required
                                        />
                                    </div>
                                    <p className="mt-2 text-xs text-slate-500">
                                        Provide a link to your resume (Google Drive, Dropbox, etc.)
                                    </p>
                                </motion.div>

                                {/* Cover Letter */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Cover Letter
                                    </label>
                                    <textarea
                                        name="coverLetter"
                                        value={formData.coverLetter}
                                        onChange={handleInputChange}
                                        rows="6"
                                        placeholder="Tell us why you're a great fit for this position..."
                                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all outline-none resize-none"
                                        required
                                    ></textarea>
                                    <p className="mt-2 text-xs text-slate-500">
                                        Minimum 50 characters recommended
                                    </p>
                                </motion.div>

                                {/* Submit Button */}
                                <motion.button
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-teal to-primaryLight text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                            />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <FaCheckCircle />
                                            Submit Application
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>

                    {/* Job Details Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-1"
                    >
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 sticky top-24">
                            <h2 className="text-xl font-bold text-primaryDark mb-4 flex items-center gap-2">
                                <FaBriefcase className="text-teal" />
                                Job Details
                            </h2>

                            <div className="space-y-4">
                                {/* Job Title */}
                                <div>
                                    <h3 className="font-bold text-lg text-slate-800 mb-1">
                                        {title}
                                    </h3>
                                    <p className="text-slate-600 text-sm">{company}</p>
                                </div>

                                <div className="h-px bg-slate-200" />

                                {/* Job Info */}
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 rounded-full bg-teal mt-1.5" />
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase tracking-wide">Location</p>
                                            <p className="text-sm font-medium text-slate-700">{location}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 rounded-full bg-primaryLight mt-1.5" />
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase tracking-wide">Job Type</p>
                                            <p className="text-sm font-medium text-slate-700">{jobType}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 rounded-full bg-coral mt-1.5" />
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase tracking-wide">Category</p>
                                            <p className="text-sm font-medium text-slate-700">{category}</p>
                                        </div>
                                    </div>

                                    {salaryRange && (
                                        <div className="flex items-start gap-3">
                                            <div className="w-2 h-2 rounded-full bg-emerald mt-1.5" />
                                            <div>
                                                <p className="text-xs text-slate-500 uppercase tracking-wide">Salary Range</p>
                                                <p className="text-sm font-medium text-slate-700">
                                                    ${salaryRange.min?.toLocaleString()} - ${salaryRange.max?.toLocaleString()} {salaryRange.currency}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="h-px bg-slate-200" />

                                {/* Applicant Info */}
                                <div className="bg-gradient-to-br from-teal/10 to-primaryLight/10 rounded-xl p-4">
                                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-2">
                                        <FaEnvelope className="text-teal" />
                                        Applying As
                                    </p>
                                    <p className="text-sm font-semibold text-slate-800 break-all">
                                        {user?.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default JobApply;
