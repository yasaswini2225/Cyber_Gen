# 🛡️ CyberGen - Cyber Security Courses Academy

Welcome to **CyberGen**, a stunning, modern, and beginner-friendly **Cyber Security Courses Website**. This project is built to demonstrate premium frontend styling (dark cyber/neon cyberpunk accents, frosted-glass card components, and smooth CSS micro-animations) combined with a robust Node.js + Express backend and a MySQL database!

This project has been structured specifically with **clean separation of concerns** and heavily commented source code so that beginners can easily study and adapt the stack.

---

## 📂 Project Directory Structure

```text
Cyber_Gen/
├── database/
│   └── schema.sql             # SQL database script (tables creation & 10 sample courses)
├── backend/
│   ├── config/
│   │   └── db.js              # MySQL connection pool configuration (mysql2/promise)
│   ├── .env                   # Local environmental configuration (port & credentials)
│   ├── package.json           # Node.js backend package dependencies
│   └── server.js              # Main Express server and REST API routes
├── frontend/
│   ├── css/
│   │   └── style.css          # Premium Dark Cyber style sheet (fully responsive)
│   ├── js/
│   │   ├── main.js            # Common utility controller (navbars, local session auth)
│   │   ├── auth.js            # Form validations & HTTP Signup/Login APIs
│   │   ├── courses.js         # Fetching & rendering course cards with search + filters
│   │   └── contact.js         # Validating and submitting contact feedback APIs
│   ├── index.html             # Academy Landing Page
│   ├── courses.html           # Marketplace Courses Page
│   ├── about.html             # Mission & Vision About Page
│   ├── contact.html           # Intersecting Form Contact Page
│   ├── login.html             # Identity Authenticator Login Page
│   └── signup.html            # Credentials Generator Register Page
└── README.md                  # Complete beginner step-by-step setup guide (this file)
```

---

## 🛠️ System Prerequisites

Make sure you have the following installed on your machine:
1. **Node.js** (v16.0.0 or higher recommended) - [Download Node.js](https://nodejs.org/)
2. **MySQL Server** (via MySQL Workbench, XAMPP, or command-line) - [Download MySQL](https://dev.mysql.com/downloads/installer/)
3. **VS Code (Visual Studio Code)** - [Download VS Code](https://code.visualstudio.com/)
4. **Live Server Extension** for VS Code (to launch the frontend easily) - Search "Live Server" in the VS Code extensions tab (`Ctrl+Shift+X`) and click **Install**.

---

## 🚀 Step-by-Step Setup Guide

Follow these simple phases to get the database, backend API server, and frontend UI synchronized.

---

### Phase 1: Initialize the MySQL Database

1. Open your **MySQL Command Line Client** or **MySQL Workbench** (or launch **Apache & MySQL** from your **XAMPP Control Panel**).
2. Connect to your local database server.
3. Open and run the `database/schema.sql` script. You can copy the contents of the file and paste them into your SQL editor, or run it via terminal:
   ```sql
   SOURCE c:/10/New folder/Cyber_Gen/database/schema.sql;
   ```
4. This script will automatically:
   * Create the database named `cyber_courses_db`.
   * Create the `users` table (equipped with hashed password safety).
   * Create the `courses` table.
   * Populate the database with **10 realistic premium cybersecurity courses** (Ethical Hacking, Penetration Testing, Malware analysis, etc.) so it is ready to go.

---

### Phase 2: Configure and Run the Backend Server

1. Open your terminal in VS Code (`Ctrl+Backtick` or `Ctrl+~`).
2. Navigate into the `backend/` directory:
   ```bash
   cd backend
   ```
3. Install the required Node dependencies (Express, mysql2, cors, bcryptjs, dotenv):
   ```bash
   npm install
   ```
4. Open the `backend/.env` file. Modify the credentials to match your MySQL database server setup:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password_here  # Leave empty if using XAMPP/no password
   DB_NAME=cyber_courses_db
   ```
5. Spin up the Express backend server:
   ```bash
   npm start
   ```
6. If everything is configured correctly, your terminal should print:
   ```text
   🚀 Server running on port 5000
   👉 Home API: http://localhost:5000/
   👉 Courses API: http://localhost:5000/api/courses
   ✔ Connected to MySQL Database successfully!
   ```

---

### Phase 3: Launch the Frontend Web Portal

1. In VS Code, navigate to the `frontend/` folder.
2. Right-click on `index.html` and select **"Open with Live Server"** (or click the **"Go Live"** button in the status bar at the bottom right corner of VS Code).
3. Your default web browser will automatically open:
   `http://127.0.0.1:5500/frontend/index.html` (or a similar port).
4. **Congratulations!** Your CyberGen academy portal is live. Navigating between pages will feel smooth with beautiful glows and interactive capabilities.

---

## ⚡ Interactive Features to Try

1. **Authentication System (Sign Up & Login):**
   * Go to the **Sign Up** page. Create a new account with your name, email, and password. Submit the form to register your details securely (hashed with `bcryptjs` in the database).
   * Go to the **Login** page. Enter your email and password. Upon successful auth, the navigation bar will dynamically update with a **custom avatar badge greeting you by name** and a functional **Logout** button!
2. **Interactive Courses Marketplace:**
   * Go to the **Courses** page. You will see 10 stunning course cards fetched dynamically in real-time from the MySQL database using the `fetch` API!
   * Use the **Search Bar** to search for courses by title, instructor, or description. The filter works in real-time!
   * Use the **Difficulty Level Selector** to show only "Beginner", "Intermediate", or "Advanced" courses.
3. **Smart Enrollment Hook:**
   * Click **"Enroll Now"** on any course card.
   * If you are *not* logged in, the portal will intercept your action, display a red floating alert notification, and redirect you to the login page.
   * If you *are* logged in, it will trigger a green high-tech floating success notification welcoming you to the module, and update the button to "Enrolled ✓".
4. **Encrypted Feedback Signals (Contact Form):**
   * Go to the **Contact** page. Fill out the contact form and submit.
   * The Javascript file intercepts the request, runs client validations, posts it to the backend endpoint `/api/contact`, and prints the contact message beautifully on your Node backend terminal logs!

---

## 🔌 Core Backend API Routes

The Express server exposes the following endpoints for the frontend to consume:

* **Courses APIs:**
  * `GET /api/courses` - Returns a JSON array containing all 10+ courses.
  * `GET /api/courses/featured` - Returns the top 3 courses for showcasing on the home landing page.
* **Authentication APIs:**
  * `POST /api/auth/signup` - Registers a new user. Expects JSON: `{ name, email, password }`. Hashes the password and saves it to MySQL.
  * `POST /api/auth/login` - Authenticates a user. Expects JSON: `{ email, password }`. Returns user details upon success.
* **Support Contact APIs:**
  * `POST /api/contact` - Expects JSON: `{ name, email, subject, message }`. Logs contact form details onto the server console.

---

## 🛡️ Security Highlight: Passwords in the Database
Even though this is a beginner-friendly academic project, storing passwords in plain text is a significant risk. CyberGen demonstrates industry-standard security:
* When a user signs up, the backend generates a random `salt` using `bcryptjs`.
* It mixes the salt with the password to produce an irreversible cryptographic `hash` (e.g. `$2a$10$X9...`).
* Only the secure hash is stored in the MySQL database.
* During login, the server retrieves the hash and compares it using `bcrypt.compare()` to verify access safely.
