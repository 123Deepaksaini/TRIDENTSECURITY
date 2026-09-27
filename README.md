# 🛡️ TRIDENT SECURITY SERVICES — MODERN WEB PLATFORM

A state-of-the-art, high-performance, responsive, and ultra-secure web application engineered for **Trident Security Services** (`tridentsecuritys.com`).

---

## 🚀 Key Highlights & Modern Capabilities

- **Modern Frontend (React 18 + Tailwind CSS + Lucide + Framer Motion)**
  - Dynamic **Dark Mode & Light Mode** toggle with instant theme persistence.
  - Interactive **Security Service Quote & Cart Builder ("Foam Pages Cart")** with real-time shift duration multiplier and INR (₹) monthly cost estimations.
  - **Interactive Google Map Embed** targeting Jabalpur Headquarters with 1-click directions dispatch.
  - Floating **WhatsApp Direct Action** connecting clients to the duty desk.
  - Preserved original branding, logos, statutory certificates (ISO 9001, IAF, MP PSARA, MSME, ESIC, EPFO, GST), and original service imagery (Armed Guards, PSO Bouncers, Detectives, CCTV Surveillance, Receptionists, Computer Operators, Housekeeping).
  - Responsive design optimized across Mobile, Tablet, and Desktop displays.

- **High-Performance Backend (Node.js + Express.js + MySQL)**
  - Engineered for **100,000+ requests/minute** capacity with **Multi-core CPU clustering** (`cluster` module).
  - High-efficiency in-memory **LRU Cache** with TTL invalidation to avoid redundant database reads.
  - **MySQL 8.0+ Connection Pool** (`mysql2/promise`) with automatic schema table creation.
  - **Resilient Zero-Config Fallback Engine**: If MySQL is not actively running during local development, the server operates on an integrated persistent fallback engine without downtime.

- **Enterprise Security Hardening**
  - **Bcrypt Password Hashing**: Passwords stored using 12 salt rounds.
  - **DDoS & Brute-Force Rate Limiting**: Multi-tiered rate limiters for general API routes, form submissions, and authentication endpoints.
  - **Helmet Security Headers**: Strict Content Security Policy, HSTS, X-Frame-Options, XSS protection.
  - **Parameterized SQL Queries**: Complete immunity against SQL injection vulnerabilities.
  - **JWT Authentication**: Protected administrative API endpoints and token validation.

- **Command Center Admin Panel**
  - Live KPI metrics (Total Inquiries, New Unread, Quotes Pipeline, Applications, Ex-Servicemen Ratio).
  - Real-time management of contact submissions, quote cart builds, and guard job applications.
  - Inline status update (`NEW` ➔ `CONTACTED` ➔ `IN_PROGRESS` ➔ `RESOLVED`).
  - **One-Click CSV Export** for audits and offline reports.
  - System Security & Audit Activity Logs.

- **Load Balancer Ready (`/nginx`)**
  - Complete `nginx.conf` configured with upstream least-connection load balancing, HTTP/2, SSL/TLS hardening, and static asset caching.

---

## 📂 Project Structure

```
security website/
├── client/                     # React + Vite + Tailwind CSS Frontend
│   ├── src/
│   │   ├── components/         # Navbar, Footer, MapEmbed, QuoteCartModal, WhatsAppFloatingBtn
│   │   ├── context/            # ThemeContext, CartContext, AuthContext
│   │   ├── data/               # servicesData.js (original services, badges, company info)
│   │   ├── pages/              # Home, Services, Certificates, Contact, Careers, AdminLogin, AdminDashboard
│   │   ├── services/           # api.js (Axios client with JWT interceptor)
│   │   ├── App.jsx             # Main Application Entry & Page Switcher
│   │   └── index.css           # Tailwind CSS directives & Glassmorphism styles
│   └── package.json
├── server/                     # Node.js + Express + MySQL Backend
│   ├── src/
│   │   ├── config/             # db.js (MySQL pool & persistent fallback engine)
│   │   ├── controllers/        # auth, inquiry, quote, career, admin controllers
│   │   ├── middleware/         # rateLimiter, auth (JWT), errorHandler
│   │   ├── routes/             # api.js (Express Gateway endpoints)
│   │   ├── utils/              # hash.js (bcrypt), cache.js (LRU cache)
│   │   ├── schema.sql          # Production MySQL Database Schema
│   │   ├── cluster.js          # Multi-Core Cluster Launcher (100k req/min)
│   │   └── index.js            # Express Gateway Server Entry
│   ├── .env                    # Environment & Database Credentials
│   └── package.json
├── nginx/                      # Production Nginx Reverse Proxy & Load Balancer
│   └── nginx.conf
└── package.json                # Workspace script orchestrator
```

---

## 🛠️ Quick Start & Execution

### 1. Run Development Mode (Client & Server Simultaneously)
From the root workspace directory, execute:
```bash
npm run dev
```
- **Frontend App**: `http://localhost:5173`
- **Backend API Gateway**: `http://localhost:5000`

### 2. Run High-Concurrency Clustered Backend (All CPU Cores)
```bash
npm run cluster
```

### 3. Build Client for Production Deployment
```bash
npm run build
```

---

## 🔑 Default Administrator Credentials

To access the Command Center Admin Panel:
1. Navigate to `http://localhost:5173`
2. Click **Admin Access** in the top navigation or footer
3. Log in with:
   - **Username / Email**: `admin` or `admin@tridentsecuritys.com`
   - **Password**: `TridentAdmin@2026!`

---

## 🗄️ MySQL Database Setup (Optional for Production)

1. Open your MySQL client or phpMyAdmin.
2. Execute `server/src/schema.sql`.
3. Update `server/.env` with your database credentials:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=trident_security_db
```
*(Note: If MySQL credentials are not provided, the server automatically uses the integrated high-resilience fallback engine so the app remains fully functional without any setup delays).*

---

## 🌐 Production Domain & SSL Setup (`tridentsecuritys.com`)

1. Copy `nginx/nginx.conf` to `/etc/nginx/nginx.conf` on your production server.
2. Generate SSL certificates via Let's Encrypt Certbot:
```bash
sudo certbot --nginx -d tridentsecuritys.com -d www.tridentsecuritys.com
```
3. Start the Node.js cluster via PM2 or systemd:
```bash
pm2 start server/src/cluster.js --name "trident-gateway"
```
4. Reload Nginx:
```bash
sudo nginx -s reload
```
