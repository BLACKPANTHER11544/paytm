# 💸 Paytm Clone - Full Stack Wallet Application

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat)

A full-stack web application inspired by **Paytm**. This project simulates a digital wallet system where users can securely sign up, maintain a wallet balance, search for other users, and seamlessly transfer virtual money.

---

## ✨ Features

- **🔐 Secure Authentication:** JWT-based user signup and login functionality.
- **💰 Virtual Wallet:** Automatic wallet creation with a mock starting balance upon registration.
- **👥 User Directory:** Search for other registered users on the platform to send money.
- **💸 Peer-to-Peer Transactions:** Transfer funds securely between user accounts with ACID properties (using database transactions).
- **📱 Responsive UI:** Clean, modern, and friendly user interface.
- **🛡️ Protected Routes:** Secure frontend routes and backend endpoints accessible only to authenticated users.

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Tailwind CSS (for styling)
- React Router DOM
- Fetch (for API requests)

**Backend:**
- Node.js
- Express.js
- JSON Web Tokens (JWT) for authentication
- Zod (for input validation)

**Database:**
- PostgreSQL
- PostgreSQL ORM 

---

## 📸 Screenshots



| Login Page | Dashboard Page | Transaction Page | Profile Page | Update Page | SignUp Page |
| :---: | :---: | :---: | :---: | :---: | :---: |
| <img src="https://github.com/BLACKPANTHER11544/paytm/blob/main/frontend/assets/loginPage.png" alt="Login" /> | <img src="https://github.com/BLACKPANTHER11544/paytm/blob/main/frontend/assets/dashboard.png" alt="Dashboard" /> | <img src="https://github.com/BLACKPANTHER11544/paytm/blob/main/frontend/assets/send.png" alt="Transaction" /> |  <img src="https://github.com/BLACKPANTHER11544/paytm/blob/main/frontend/assets/userProfile.png" alt="Profile" /> | <img src="https://github.com/BLACKPANTHER11544/paytm/blob/main/frontend/assets/update.png" alt="Update" /> |<img src="https://github.com/BLACKPANTHER11544/paytm/blob/main/frontend/assets/signUp.png" alt="SignUp" /> |


---

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/en/) (v14 or higher)
- [PostgreSQL (ORM)](https://www.prisma.io/docs/prisma-orm/quickstart/prisma-postgres) (Local instance or NeonDB URI)
- Git

### 1. Clone the repository
```bash
git clone [https://github.com/BLACKPANTHER11544/paytm.git](https://github.com/BLACKPANTHER11544/paytm.git)
cd paytm
