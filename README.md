<div align="center">
  <img src="medilink_frontend/public/favicon.ico" alt="NovaCare Logo" width="100"/>
  <h1>🏥 NovaCare Enterprise Hospital System</h1>
  <p><strong>A Modern, Real-Time Healthcare & Patient Portal Architecture</strong></p>

  <p>
    <a href="#features">Features</a> •
    <a href="#architecture">Architecture</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#deployment">Deployment</a>
  </p>
</div>

<br/>

## 📖 Overview

**NovaCare** (formerly MediLink) is a complete, enterprise-grade hospital management system and patient portal. Built to mirror the architecture of real-world institutional healthcare providers (like Mayo Clinic or MyChart), NovaCare seamlessly integrates a public-facing hospital directory with a secure, authenticated patient dashboard. 

Patients can browse departments, securely log in to their private portal, book appointments with specialists, and order prescriptions directly from the hospital pharmacy.

---

## ✨ Enterprise Features

### 🛡️ Secure Patient Portal
- **Role-Based Authentication**: Secure JWT-based login for Patients and Administrators.
- **Private Dashboard**: All sensitive actions (booking, pharmacy) are locked behind the authenticated portal interface.

### 🩺 Advanced Appointment Booking
- **Doctor Directory**: Search and filter doctors by specialty, experience, and department.
- **Real-Time Booking**: Book appointments securely within the patient portal.

### 💊 Integrated Pharmacy
- **Medication Catalog**: Browse available medicines, prescriptions, and medical supplies.
- **Direct Ordering**: Patients can request refills and place orders seamlessly.

### 🏥 Institutional UI/UX
- **Modern Aesthetics**: Built with a custom "Ocean / Medical" design system (Emerald, Deep Navy, Clinical White).
- **Glassmorphism & Micro-animations**: State-of-the-art frontend styling using Tailwind CSS v3.
- **Emergency Ready**: Features realistic institutional alerts (e.g., Live ER Wait Times) and visiting hour policies.

---

## 🏗️ Architecture

NovaCare is built on a modern **MERN** stack microservice architecture, heavily optimized for testing, containerization, and cloud deployment.

### 💻 Tech Stack
* **Frontend**: React 18, Vite (Lightning-fast bundler), Tailwind CSS v3, React Router v6.
* **Backend**: Node.js v18, Express.js (Modularized architecture), JWT Auth, Bcrypt.
* **Database**: MongoDB (Mongoose ODM).
* **Testing**: Native `node:test` runner with `Supertest` and zero-dependency Mongoose mocking.
* **Orchestration**: Docker & Docker Compose (Multi-stage Nginx builds).

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- [Node.js (v18+)](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)
- [Docker](https://www.docker.com/) (Optional, for containerized run)

### 1. Clone the Repository
```bash
git clone https://github.com/HasnatKhan010/NovaCare-Hospital-Management.git
cd NovaCare-Hospital-Management
```

### 2. Run with Docker (Recommended)
If you have Docker installed, you can spin up the entire stack (Database, Backend, Frontend) with a single command:
```bash
docker-compose up -d --build
```
*Frontend will be available at `http://localhost`*<br/>
*Backend API will be available at `http://localhost:5000`*

### 3. Run Manually

**Backend:**
```bash
cd MediLink_Backend
npm install
# Set your MONGO_URI in a .env file
npm start
```

**Frontend:**
```bash
cd medilink_frontend
npm install
npm run dev
```

---

## 🧪 Testing

The backend is equipped with a blazingly fast, zero-dependency integration test suite that utilizes Mongoose mocking to test the API controllers without needing a live database connection.

```bash
cd MediLink_Backend
npm test
```
*Tests execute in < 2 seconds.*

---

## ☁️ Deployment

NovaCare is pre-configured for free-tier cloud deployment using Infrastructure-as-Code.

1. **Backend (Render)**: Deploy directly to Render.com. The included `render.yaml` blueprint will automatically provision the Node web service.
2. **Frontend (Vercel)**: Deploy to Vercel. The included `vercel.json` ensures that React Router SPA rewrites are handled perfectly on Vercel's Edge network.
3. **Database**: Use a free M0 cluster on MongoDB Atlas.

---

<div align="center">
  <sub>Built with ❤️ for modern healthcare.</sub>
</div>
