import PropTypes from "prop-types";
import React from "react";
import { GoClock } from "react-icons/go";
import { GrLocation } from "react-icons/gr";
import { TfiBag } from "react-icons/tfi";
import { FiDollarSign, FiArrowUpRight } from "react-icons/fi";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
    const {
        _id,
        title,
        company,
        company_logo,
        location,
        jobType,
        applicationDeadline,
        salaryRange = {},
        description,
        requirements,
    } = job;

    const truncateText = (text, wordLimit) => {
        const words = text.split(" ");
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(" ") + "...";
        }
        return text;
    };

    const getJobTypeBadgeColor = (type) => {
        const colors = {
            "Full-time": "bg-green-100 text-green-700",
            "Part-time": "bg-blue-100 text-blue-700",
            Remote: "bg-purple-100 text-purple-700",
            Contract: "bg-orange-100 text-orange-700",
            Internship: "bg-pink-100 text-pink-700",
        };
        return colors[type] || "bg-gray-100 text-gray-700";
    };

    return (
        <div className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primaryLight/10 transition-all duration-500 hover:-translate-y-1 overflow-hidden">
            {/* Hover Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primaryLight/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Card Content */}
            <div className="relative p-5 sm:p-6 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                        {/* Company Logo */}
                        <div className="w-12 h-12 rounded-md bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300">
                            <img
                                src={company_logo}
                                alt={company}
                                className="w-12 h-auto object-contain"
                            />
                        </div>
                        {/* Company Info */}
                        <div>
                            <div className="flex items-center gap-1">
                                <h4 className="font-semibold text-gray-800 text-sm">
                                    {company}
                                </h4>
                                <HiOutlineBadgeCheck className="text-blue-500 text-sm" />
                            </div>
                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                <GrLocation className="text-xs" />
                                {truncateText(location, 3)}
                            </p>
                        </div>
                    </div>
                    {/* Job Type Badge */}
                    <span
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium ${getJobTypeBadgeColor(
                            jobType
                        )}`}
                    >
                        {jobType}
                    </span>
                </div>

                {/* Job Title */}
                <h3 className="text-lg font-bold text-primaryDark mb-2 group-hover:text-primaryLight transition-colors line-clamp-2">
                    {title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {truncateText(description, 12)}
                </p>

                {/* Requirements Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {Array.isArray(requirements) &&
                        requirements.slice(0, 3).map((skill, index) => (
                            <span
                                key={index}
                                className="px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-lg text-xs text-gray-600 hover:border-primaryLight hover:text-primaryLight transition-colors cursor-default"
                            >
                                {skill}
                            </span>
                        ))}
                    {Array.isArray(requirements) && requirements.length > 3 && (
                        <span className="px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-lg text-xs text-gray-400">
                            +{requirements.length - 3}
                        </span>
                    )}
                </div>

                {/* Deadline */}
                <div className="flex items-center gap-1 text-xs text-gray-400 mb-4">
                    <GoClock />
                    <span>Deadline: {applicationDeadline}</span>
                </div>

                {/* Footer */}
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    {/* Salary */}
                    <div className="flex items-center gap-1">
                        <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                            <FiDollarSign className="text-green-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400">Salary</p>
                            <p className="text-sm font-semibold text-gray-700">
                                {salaryRange.min?.toLocaleString()} -{" "}
                                {salaryRange.max?.toLocaleString()}
                                <span className="text-xs text-gray-400 ml-1 uppercase">
                                    {salaryRange.currency}
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Apply Button */}
                    <Link
                        to={`/jobs/${_id}`}
                        className="inline-flex items-center gap-1 px-4 py-2.5 bg-primaryDark hover:bg-accent text-white text-sm font-medium rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/20 group/btn"
                    >
                        <span>Apply</span>
                        <FiArrowUpRight className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

JobCard.propTypes = {
    job: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        company: PropTypes.string.isRequired,
        company_logo: PropTypes.string,
        location: PropTypes.string,
        jobType: PropTypes.string,
        applicationDeadline: PropTypes.string,
        salaryRange: PropTypes.shape({
            min: PropTypes.number,
            max: PropTypes.number,
            currency: PropTypes.string,
        }),
        description: PropTypes.string,
        requirements: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
};

export default JobCard;
