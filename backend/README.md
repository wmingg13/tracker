# 🏋️ Gym Tracker Backend - Complete Setup Guide

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## 🚀 Step-by-Step Setup

### 1. Create Project Folder

```bash
mkdir gym-tracker-backend
cd gym-tracker-backend
```

### 2. Initialize NestJS Project

```bash
# Install NestJS CLI globally (if not already installed)
npm install -g @nestjs/cli

# Create new NestJS project
nest new . --skip-git

# When asked "Which package manager would you like to use?", choose npm or yarn
```

### 3. Install Dependencies

```bash
npm install @nestjs/config @prisma/client class-validator class-transformer
npm install -D prisma
```

### 4. Initialize Prisma

```bash
npx prisma init
```

### 5. Setup PostgreSQL Database

**Option A: Local PostgreSQL**
```bash
# Install PostgreSQL from https://www.postgresql.org/download/

# Create database
psql -U postgres
CREATE DATABASE gym_tracker;
\q
```

**Option B: Docker PostgreSQL**
```bash
docker run --name gym-tracker-db \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=gym_tracker \
  -p 5432:5432 \
  -d postgres:15
```

### 6. Configure Environment Variables

Create `.env` file in project root:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/gym_tracker?schema=public"
PORT=8080
FRONTEND_URL="http://localhost:3000"
```

**Replace:**
- `username` with your PostgreSQL username (default: `postgres`)
- `password` with your PostgreSQL password

### 7. Create Project Structure

```bash
# Create folders
mkdir -p src/client/dto
mkdir -p src/prisma

# Create files (copy content from artifacts)
touch src/client/client.controller.ts
touch src/client/client.service.ts
touch src/client/client.module.ts
touch src/client/dto/client.dto.ts
touch src/prisma/prisma.service.ts
touch src/prisma/prisma.module.ts
```

### 8. Copy All Files

Copy the content from each artifact into the corresponding files:

```
gym-tracker-backend/
├── prisma/
│   └── schema.prisma          ← Copy from "schema.prisma" artifact
├── src/
│   ├── client/
│   │   ├── dto/
│   │   │   └── client.dto.ts  ← Copy from "client.dto.ts" artifact
│   │   ├── client.controller.ts ← Copy from "client.controller.ts" artifact
│   │   ├── client.service.ts    ← Copy from "client.service.ts" artifact
│   │   └── client.module.ts     ← Copy from "client.module.ts" artifact
│   ├── prisma/
│   │   ├── prisma.service.ts    ← Copy from "prisma.service.ts" artifact
│   │   └── prisma.module.ts     ← Copy from "prisma.module.ts" artifact
│   ├── app.module.ts            ← Copy from "app.module.ts" artifact
│   └── main.ts                  ← Copy from "main.ts" artifact
├── .env                         ← Copy from ".env" artifact
└── package.json                 ← Merge with "package.json" artifact
```

### 9. Generate Prisma Client

```bash
npx prisma generate
```

### 10. Run Database Migration

```bash
npx prisma migrate dev --name init
```

This will create the database tables.

### 11. Start the Backend

```bash
npm run start:dev
```

You should see:
```
✅ Database connected successfully
🚀 Application is running on: http://localhost:8080
```

## 🧪 Test the API

### Using cURL:

**Get Client List:**
```bash
curl http://localhost:8080/client/getClientList
```

**Add Client:**
```bash
curl -X POST http://localhost:8080/client/addClient \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "age": 30,
    "gender": "male",
    "joinDate": "2024-01-01",
    "goals": "Build muscle and lose fat",
    "records": []
  }'
```

**Get Single Client:**
```bash
curl http://localhost:8080/client/getClient/1
```

**Search Client:**
```bash
curl http://localhost:8080/client/searchClient/John
```

**Update Client:**
```bash
curl -X PUT http://localhost:8080/client/editClient \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "name": "John Doe Updated",
    "email": "john@example.com",
    "phone": "+1234567890",
    "age": 31,
    "gender": "male",
    "joinDate": "2024-01-01",
    "goals": "Updated goals",
    "records": []
  }'
```

## 📊 Prisma Studio (Database GUI)

View and edit data visually:

```bash
npx prisma studio
```

Opens at: http://localhost:5555

## 🔍 Useful Commands

```bash
# View database in terminal
npx prisma db pull

# Reset database (WARNING: Deletes all data)
npx prisma migrate reset

# Format Prisma schema
npx prisma format

# Check database connection
npx prisma db push

# Generate Prisma Client after schema changes
npx prisma generate
```

## 📁 Project Structure

```
gym-tracker-backend/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── client/
│   │   ├── dto/
│   │   │   └── client.dto.ts
│   │   ├── client.controller.ts
│   │   ├── client.service.ts
│   │   └── client.module.ts
│   ├── prisma/
│   │   ├── prisma.service.ts
│   │   └── prisma.module.ts
│   ├── app.module.ts
│   └── main.ts
├── .env
├── package.json
└── tsconfig.json
```

## 🐛 Troubleshooting

### Database Connection Failed
```bash
# Check if PostgreSQL is running
pg_isready

# Or for Docker
docker ps

# Test connection
psql -U postgres -d gym_tracker
```

### Port Already in Use
```bash
# Change PORT in .env file
PORT=3001
```

### Prisma Client Not Generated
```bash
npx prisma generate
npm run start:dev
```

## 🔗 Connect Frontend

In your React app's `src/App.js`, the API_BASE_URL is already set to:
```javascript
const API_BASE_URL = 'http://localhost:8080';
```

This will automatically connect to your backend!

## ✅ API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/client/getClientList` | Get all clients |
| GET | `/client/getClient/:clientId` | Get single client |
| GET | `/client/searchClient/:clientName` | Search clients |
| POST | `/client/addClient` | Add new client |
| PUT | `/client/editClient` | Update client |
| DELETE | `/client/deleteClient/:clientId` | Delete client |

## 🎉 You're Done!

Your NestJS backend with Prisma and PostgreSQL is now running!

Start your React frontend and everything should work together! 🚀