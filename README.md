# Filedrop

![Filedrop Banner](./public/Screenshot%202025-03-04%20at%2014.15.51.png)

**Filedrop** is a modern **file storage and management app** built with **Next.js, Firebase, Clerk authentication, and TailwindCSS**. It allows users to upload, rename, delete, and download files securely.

![Filedrop Demo](https://filedrop-nu.vercel.app/)

## 📜 Table of Contents

- [🚀 Features](#-features)
- [📂 Tech Stack](#-tech-stack)
- [🔧 Installation](#-installation)
- [🛠️ Environment Variables](#-environment-variables)
- [📖 Usage Guide](#-usage-guide)
- [🖼️ Screenshots](#-screenshots)
- [🔐 Authentication](#-authentication)
- [⚙️ File Management](#-file-management)
- [🎨 Theming & Dark Mode](#-theming--dark-mode)

---

## 🚀 Features
✅ **Secure file upload** (with Firebase Storage & Clerk Authentication)
✅ **Real-time file listing** (Firestore integration)
✅ **File rename & delete** (with confirmation dialogs)
✅ **Dark mode support** (via TailwindCSS)
✅ **Toast notifications** (ShadCN's Sonner for feedback)
✅ **Responsive UI** (works on all devices, no horizontal scrolling)
✅ **User Authentication** (Google Sign-In, Email, etc.)
✅ **Optimized for performance**

---

## 📂 Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Authentication**: Clerk
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage (20MB limit per file)
- **UI Components**: ShadCN, TailwindCSS
- **State Management**: React Hooks
- **Notifications**: Sonner (ShadCN Toast)

---

## 🔧 Installation

1️⃣ **Clone the repository**
```bash
  git clone https://github.com/yourusername/filedrop.git
  cd filedrop
```

2️⃣ **Install dependencies**
```bash
  npm install
```

3️⃣ **Set up Firebase & Clerk** (see environment variables below 👇)

4️⃣ **Run the project locally**
```bash
  npm run dev
```

Your app will be available at **http://localhost:3000** 🎉

---

## 🛠️ Environment Variables

Create a `.env.local` file in the root directory and add the following:

```ini
NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_frontend_api
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

🔹 **Get Firebase credentials** from the Firebase console ([firebase.google.com](https://firebase.google.com/)).
🔹 **Get Clerk credentials** from the Clerk dashboard ([clerk.dev](https://clerk.dev/)).

---

## 📖 Usage Guide

### 🔐 **Authentication**
- Users must sign in using **Clerk Authentication**.
- Supported logins: **Google, Email/Password**.

### 📂 **File Management**
- **Upload Files** via **Dropzone** component.
- **Delete Files** with a confirmation modal.
- **Rename Files** via a dialog box.
- **Download Files** by clicking the **Download** link.

### 🎨 **Theming & Dark Mode**
- Uses TailwindCSS `dark:` mode.
- Automatically detects system preference.
- Users can toggle manually.

---

## 🖼️ Screenshots

### 📌 **Homepage**
![Homepage Screenshot](./public/Screenshot%202025-03-04%20at%2014.15.51.png)

### 📌 **Dark Mode**
![Dark Mode Screenshot](./public/Screenshot%202025-03-04%20at%2014.16.16.png)

---

📢 **Made with ❤️ by [Francesco.dev](https://francescovurchio-dev.netlify.app/)**

