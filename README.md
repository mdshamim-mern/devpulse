# DevPulse - Issue & Feature Tracker API

DevPulse is a robust backend API built for tracking issues, bugs, and feature requests. It includes secure role-based authentication, allowing contributors to create issues and maintainers to manage and resolve them.

## 🚀 Live URL
[https://devpulse-six-ashen.vercel.app](https://devpulse-six-ashen.vercel.app)

## ✨ Features
- **User Authentication:** Secure JWT-based login and signup.
- **Role-Based Access Control (RBAC):** Differentiates between `contributor` and `maintainer`.
- **Issue Management:** Create, Read, Update, and Delete (CRUD) operations for issues.
- **Strict Validation:** Ensures data integrity using TypeScript and structured formatting.
- **Global Error Handling:** Consistent and informative error responses.

## 🛠️ Tech Stack & Dependencies
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL (NeonDB)
- **Database Driver:** pg (node-postgres)
- **Security & Utilities:** bcrypt, jsonwebtoken, cors, dotenv

## ⚙️ Local Setup Guidelines

Follow these steps to run the project on your local machine:

**1. Clone the repository and install packages:**
    git clone https://github.com/mdshamim-mern/devpulse.git
    cd devpulse
    npm install

**2. Set up environment variables:**
Create a .env file in the root directory and add the following variables:
    PORT=5000
    DATABASE_URL=your_postgresql_connection_string
    JWT_SECRET=your_super_secret_key
    JWT_EXPIRES_IN=1d

**3. Start the development server:**
    npm run dev