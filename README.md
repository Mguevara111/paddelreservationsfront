# 🎾 Padel Match - Priority Court Booking & Operational Management System

[Español](#español) | [English](#english)

---

## 🇪🇸 Español

### 📌 Descripción del Proyecto
**Padel Match** es un sistema fullstack de gestión operativa desarrollado para el personal de recepción de un club deportivo. Permite gestionar en tiempo real la disponibilidad y reserva de 4 pistas de pádel (cubiertas y al aire libre), aplicando reglas de negocio complejas como tarifas por iluminación nocturna, alquiler de equipamiento adicional y validación estricta de solapamiento de horarios.

### 🛠️ Tecnologías Utilizadas

#### **Backend**
* **Lenguaje & Runtime:** Node.js, TypeScript.
* **Framework:** Express.js.
* **Base de Datos & Persistencia:** PostgreSQL (driver `pg`), `connect-pg-simple` para persistencia real de sesiones.
* **Autenticación & Seguridad:** `express-session` con cookies `httpOnly` cruzadas (`credentials: 'include'`).
* **Validación de Datos:** Zod.

#### **Frontend**
* **Librería UI:** React 18, TypeScript.
* **Build Tool:** Vite.
* **Estilos:** Tailwind CSS.
* **Gestión de Estado & Rutas:** React Context API, React Router Dom v6.

---

### ✨ Características Principales & Reglas de Negocio
* **Autenticación Basada en Sesiones Persistentes:** Protección de rutas mediante middlewares. Las sesiones no se destruyen al reiniciar el servidor gracias a la tabla `user_sessions` en PostgreSQL.
* **Validación de Solapamiento de Horarios:** Algoritmo matemático basado en rangos de tiempo convertidos a minutos para evitar dobles reservas en una misma pista.
* **Cálculo de Tarifas Dinámicas:**
  * Costo base por hora de pista: **$20**.
  * Recargo por iluminación en Turno Nocturno ($\ge$ 18:00): **+$5/hora**.
  * Adicional fijo por alquiler de palas: **+$6**.
* **Dashboard Operativo & Estadísticas:** Resumen dinámico de pistas reservadas, recaudación total acumulada y reservas nocturnas.
* **Filtros Dinámicos:** Búsqueda rápida por tipo de pista (Cubierta / Aire Libre) y jornada (Mañana / Noche) usando `URLSearchParams`.

---

### ⚙️ Instalación y Configuración Local

#### Prerrequisitos
* Node.js ($\ge$ v18)
* PostgreSQL instanciado en `localhost:5432`

#### 1. Configuración del Backend
```bash
cd backend
npm install

🇬🇧 English
📌 Project Overview
Padel Match is a fullstack operational management system designed for sports club reception personnel. It enables real-time booking and availability tracking across 4 padel courts (indoor and open-air), enforcing complex business logic such as night-time lighting surcharges, equipment rentals, and strict schedule overlap validation.

🛠️ Tech Stack
Backend
Language & Runtime: Node.js, TypeScript.

Framework: Express.js.

Database & Persistence: PostgreSQL (pg driver), connect-pg-simple for persistent session storage.

Authentication & Security: express-session with cross-origin httpOnly cookies (credentials: 'include').

Validation: Zod.

Frontend
UI Library: React 18, TypeScript.

Build Tool: Vite.

Styling: Tailwind CSS.

State & Routing: React Context API, React Router Dom v6.

✨ Key Features & Business Rules
Persistent Session-Based Auth: Protected routes via custom middlewares. User sessions persist across server restarts using PostgreSQL database storage.

Schedule Overlap Prevention: Range-overlap mathematical algorithm converting schedule times to total minutes to prevent duplicate bookings per court.

Dynamic Price Calculation:

Base rate per court hour: $20.

Night Shift Surcharge (>= 18:00): +$5/hour for artificial lighting.

Paddle rental fee: +$6 fixed.

Operational Dashboard & Key Metrics: Live summary of total court reservations, confirmed revenue, and night bookings.

Filter System: Multi-criteria filtering by court type (Roofed / Open-Air) and time slots (Morning / Night) using URLSearchParams.

⚙️ Local Setup Instructions
Prerequisites
Node.js (>= v18)

Active PostgreSQL instance at localhost:5432

1. Backend Setup
Bash
cd backend
npm install
npm run dev
2. Frontend Setup
Bash
cd frontend
npm install
npm run dev
Developed by Marcelo Guevara — Fullstack Developer