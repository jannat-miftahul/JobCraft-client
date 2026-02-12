import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
    FiBriefcase, FiImage, FiMapPin, FiClock, FiDollarSign, FiFileText,
    FiList, FiUser, FiMail, FiChevronRight, FiCheck, FiAlertCircle
} from "react-icons/fi";
import { MdPostAdd } from "react-icons/md";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const AddJob = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        company: "",
        company_logo: "",
        location: "",
        jobType: "",
        category: "",
        applicationDeadline: "",
        salaryRange: {
            min: "",
            max: "",
            currency: "USD",
        },
        description: "",
        requirements: [],
        responsibilities: [],
        hr_name: user?.displayName || "Anonymous",
        hr_email: user?.email || "anonymous@example.com",
    });

    const steps = [
        { id: 1, title: "Basic Info", icon: FiBriefcase },
        { id: 2, title: "Job Details", icon: FiFileText },
        { id: 3, title: "Compensation", icon: FiDollarSign },
        { id: 4, title: "Review", icon: FiCheck },
    ];

    const jobTypes = [
        { value: "Full-time", label: "Full-time", color: "bg-emerald/10 text-emerald border-emerald/20" },
        { value: "Part-time", label: "Part-time", color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
        { value: "Contract", label: "Contract", color: "bg-purple/10 text-purple border-purple/20" },
        { value: "Internship", label: "Internship", color: "bg-amber/10 text-amber border-amber/20" },
        { value: "Remote", label: "Remote", color: "bg-teal/10 text-teal border-teal/20" },
    ];

    const categories = [
        "Development",
        "Design",
        "Marketing",
        "Sales",
        "Support",
        "Finance",
        "HR",
        "Operations",
    ];

    const currencies = [
        { code: "USD", symbol: "$", name: "US Dollar" },
        { code: "EUR", symbol: "€", name: "Euro" },
        { code: "GBP", symbol: "£", name: "British Pound" },
        { code: "BDT", symbol: "৳", name: "Bangladeshi Taka" },
        { code: "INR", symbol: "₹", name: "Indian Rupee" },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "salaryMin" || name === "salaryMax" || name === "currency") {
            setFormData({
                ...formData,
                salaryRange: {
                    ...formData.salaryRange,
                    [name === "salaryMin" ? "min" : name === "salaryMax" ? "max" : "currency"]: value,
                },
            });
        } else if (name === "requirements" || name === "responsibilities") {
            setFormData({
                ...formData,
                [name]: value.split(",").map((item) => item.trim()),
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleJobTypeSelect = (type) => {
        setFormData({ ...formData, jobType: type });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        fetch("https://jobportal-server-side.vercel.app/jobs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {
                setIsSubmitting(false);
                if (data.insertedId) {
                    Swal.fire({
                        icon: "success",
                        title: "Job Posted Successfully!",
                        text: "Your job listing is now live.",
                        confirmButtonColor: "#457B9D",
                    });
                    navigate("/my-posted-jobs");
                }
            })
            .catch((error) => {
                setIsSubmitting(false);
                console.error("Error:", error);
                Swal.fire({
                    icon: "error",
                    title: "Oops!",
                    text: "Something went wrong. Please try again.",
                    confirmButtonColor: "#E63946",
                });
            });
    };

    const nextStep = () => {
        if (currentStep < 4) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const InputField = ({ label, icon: Icon, ...props }) => (
        <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-primaryDark">
                {Icon && <Icon className="w-4 h-4 text-slate" />}
                {label}
            </label>
            <input
                {...props}
                className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all text-gray-700 placeholder-slate"
            />
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-white to-teal/5 py-8 sm:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-8"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal/10 rounded-full text-teal text-sm font-medium mb-4">
                        <MdPostAdd />
                        <span>Post a New Job</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-primaryDark mb-2">
                        Create Your{" "}
                        <span className="bg-gradient-to-r from-teal to-emerald bg-clip-text text-transparent">
                            Job Listing
                        </span>
                    </h1>
                    <p className="text-slate max-w-lg mx-auto">
                        Fill in the details below to post your job and start receiving applications.
                    </p>
                </motion.div>

                {/* Progress Steps */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-8"
                >
                    <div className="flex items-center justify-between">
                        {steps.map((step, index) => (
                            <React.Fragment key={step.id}>
                                <button
                                    onClick={() => setCurrentStep(step.id)}
                                    className={`flex flex-col items-center gap-2 group ${currentStep >= step.id ? "cursor-pointer" : "cursor-not-allowed"
                                        }`}
                                >
                                    <div
                                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${currentStep === step.id
                                            ? "bg-gradient-to-br from-teal to-emerald text-white shadow-lg shadow-teal/30"
                                            : currentStep > step.id
                                                ? "bg-emerald text-white"
                                                : "bg-gray-100 text-slate group-hover:bg-gray-200"
                                            }`}
                                    >
                                        {currentStep > step.id ? (
                                            <FiCheck className="w-5 h-5" />
                                        ) : (
                                            <step.icon className="w-5 h-5" />
                                        )}
                                    </div>
                                    <span
                                        className={`text-xs font-medium hidden sm:block ${currentStep >= step.id ? "text-primaryDark" : "text-slate"
                                            }`}
                                    >
                                        {step.title}
                                    </span>
                                </button>

                                {index < steps.length - 1 && (
                                    <div className="flex-1 h-1 mx-2 bg-gray-100 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{
                                                width: currentStep > step.id ? "100%" : "0%",
                                            }}
                                            transition={{ duration: 0.3 }}
                                            className="h-full bg-gradient-to-r from-teal to-emerald"
                                        />
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </motion.div>

                {/* Form Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white rounded-3xl shadow-xl shadow-gray-100/50 border border-gray-100 overflow-hidden"
                >
                    <form onSubmit={handleSubmit}>
                        <div className="p-6 sm:p-8">
                            {/* Step 1: Basic Info */}
                            {currentStep === 1 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <InputField
                                            label="Job Title"
                                            icon={FiBriefcase}
                                            type="text"
                                            name="title"
                                            placeholder="e.g. Senior Frontend Developer"
                                            value={formData.title}
                                            onChange={handleChange}
                                            required
                                        />
                                        <InputField
                                            label="Company Name"
                                            type="text"
                                            name="company"
                                            placeholder="e.g. JobCraft Inc."
                                            value={formData.company}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <InputField
                                        label="Company Logo URL"
                                        icon={FiImage}
                                        type="url"
                                        name="company_logo"
                                        placeholder="https://example.com/logo.png"
                                        value={formData.company_logo}
                                        onChange={handleChange}
                                        required
                                    />

                                    {formData.company_logo && (
                                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                            <div className="w-16 h-16 bg-white rounded-xl border border-gray-200 flex items-center justify-center overflow-hidden">
                                                <img
                                                    src={formData.company_logo}
                                                    alt="Logo preview"
                                                    className="w-12 h-12 object-contain"
                                                    onError={(e) => (e.target.style.display = "none")}
                                                />
                                            </div>
                                            <p className="text-sm text-slate">Logo Preview</p>
                                        </div>
                                    )}

                                    <InputField
                                        label="Location"
                                        icon={FiMapPin}
                                        type="text"
                                        name="location"
                                        placeholder="e.g. San Francisco, CA or Remote"
                                        value={formData.location}
                                        onChange={handleChange}
                                        required
                                    />

                                    {/* Job Type Selection */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-sm font-medium text-primaryDark">
                                            <FiClock className="w-4 h-4 text-slate" />
                                            Job Type
                                        </label>
                                        <div className="flex flex-wrap gap-3">
                                            {jobTypes.map((type) => (
                                                <button
                                                    key={type.value}
                                                    type="button"
                                                    onClick={() => handleJobTypeSelect(type.value)}
                                                    className={`px-4 py-2.5 rounded-xl border-2 font-medium transition-all ${formData.jobType === type.value
                                                        ? `${type.color} border-current`
                                                        : "bg-gray-50 text-slate border-transparent hover:bg-gray-100"
                                                        }`}
                                                >
                                                    {type.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 2: Job Details */}
                            {currentStep === 2 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <SelectField
                                            label="Category"
                                            icon={FiList}
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            required
                                            options={
                                                <>
                                                    <option value="" disabled>
                                                        Select category...
                                                    </option>
                                                    {categories.map((cat) => (
                                                        <option key={cat} value={cat}>
                                                            {cat}
                                                        </option>
                                                    ))}
                                                </>
                                            }
                                        />

                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-sm font-medium text-primaryDark">
                                                <FiClock className="w-4 h-4 text-slate" />
                                                Application Deadline
                                            </label>
                                            <input
                                                type="date"
                                                name="applicationDeadline"
                                                value={formData.applicationDeadline}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all text-gray-700"
                                            />
                                        </div>
                                    </div>

                                    <TextareaField
                                        label="Job Description"
                                        icon={FiFileText}
                                        name="description"
                                        placeholder="Describe the role, team, and what makes this opportunity exciting..."
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                    />

                                    <TextareaField
                                        label="Requirements"
                                        icon={FiList}
                                        name="requirements"
                                        placeholder="React, Node.js, 3+ years experience, Team player..."
                                        value={formData.requirements}
                                        onChange={handleChange}
                                        hint="Separate each requirement with a comma"
                                        required
                                    />

                                    <TextareaField
                                        label="Responsibilities"
                                        icon={FiList}
                                        name="responsibilities"
                                        placeholder="Build features, Code reviews, Mentor juniors..."
                                        value={formData.responsibilities}
                                        onChange={handleChange}
                                        hint="Separate each responsibility with a comma"
                                        required
                                    />
                                </motion.div>
                            )}

                            {/* Step 3: Compensation */}
                            {currentStep === 3 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="p-6 bg-gradient-to-br from-teal/5 to-emerald/5 rounded-2xl border border-teal/10">
                                        <h3 className="text-lg font-semibold text-primaryDark mb-4 flex items-center gap-2">
                                            <FiDollarSign className="text-teal" />
                                            Salary Range
                                        </h3>

                                        <div className="grid sm:grid-cols-3 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-primaryDark">
                                                    Minimum
                                                </label>
                                                <input
                                                    type="number"
                                                    name="salaryMin"
                                                    placeholder="50000"
                                                    value={formData.salaryRange.min}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-primaryDark">
                                                    Maximum
                                                </label>
                                                <input
                                                    type="number"
                                                    name="salaryMax"
                                                    placeholder="80000"
                                                    value={formData.salaryRange.max}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-primaryDark">
                                                    Currency
                                                </label>
                                                <select
                                                    name="currency"
                                                    value={formData.salaryRange.currency}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all cursor-pointer"
                                                >
                                                    {currencies.map((curr) => (
                                                        <option key={curr.code} value={curr.code}>
                                                            {curr.symbol} {curr.code}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        {formData.salaryRange.min && formData.salaryRange.max && (
                                            <div className="mt-4 p-4 bg-white rounded-xl border border-teal/20">
                                                <p className="text-sm text-slate">Salary Preview:</p>
                                                <p className="text-xl font-bold text-primaryDark">
                                                    {currencies.find((c) => c.code === formData.salaryRange.currency)?.symbol}
                                                    {Number(formData.salaryRange.min).toLocaleString()} -{" "}
                                                    {currencies.find((c) => c.code === formData.salaryRange.currency)?.symbol}
                                                    {Number(formData.salaryRange.max).toLocaleString()}{" "}
                                                    <span className="text-sm font-normal text-slate">per year</span>
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* HR Info */}
                                    <div className="p-6 bg-gray-50 rounded-2xl">
                                        <h3 className="text-lg font-semibold text-primaryDark mb-4 flex items-center gap-2">
                                            <FiUser className="text-slate" />
                                            Contact Information
                                        </h3>

                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="flex items-center gap-2 text-sm font-medium text-primaryDark">
                                                    <FiUser className="w-4 h-4 text-slate" />
                                                    HR Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={user?.displayName || ""}
                                                    readOnly
                                                    className="w-full px-4 py-3.5 bg-gray-100 border border-gray-200 rounded-xl text-slate cursor-not-allowed"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="flex items-center gap-2 text-sm font-medium text-primaryDark">
                                                    <FiMail className="w-4 h-4 text-slate" />
                                                    HR Email
                                                </label>
                                                <input
                                                    type="email"
                                                    value={user?.email || ""}
                                                    readOnly
                                                    className="w-full px-4 py-3.5 bg-gray-100 border border-gray-200 rounded-xl text-slate cursor-not-allowed"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 4: Review */}
                            {currentStep === 4 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="text-center mb-8">
                                        <div className="w-16 h-16 bg-emerald/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <FiCheck className="text-3xl text-emerald" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-primaryDark">
                                            Review Your Job Listing
                                        </h2>
                                        <p className="text-slate">
                                            Make sure everything looks good before posting.
                                        </p>
                                    </div>

                                    {/* Preview Card */}
                                    <div className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100">
                                        <div className="flex items-start gap-4 mb-6">
                                            <div className="w-16 h-16 bg-white rounded-2xl border border-gray-200 flex items-center justify-center overflow-hidden">
                                                {formData.company_logo ? (
                                                    <img
                                                        src={formData.company_logo}
                                                        alt="Company logo"
                                                        className="w-12 h-12 object-contain"
                                                    />
                                                ) : (
                                                    <FiBriefcase className="text-2xl text-slate" />
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-primaryDark">
                                                    {formData.title || "Job Title"}
                                                </h3>
                                                <p className="text-slate">{formData.company || "Company"}</p>
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    <span className="px-2.5 py-1 bg-teal/10 text-teal rounded-lg text-xs font-medium">
                                                        {formData.jobType || "Job Type"}
                                                    </span>
                                                    <span className="px-2.5 py-1 bg-gray-100 text-slate rounded-lg text-xs">
                                                        {formData.location || "Location"}
                                                    </span>
                                                    <span className="px-2.5 py-1 bg-gray-100 text-slate rounded-lg text-xs">
                                                        {formData.category || "Category"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-sm font-medium text-slate mb-1">Description</p>
                                                <p className="text-gray-700">
                                                    {formData.description || "No description provided"}
                                                </p>
                                            </div>

                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <div className="p-4 bg-white rounded-xl border border-gray-100">
                                                    <p className="text-sm font-medium text-slate mb-2">Salary Range</p>
                                                    <p className="text-lg font-bold text-primaryDark">
                                                        {formData.salaryRange.min && formData.salaryRange.max
                                                            ? `${formData.salaryRange.currency} ${Number(formData.salaryRange.min).toLocaleString()} - ${Number(formData.salaryRange.max).toLocaleString()}`
                                                            : "Not specified"}
                                                    </p>
                                                </div>

                                                <div className="p-4 bg-white rounded-xl border border-gray-100">
                                                    <p className="text-sm font-medium text-slate mb-2">Deadline</p>
                                                    <p className="text-lg font-bold text-primaryDark">
                                                        {formData.applicationDeadline || "Not set"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Footer Buttons */}
                        <div className="px-6 sm:px-8 py-4 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <button
                                type="button"
                                onClick={prevStep}
                                className={`w-full sm:w-auto px-6 py-3 text-slate font-medium rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors ${currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                disabled={currentStep === 1}
                            >
                                Back
                            </button>

                            <div className="flex gap-3 w-full sm:w-auto">
                                {currentStep < 4 ? (
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-teal to-emerald text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-teal/30 transition-all"
                                    >
                                        <span>Continue</span>
                                        <FiChevronRight />
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-accent to-coral text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-accent/30 transition-all disabled:opacity-50"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                <span>Posting...</span>
                                            </>
                                        ) : (
                                            <>
                                                <FiCheck />
                                                <span>Post Job</span>
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default AddJob;
