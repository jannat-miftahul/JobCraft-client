import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiSend, FiArrowUpRight } from "react-icons/fi";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa";
import logo from "../assets/jobcraft-logo.png";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        company: [
            { label: "About Us", path: "/about" },
            { label: "Careers", path: "/jobs" },
            { label: "Press Kit", path: "#" },
            { label: "Blog", path: "#" },
        ],
        forJobSeekers: [
            { label: "Browse Jobs", path: "/jobs" },
            { label: "Career Advice", path: "#" },
            { label: "Resume Builder", path: "#" },
            { label: "Salary Guide", path: "#" },
        ],
        forEmployers: [
            { label: "Post a Job", path: "/add-job" },
            { label: "Browse Candidates", path: "#" },
            { label: "Pricing", path: "#" },
            { label: "Recruiting Solutions", path: "#" },
        ],
        legal: [
            { label: "Privacy Policy", path: "#" },
            { label: "Terms of Service", path: "#" },
            { label: "Cookie Policy", path: "#" },
            { label: "GDPR", path: "#" },
        ],
    };

    const socialLinks = [
        { icon: FaFacebookF, href: "#", label: "Facebook", color: "hover:bg-blue-600" },
        { icon: FaTwitter, href: "#", label: "Twitter", color: "hover:bg-sky-500" },
        { icon: FaLinkedinIn, href: "#", label: "LinkedIn", color: "hover:bg-blue-700" },
        { icon: FaInstagram, href: "#", label: "Instagram", color: "hover:bg-pink-600" },
        { icon: FaYoutube, href: "#", label: "YouTube", color: "hover:bg-red-600" },
    ];

    const contactInfo = [
        { icon: FiMail, text: "hello@jobcraft.com", href: "mailto:hello@jobcraft.com" },
        { icon: FiPhone, text: "+1 (555) 123-4567", href: "tel:+15551234567" },
        { icon: FiMapPin, text: "San Francisco, CA 94102", href: "#" },
    ];

    return (
        <footer className="bg-gradient-to-br from-primaryDark via-[#1a3050] to-primaryDark relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />
            </div>

            {/* Newsletter Section */}
            <div className="relative border-b border-white/10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="text-center lg:text-left max-w-xl">
                            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                                Stay Updated with Job Alerts
                            </h3>
                            <p className="text-white/60">
                                Get the latest job opportunities delivered straight to your inbox.
                            </p>
                        </div>
                        <div className="w-full lg:w-auto">
                            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0">
                                <div className="flex-1 relative">
                                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate" />
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full pl-11 pr-4 py-3.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                                    />
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-accent to-coral text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-accent/30 transition-all duration-300"
                                >
                                    <span>Subscribe</span>
                                    <FiSend />
                                </motion.button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
                    {/* Brand Column */}
                    <div className="col-span-2 md:col-span-3 lg:col-span-2">
                        <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
                            <motion.div
                                // whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-teal to-coral rounded-full blur-md opacity-40 group-hover:opacity-70 transition-opacity" />
                                <img
                                    src={logo}
                                    alt="JobCraft"
                                    className="relative w-14 h-14 object-contain rounded-full ring-2 ring-white/20 group-hover:ring-white/40 transition-all"
                                />
                            </motion.div>
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold bg-gradient-to-r from-white via-teal/90 to-white bg-clip-text text-transparent">
                                    JobCraft
                                </span>
                                <span className="text-xs font-medium text-teal tracking-widest -mt-1">
                                    CRAFT YOUR CAREER
                                </span>
                            </div>
                        </Link>
                        <p className="text-white/60 mb-6 max-w-xs leading-relaxed">
                            Connecting talented professionals with their dream careers. Your
                            next opportunity is just a click away.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            {contactInfo.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.href}
                                    className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group"
                                >
                                    <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-accent transition-colors">
                                        <item.icon className="text-sm" />
                                    </div>
                                    <span className="text-sm">{item.text}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.path}
                                        className="text-white/60 hover:text-white text-sm transition-colors inline-flex items-center gap-1 group"
                                    >
                                        <span>{link.label}</span>
                                        <FiArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Job Seekers Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">For Job Seekers</h4>
                        <ul className="space-y-3">
                            {footerLinks.forJobSeekers.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.path}
                                        className="text-white/60 hover:text-white text-sm transition-colors inline-flex items-center gap-1 group"
                                    >
                                        <span>{link.label}</span>
                                        <FiArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Employers Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">For Employers</h4>
                        <ul className="space-y-3">
                            {footerLinks.forEmployers.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.path}
                                        className="text-white/60 hover:text-white text-sm transition-colors inline-flex items-center gap-1 group"
                                    >
                                        <span>{link.label}</span>
                                        <FiArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Legal</h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.path}
                                        className="text-white/60 hover:text-white text-sm transition-colors inline-flex items-center gap-1 group"
                                    >
                                        <span>{link.label}</span>
                                        <FiArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="relative border-t border-white/10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        {/* Copyright */}
                        <p className="text-white/50 text-sm text-center sm:text-left">
                            © {currentYear} JobCraft. All rights reserved. Made with{" "}
                            <span className="text-coral">♥</span> for job seekers everywhere.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-2">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white/70 hover:text-white ${social.color} transition-all duration-300`}
                                    aria-label={social.label}
                                >
                                    <social.icon className="text-sm" />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-primaryLight/10 rounded-full blur-3xl" />
        </footer>
    );
};

export default Footer;
