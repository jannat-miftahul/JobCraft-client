# JobCraft

A modern job portal web application built with React and Firebase.

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-11.10-FFCA28?logo=firebase&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Live Demo](#live-demo)

## Overview

**JobCraft** connects job seekers with employers through an intuitive platform. Users can search, filter, and apply for jobs, while employers can post listings and manage applications.

## Features

| For Job Seekers          | For Employers           |
| ------------------------ | ----------------------- |
| Search & filter jobs     | Post job listings       |
| Apply with one click     | Manage applications     |
| Track application status | View applicant profiles |
| Save favorite jobs       | Edit/delete postings    |

**Additional Features:**

- 🔐 Firebase Authentication (Email/Google)
- 📱 Fully responsive design
- ⚡ Modern animations with Framer Motion
- 🎨 Premium UI with Tailwind CSS & DaisyUI

## Tech Stack

| Category  | Technologies             |
| --------- | ------------------------ |
| Frontend  | React 18, React Router 7 |
| Styling   | Tailwind CSS, DaisyUI    |
| Animation | Framer Motion            |
| Backend   | Firebase Auth, REST API  |
| Build     | Vite                     |
| Hosting   | Firebase Hosting         |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/miftah1299/jobcraft-client.git
cd jobcraft-client

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Add your Firebase config to .env.local

# Start development server
npm run dev
```

### Environment Variables

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/       # React context providers
├── hooks/          # Custom React hooks
├── layouts/        # Page layouts
├── pages/          # Route pages
│   ├── About/
│   ├── Applications/
│   ├── Auth/
│   ├── Home/
│   ├── Jobs/
│   └── NotFound/
├── routes/         # Route configuration
└── utils/          # Utility functions
```

## Live Demo

🔗 **[jobcraft-portal.web.app](https://jobcraft-portal.web.app)**

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/jannat-miftahul">Miftahul Jannat</a>
</p>
