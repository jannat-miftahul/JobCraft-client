import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
    FiUsers, FiTarget, FiAward, FiHeart, FiGlobe, FiTrendingUp,
    FiMail, FiMapPin, FiPhone, FiLinkedin, FiTwitter, FiArrowRight, FiPlay, FiCheck, FiClock, FiShield, FiZap, FiStar, FiChevronDown
} from "react-icons/fi";
import { HiOutlineSparkles, HiOutlineLightBulb } from "react-icons/hi";
import team1 from "../../assets/team1.jpg";
import team2 from "../../assets/team2.jpg";
import team3 from "../../assets/team3.jpg";

const About = () => {
    const [activeAccordion, setActiveAccordion] = useState(0);

    const stats = [
        { value: "10K+", label: "Jobs Posted", icon: FiTarget, color: "from-coral to-rose" },
        { value: "5K+", label: "Companies", icon: FiGlobe, color: "from-purple to-indigo" },
        { value: "100K+", label: "Happy Users", icon: FiUsers, color: "from-teal to-emerald" },
        { value: "95%", label: "Success Rate", icon: FiTrendingUp, color: "from-amber to-gold" },
    ];

    const values = [
        {
            icon: FiHeart,
            title: "People First",
            description: "We believe in putting people at the center of everything we do, creating meaningful connections between talent and opportunity.",
            color: "bg-coral",
            gradient: "from-coral/20 to-rose/10",
        },
        {
            icon: HiOutlineLightBulb,
            title: "Innovation",
            description: "We constantly push boundaries to deliver cutting-edge solutions that make job searching and hiring more efficient.",
            color: "bg-amber",
            gradient: "from-amber/20 to-gold/10",
        },
        {
            icon: FiAward,
            title: "Excellence",
            description: "We strive for excellence in every interaction, ensuring the highest quality experience for job seekers and employers alike.",
            color: "bg-emerald",
            gradient: "from-emerald/20 to-teal/10",
        },
        {
            icon: FiGlobe,
            title: "Global Reach",
            description: "We connect talent with opportunities worldwide, breaking down geographical barriers in the job market.",
            color: "bg-purple",
            gradient: "from-purple/20 to-indigo/10",
        },
    ];

    const team = [
        {
            name: "Sarah Johnson",
            role: "CEO & Founder",
            image: team1,
            bio: "Visionary leader with 15+ years in HR tech. Former Director at LinkedIn. Passionate about connecting talent with opportunity.",
            skills: ["Leadership", "Strategy", "HR Tech"],
            linkedin: "#",
            twitter: "#",
            email: "sarah@jobcraft.com",
        },
        {
            name: "Michael Chen",
            role: "CTO",
            image: team2,
            bio: "Tech innovator passionate about AI in recruitment. Ex-Google engineer. Built systems serving millions of users.",
            skills: ["AI/ML", "System Design", "Full Stack"],
            linkedin: "#",
            twitter: "#",
            email: "michael@jobcraft.com",
        },
        {
            name: "Emily Davis",
            role: "Head of Operations",
            image: team3,
            bio: "Operations expert ensuring seamless experiences. MBA from Stanford. Previously scaled ops at Uber and Airbnb.",
            skills: ["Operations", "Analytics", "Scaling"],
            linkedin: "#",
            twitter: "#",
            email: "emily@jobcraft.com",
        },
    ];

    const milestones = [
        { year: "2020", title: "The Beginning", description: "JobCraft was founded with a vision to revolutionize job searching." },
        { year: "2021", title: "10K Users", description: "Reached our first major milestone of 10,000 active users." },
        { year: "2022", title: "AI Launch", description: "Introduced AI-powered job matching algorithm." },
        { year: "2023", title: "Global Expansion", description: "Expanded to 50+ countries with multi-language support." },
        { year: "2024", title: "100K Milestone", description: "Celebrated 100,000+ successful job placements." },
    ];

    const faqs = [
        {
            question: "How does JobCraft help me find jobs?",
            answer: "JobCraft uses AI-powered matching to connect you with relevant job opportunities based on your skills, experience, and preferences. Simply create a profile, and we'll do the rest!",
        },
        {
            question: "Is JobCraft free to use?",
            answer: "Yes! JobCraft is completely free for job seekers. Employers pay a small fee to post jobs and access our talent pool.",
        },
        {
            question: "How can I contact support?",
            answer: "You can reach our support team via email at hello@jobcraft.com or through our in-app chat. We typically respond within 24 hours.",
        },
        {
            question: "Can I post jobs as an employer?",
            answer: "Absolutely! Create an employer account and start posting jobs immediately. We offer various plans to suit businesses of all sizes.",
        },
    ];

    const features = [
        { icon: FiZap, title: "AI Matching", description: "Smart algorithms find your perfect fit" },
        { icon: FiShield, title: "Verified Jobs", description: "All listings are verified for authenticity" },
        { icon: FiClock, title: "Quick Apply", description: "Apply to jobs with just one click" },
        { icon: FiStar, title: "Premium Support", description: "24/7 dedicated customer support" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Simple Hero Section */}
            <section className="relative bg-gradient-to-r from-primaryDark to-primaryLight py-16 sm:py-20 overflow-hidden">
                {/* Simple Background */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-coral rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        {/* Breadcrumb */}
                        <div className="inline-flex items-center gap-2 text-white/60 text-sm mb-6">
                            <Link to="/" className="hover:text-white transition-colors">Home</Link>
                            <span>/</span>
                            <span className="text-white">About Us</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                            About JobCraft
                        </h1>

                        <p className="text-lg text-white/80 max-w-2xl mx-auto">
                            We&apos;re on a mission to connect talented professionals with their dream careers. Learn more about who we are and what drives us.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 -mt-6 relative z-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-100/50 border border-gray-100 text-center group"
                            >
                                <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    <stat.icon className="text-2xl text-white" />
                                </div>
                                <motion.h3
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    className="text-3xl sm:text-4xl font-bold text-primaryDark mb-1"
                                >
                                    {stat.value}
                                </motion.h3>
                                <p className="text-slate text-sm">{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-primaryDark mb-4">
                            Why Choose <span className="text-teal">JobCraft</span>?
                        </h2>
                        <p className="text-slate text-lg max-w-2xl mx-auto">
                            We offer powerful features that make your job search easier and more effective.
                        </p>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl hover:border-teal/20 transition-all duration-300 group"
                            >
                                <div className="w-14 h-14 bg-teal/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-teal group-hover:scale-110 transition-all duration-300">
                                    <feature.icon className="text-2xl text-teal group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-lg font-bold text-primaryDark mb-2">{feature.title}</h3>
                                <p className="text-slate text-sm">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-20 lg:py-28">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Images */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="relative h-[450px] sm:h-[550px]">
                                <motion.div
                                    animate={{ y: [-10, 10, -10] }}
                                    transition={{ duration: 6, repeat: Infinity }}
                                    className="absolute top-0 left-0 w-[65%] z-10"
                                >
                                    <img
                                        src={team1}
                                        alt="Our team"
                                        className="w-full h-72 object-cover rounded-3xl shadow-2xl"
                                    />
                                    <div className="absolute inset-0 rounded-3xl ring-4 ring-white" />
                                </motion.div>

                                <motion.div
                                    animate={{ y: [10, -10, 10] }}
                                    transition={{ duration: 7, repeat: Infinity }}
                                    className="absolute bottom-0 right-0 w-[65%]"
                                >
                                    <img
                                        src={team2}
                                        alt="Collaboration"
                                        className="w-full h-72 object-cover rounded-3xl shadow-2xl"
                                    />
                                    <div className="absolute inset-0 rounded-3xl ring-4 ring-white" />
                                </motion.div>

                                {/* Floating Badge */}
                                <motion.div
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-gradient-to-br from-coral to-rose rounded-2xl p-4 shadow-xl"
                                >
                                    <div className="text-center">
                                        <p className="text-3xl font-bold text-white">5+</p>
                                        <p className="text-xs text-white/80">Years of Excellence</p>
                                    </div>
                                </motion.div>

                                {/* Decorative Elements */}
                                <div className="absolute -top-4 -left-4 w-24 h-24 bg-teal/20 rounded-full blur-2xl" />
                                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple/20 rounded-full blur-2xl" />
                            </div>
                        </motion.div>

                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-coral/10 rounded-full text-coral text-sm font-medium mb-4">
                                <HiOutlineSparkles />
                                <span>Our Story</span>
                            </div>

                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primaryDark mb-6">
                                Empowering Careers{" "}
                                <span className="bg-gradient-to-r from-coral to-rose bg-clip-text text-transparent">
                                    Since 2020
                                </span>
                            </h2>

                            <div className="space-y-4 text-slate text-lg mb-8">
                                <p>
                                    JobCraft was born from a simple idea: finding a job shouldn&apos;t be harder than the job itself. Our founders, seasoned HR professionals and tech enthusiasts, came together to create a platform that truly understands both job seekers and employers.
                                </p>
                                <p>
                                    Today, we&apos;ve grown into a thriving community of over 100,000 users, connecting talent with opportunity across the globe. Our AI-powered matching system ensures that every job seeker finds their perfect fit.
                                </p>
                            </div>

                            {/* Highlights */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    { icon: FiCheck, text: "AI-Powered Matching" },
                                    { icon: FiCheck, text: "50+ Countries Served" },
                                    { icon: FiCheck, text: "24/7 Support" },
                                    { icon: FiCheck, text: "100K+ Success Stories" },
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="w-6 h-6 bg-emerald/10 rounded-full flex items-center justify-center flex-shrink-0">
                                            <item.icon className="w-4 h-4 text-emerald" />
                                        </div>
                                        <span className="text-primaryDark font-medium">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-20 bg-gradient-to-br from-primaryDark to-[#264573] relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                            Our Journey
                        </h2>
                        <p className="text-white/70 text-lg max-w-2xl mx-auto">
                            From a small startup to a global platform, here&apos;s how we&apos;ve grown.
                        </p>
                    </motion.div>

                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/20 hidden lg:block" />

                        <div className="space-y-8 lg:space-y-0">
                            {milestones.map((milestone, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`relative lg:flex lg:items-center ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                                        }`}
                                >
                                    <div className={`lg:w-1/2 ${index % 2 === 0 ? "lg:pr-12 lg:text-right" : "lg:pl-12"}`}>
                                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                                            <span className="text-coral font-bold text-lg">{milestone.year}</span>
                                            <h3 className="text-xl font-bold text-white mt-1 mb-2">{milestone.title}</h3>
                                            <p className="text-white/70">{milestone.description}</p>
                                        </div>
                                    </div>

                                    {/* Timeline Dot */}
                                    <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-coral rounded-full border-4 border-primaryDark" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple/10 rounded-full text-purple text-sm font-medium mb-4">
                            <FiHeart />
                            <span>Our Values</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-primaryDark mb-4">
                            What Drives Us <span className="text-purple">Forward</span>
                        </h2>
                        <p className="text-slate text-lg max-w-2xl mx-auto">
                            Our core values shape everything we do and guide us in creating the best experience for our community.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className={`group p-6 bg-gradient-to-br ${value.gradient} rounded-3xl border border-gray-100 hover:shadow-xl transition-all duration-500`}
                            >
                                <div className={`w-16 h-16 ${value.color} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                                    <value.icon className="text-2xl text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-primaryDark mb-3">{value.title}</h3>
                                <p className="text-slate text-sm leading-relaxed">{value.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal/10 rounded-full text-teal text-sm font-medium mb-4">
                            <FiUsers />
                            <span>Our Team</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-primaryDark mb-4">
                            Meet the <span className="text-teal">People</span> Behind JobCraft
                        </h2>
                        <p className="text-slate text-lg max-w-2xl mx-auto">
                            A passionate team dedicated to helping you find your dream job.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {team.map((member, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -10 }}
                                className="group bg-white rounded-3xl overflow-hidden shadow-lg shadow-gray-100/50 border border-gray-100 hover:shadow-2xl transition-all duration-500"
                            >
                                <div className="relative h-72 overflow-hidden">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primaryDark/80 via-primaryDark/20 to-transparent" />

                                    {/* Social Links */}
                                    <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                        <a href={member.linkedin} className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-white hover:text-primaryDark transition-colors">
                                            <FiLinkedin />
                                        </a>
                                        <a href={member.twitter} className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-white hover:text-primaryDark transition-colors">
                                            <FiTwitter />
                                        </a>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-primaryDark mb-1">{member.name}</h3>
                                    <p className="text-teal font-medium mb-3">{member.role}</p>
                                    <p className="text-slate text-sm">{member.bio}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-primaryDark mb-4">
                            Frequently Asked <span className="text-coral">Questions</span>
                        </h2>
                        <p className="text-slate text-lg">Got questions? We&apos;ve got answers.</p>
                    </motion.div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
                            >
                                <button
                                    onClick={() => setActiveAccordion(activeAccordion === index ? -1 : index)}
                                    className="w-full flex items-center justify-between p-6 text-left"
                                >
                                    <span className="font-semibold text-primaryDark pr-4">{faq.question}</span>
                                    <FiChevronDown
                                        className={`w-5 h-5 text-slate transition-transform duration-300 flex-shrink-0 ${activeAccordion === index ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>
                                <AnimatePresence>
                                    {activeAccordion === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="px-6 pb-6 text-slate">{faq.answer}</div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact CTA Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative bg-gradient-to-br from-coral via-rose to-purple rounded-[2rem] p-8 sm:p-12 lg:p-16 overflow-hidden"
                    >
                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber/20 rounded-full blur-3xl" />

                        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                            <div className="text-center lg:text-left">
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                                    Ready to Get Started?
                                </h2>
                                <p className="text-lg text-white/80 mb-8">
                                    Join thousands of professionals who found their dream jobs through JobCraft.
                                </p>
                                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                                    <Link
                                        to="/jobs"
                                        className="px-8 py-4 bg-white text-coral font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300"
                                    >
                                        Find Jobs Now
                                    </Link>
                                    <Link
                                        to="/add-job"
                                        className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all"
                                    >
                                        Post a Job
                                    </Link>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { icon: FiMail, text: "hello@jobcraft.com", label: "Email Us" },
                                    { icon: FiPhone, text: "+1 (555) 123-4567", label: "Call Us" },
                                    { icon: FiMapPin, text: "San Francisco, CA", label: "Visit Us" },
                                ].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/10"
                                    >
                                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <item.icon className="text-xl text-white" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-white/60">{item.label}</p>
                                            <p className="text-white font-medium">{item.text}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default About;
