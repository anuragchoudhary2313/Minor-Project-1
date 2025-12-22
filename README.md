<div align="center">

# 🍔 GoFood - Food Delivery Application

### A Modern MERN Stack Food Ordering Platform

[![JavaScript](https://img.shields.io/badge/JavaScript-93.0%25-yellow?style=flat&logo=javascript)](https://github.com/anuragchoudhary2313/Minor-Project-1)
[![React](https://img.shields.io/badge/React-18.0.0-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=flat&logo=mongodb)](https://www.mongodb.com/)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Usage](#-usage) • [Contributing](#-contributing)

</div>

---

## 📖 About The Project

**GoFood** is a full-stack food delivery application built as a Minor Project for 3rd year. This web application allows users to browse restaurants, order food, and track their orders in real-time.

### ✨ Key Highlights

- 🎨 Modern and responsive UI with React and Material-UI
- 🔐 Secure authentication using JWT
- 🛒 Shopping cart functionality
- 📱 Mobile-friendly responsive design
- 🌓 Dark mode support with Bootstrap Dark
- ⚡ Fast and optimized performance

---

## 🚀 Features

### User Features
- 👤 **User Authentication** - Register, login, and manage user profiles
- 🍕 **Browse Menu** - View available food items and restaurants
- 🛒 **Shopping Cart** - Add, remove, and manage cart items
- 💳 **Order Placement** - Place orders with multiple payment options
- 📜 **Order History** - Track current and past orders

### Technical Features
- ⚡ **RESTful API** - Well-structured backend API
- 🔒 **Secure Routes** - Protected routes with JWT authentication
- 📊 **Data Validation** - Input validation using Express Validator
- 🎯 **State Management** - Efficient state handling in React
- 📱 **Responsive Design** - Works seamlessly on all devices

---

## 🛠️ Tech Stack

### Frontend
```javascript
{
  "framework": "React 18.0.0",
  "styling": ["Bootstrap 5", "Material-UI", "Bootstrap Dark"],
  "routing": "React Router DOM v6",
  "http-client": "Axios"
}
```

### Backend
```javascript
{
  "runtime": "Node.js",
  "framework": "Express.js",
  "database": "MongoDB with Mongoose",
  "authentication": "JWT (jsonwebtoken)",
  "password-hashing": "bcryptjs",
  "validation": "Express Validator"
}
```

### Languages
- **JavaScript**: 93.0%
- **HTML**: 4.4%
- **CSS**: 2.6%

---

## 📦 Installation

### Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/anuragchoudhary2313/Minor-Project-1.git
   cd Minor-Project-1/Gofood
   ```

2. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Configure Environment Variables**
   
   Create a `.env` file in the `backend` directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

5. **Start the Development Servers**
   
   Terminal 1 (Frontend):
   ```bash
   npm start
   ```
   
   Terminal 2 (Backend):
   ```bash
   cd backend
   nodemon index.js
   ```

6. **Access the Application**
   
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## 💻 Usage

### Running the Application

#### Development Mode
```bash
# Frontend (from Gofood directory)
npm start

# Backend (from Gofood/backend directory)
nodemon index.js
```

#### Production Build
```bash
# Create optimized production build
npm run build
```

### Testing
```bash
# Run tests
npm test
```

---

## 📁 Project Structure

```
Minor-Project-1/
└── Gofood/
    ├── backend/
    │   ├── models/           # Database models
    │   ├── routes/           # API routes
    │   ├── middleware/       # Custom middleware
    │   ├── package.json      # Backend dependencies
    │   └── index.js          # Server entry point
    ├── public/               # Static files
    ├── src/
    │   ├── components/       # React components
    │   ├── screens/          # Page components
    │   ├── App.js            # Main App component
    │   └── index.js          # React entry point
    ├── package.json          # Frontend dependencies
    └── README.md
```

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is created for educational purposes as a Minor Project.

---

## 👤 Author

**Anurag Choudhary**

- GitHub: [@anuragchoudhary2313](https://github.com/anuragchoudhary2313)
- Backend Credits: Arshdeep Singh

---

## 🙏 Acknowledgments

- [React Documentation](https://reactjs.org/)
- [Material-UI](https://mui.com/)
- [Bootstrap](https://getbootstrap.com/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

---

## 📊 Project Stats

<div align="center">

![Repository Size](https://img.shields.io/github/repo-size/anuragchoudhary2313/Minor-Project-1?style=flat-square)
![Last Commit](https://img.shields.io/github/last-commit/anuragchoudhary2313/Minor-Project-1?style=flat-square)
![Stars](https://img.shields.io/github/stars/anuragchoudhary2313/Minor-Project-1?style=social)
![Forks](https://img.shields.io/github/forks/anuragchoudhary2313/Minor-Project-1?style=social)

</div>

---

<div align="center">

### ⭐ If you found this project helpful, please consider giving it a star!

**Made with ❤️ for learning and innovation**

</div>
