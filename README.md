# 🔐 MERN Authentication System

A full-stack **Authentication System** built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js) with secure user authentication features.

This project demonstrates a production-style authentication flow including email verification, OTP handling, and password recovery.

---

## 🚀 Features

* ✅ User Registration
* 🔑 User Login
* 🚪 User Logout
* 📧 Email Verification with OTP
* 🔁 Resend OTP
* 🔐 Secure Password Hashing (bcrypt)
* 🔄 Reset Password with OTP
* 🛡 JWT-based Authentication
* 📦 Token-based Session Handling

---

## 🛠 Tech Stack

### Frontend

* React.js
* Axios
* React Router DOM
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (JSON Web Token)
* Bcrypt
* Nodemailer

---

## 🔐 Authentication Flow

### 1. Register

* User registers with name, email & password
* OTP is generated and sent to email
* Account remains unverified

### 2. Email Verification

* User enters OTP
* Account is marked as verified

### 3. Login

* Verified users can login
* JWT token generated and stored

### 4. Logout

* JWT token removed from client

### 5. Reset Password

* User requests password reset
* OTP sent to registered email
* OTP verification
* New password creation

---

## 📦 Installation & Setup

### Backend Setup

```bash
cd server
npm install
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

---

## 🔐 Security Practices

* Password hashing using **bcrypt**
* JWT token authentication
* OTP expiry handling
* Protected routes with middleware
* Token validation

---

## 📌 Future Enhancements

* 🔐 Refresh Token Implementation
* 🧾 Login Activity Logs
* 📱 Phone OTP Authentication
* 🔑 Social Login (Google, GitHub)
* 🧠 AI-based Fraud Detection
* 👥 Role-Based Access Control (RBAC)

---

## 🧑‍💻 Author

**Mayur**
Node.js Backend Developer

---

> 💡 This project is ideal for learning real-world authentication flows and building secure MERN applications.
