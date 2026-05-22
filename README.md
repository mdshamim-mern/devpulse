# DevPulse - Issue & Feature Tracker API

DevPulse is a robust backend API built for tracking issues, bugs, and feature requests. It includes secure role-based authentication, allowing contributors to create issues and maintainers to manage and resolve them.

## 🚀 Live URL
**[https://devpulse-six-ashen.vercel.app](https://devpulse-six-ashen.vercel.app)**

## ✨ Features
- **User Authentication:** Secure JWT-based login and signup.
- **Role-Based Access Control (RBAC):** Differentiates between `contributor` and `maintainer`.
- **Issue Management:** Create, Read, Update, and Delete (CRUD) operations for issues.
- **Strict Validation:** Ensures data integrity using TypeScript and structured formatting.
- **Global Error Handling:** Consistent and informative error responses.

## 🛠️ Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL (NeonDB)
- **Database Driver:** `pg` (node-postgres)
- **Security:** bcrypt, jsonwebtoken, cors

## ⚙️ Local Setup Steps

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/mdshamim-mern/devpulse.git](https://github.com/mdshamim-mern/devpulse.git)
   cd devpulse