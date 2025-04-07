# 🎣 Fishing Scoreboard

A fishing competition scoreboard built with a React frontend and Node.js backend. Comes bundled with Docker Compose for spinning up a local MongoDB instance.

---

## 📦 Installation

You'll need:

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/)

---

### 🐳 1. Install Docker (if you don't have it)

On Debian/Ubuntu:

```bash
sudo apt update
sudo apt install docker.io docker-compose
sudo systemctl enable docker
sudo systemctl start docker
```

---

### 🛠️ 2. Create `.env` for Docker Compose (in root `/`)

Create a `.env` file with the following content:

```env
# .env (root)
MONGO_CONTAINER_NAME=fishing-mongodb
MONGO_PORT=27017
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=password
```

---

### 📁 3. Install Backend and Frontend Dependencies

You can either install everything from the root:

```bash
npm install
```

Or install manually in each subdirectory:

```bash
cd backend/
npm install

cd ../frontend/
npm install
```

---

### 🧱 4. Build the Frontend

```bash
cd frontend/
npm run build
```

This will generate a production-ready frontend in the `dist/` folder, which will be served by the backend.

---

### 🔐 5. Create `.env` for Backend

In `backend/`, create a `.env` file:

```env
# backend/.env
MONGO_URI=mongodb://admin:password@localhost:27017/fishing?authSource=admin
PORT=5000
JWT_SECRET=your_16_character_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_generated_app_password
```

---

### 🧱 6. Start MongoDB with Docker Compose

From the root directory:

```bash
docker-compose up -d
```

This will start the MongoDB container using the credentials provided in the root `.env`.

---

### 🚀 7. Run the Backend Server

You can start the server with Node:

```bash
cd backend/
node index.js
```

Or use a process manager like [PM2](https://pm2.keymetrics.io/) for production with SSL and reverse proxy.

---

## ✅ Done!

Visit `http://localhost:5000` (or your configured port) to see the scoreboard in action.

---
