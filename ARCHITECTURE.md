# Architecture Diagram - LAMB UPEU SIS

## System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                          LAMB UPEU SIS                               │
│              React + Vite + TypeScript Frontend                      │
│                    http://localhost:5173                             │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  │ HTTP/REST API
                                  │ JWT Bearer Auth
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     Quarkus Backend API                              │
│                  http://localhost:8080/api/v1                        │
│                                                                       │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐        │
│  │  Auth Module   │  │ Category Module│  │  User Module   │        │
│  │  /auth/*       │  │ /categories/*  │  │  /users/*      │        │
│  └────────────────┘  └────────────────┘  └────────────────┘        │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  │ JPA/Hibernate
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      PostgreSQL Database                             │
│                         quarkus_db                                   │
└─────────────────────────────────────────────────────────────────────┘
```

## Frontend Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│                         React Application                             │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                      App.tsx (Router)                        │   │
│  │                                                               │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │   │
│  │  │ Public Routes│  │Protected     │  │  Protected   │      │   │
│  │  │              │  │  Routes      │  │   Routes     │      │   │
│  │  │ /login       │  │ /            │  │ /categories  │      │   │
│  │  │ /register    │  │ Dashboard    │  │ /users       │      │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘      │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                   Contexts & State                           │   │
│  │                                                               │   │
│  │  ┌──────────────────────────────────────────────────────┐   │   │
│  │  │ AuthContext                                           │   │   │
│  │  │ - user: UserInfo                                     │   │   │
│  │  │ - isAuthenticated: boolean                           │   │   │
│  │  │ - login(), register(), logout()                      │   │   │
│  │  └──────────────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                   Services Layer                             │   │
│  │                                                               │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │   │
│  │  │ AuthService  │  │CategorySvc   │  │ UserService  │      │   │
│  │  │              │  │              │  │              │      │   │
│  │  │ login()      │  │ getAll()     │  │ getAll()     │      │   │
│  │  │ register()   │  │ getById()    │  │ getById()    │      │   │
│  │  │ refresh()    │  │ create()     │  │ create()     │      │   │
│  │  │ logout()     │  │ update()     │  │ update()     │      │   │
│  │  │              │  │ delete()     │  │ delete()     │      │   │
│  │  │              │  │              │  │ getStats()   │      │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘      │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                  │                                   │
│                                  ▼                                   │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    Axios Client (api.ts)                     │   │
│  │                                                               │   │
│  │  - Request Interceptor: Add JWT token to headers            │   │
│  │  - Response Interceptor: Handle 401, auto-refresh token     │   │
│  │  - Base URL: http://localhost:8080/api/v1                   │   │
│  └─────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
App
├── AuthProvider (Context)
│   └── Router
│       ├── Login (Public)
│       ├── Register (Public)
│       └── ProtectedRoute
│           └── Layout
│               ├── Navbar
│               │   ├── Navigation Links
│               │   ├── User Info
│               │   └── Logout Button
│               │
│               └── Main Content
│                   ├── Dashboard
│                   │   ├── Welcome Section
│                   │   ├── Quick Links Cards
│                   │   └── System Info
│                   │
│                   ├── Categories Module
│                   │   ├── CategoryList
│                   │   ├── CategoryCreate
│                   │   ├── CategoryEdit
│                   │   └── CategoryView
│                   │
│                   └── Users Module
│                       ├── UserList
│                       ├── UserCreate
│                       ├── UserEdit
│                       ├── UserView
│                       └── UserStats
```

## Data Flow

### 1. Authentication Flow

```
┌────────┐     login()      ┌──────────┐     POST /auth/login    ┌─────────┐
│ User   │ ──────────────> │ Login    │ ────────────────────────> │ Backend │
│        │                  │ Page     │                           │   API   │
└────────┘                  └──────────┘                           └─────────┘
                                  │                                     │
                                  │                                     │
                                  │    {accessToken, refreshToken}     │
                                  │ <───────────────────────────────── │
                                  │
                                  ▼
                         ┌──────────────────┐
                         │  AuthContext     │
                         │  - Set user      │
                         │  - Store tokens  │
                         └──────────────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │  localStorage    │
                         │  - accessToken   │
                         │  - refreshToken  │
                         │  - user          │
                         └──────────────────┘
```

### 2. Authenticated Request Flow

```
┌────────┐   action()   ┌──────────┐   service.method()  ┌──────────┐
│ User   │ ──────────> │   Page   │ ─────────────────> │ Service  │
│        │              │Component │                     │  Class   │
└────────┘              └──────────┘                     └──────────┘
                                                               │
                                                               ▼
                                                      ┌─────────────────┐
                                                      │ Axios Client    │
                                                      │ + Interceptors  │
                                                      └─────────────────┘
                                                               │
                         ┌─────────────────────────────────────┤
                         │                                     │
                         ▼                                     ▼
            ┌──────────────────────┐            ┌──────────────────────┐
            │ Request Interceptor  │            │Response Interceptor  │
            │ - Get accessToken    │            │ - Check 401 error    │
            │ - Add to headers     │            │ - Try refresh token  │
            └──────────────────────┘            │ - Retry or logout    │
                         │                       └──────────────────────┘
                         │
                         ▼
            ┌──────────────────────┐
            │ Backend API          │
            │ Authorization:       │
            │ Bearer {token}       │
            └──────────────────────┘
```

### 3. CRUD Operation Flow (Example: Categories)

```
User Action                  Component                   Service                    Backend
    │                            │                          │                          │
    │ Click "Create Category"    │                          │                          │
    ├───────────────────────────>│                          │                          │
    │                            │                          │                          │
    │                            │ Fill form & submit       │                          │
    │                            │                          │                          │
    │                            │ CategoryService.create() │                          │
    │                            ├─────────────────────────>│                          │
    │                            │                          │                          │
    │                            │                          │ POST /categories         │
    │                            │                          ├─────────────────────────>│
    │                            │                          │                          │
    │                            │                          │   {id, name, ...}        │
    │                            │                          │<─────────────────────────┤
    │                            │   CategoryResponse       │                          │
    │                            │<─────────────────────────┤                          │
    │                            │                          │                          │
    │  Navigate to /categories   │                          │                          │
    │<───────────────────────────┤                          │                          │
```

## API Endpoints Mapping

### Auth Endpoints
```
Frontend Service          →  Backend Endpoint
─────────────────────────────────────────────────────────
AuthService.login()       →  POST   /api/v1/auth/login
AuthService.register()    →  POST   /api/v1/auth/register
AuthService.refreshToken()→  POST   /api/v1/auth/refresh
AuthService.logout()      →  POST   /api/v1/auth/logout
AuthService.validateToken→  GET    /api/v1/auth/validate
AuthService.getCurrentUser→  GET    /api/v1/auth/me
```

### Category Endpoints
```
Frontend Service                →  Backend Endpoint
─────────────────────────────────────────────────────────────
CategoryService.getAll()        →  GET    /api/v1/categories
CategoryService.getById(id)     →  GET    /api/v1/categories/{id}
CategoryService.create(data)    →  POST   /api/v1/categories
CategoryService.update(id,data) →  PUT    /api/v1/categories/{id}
CategoryService.delete(id)      →  DELETE /api/v1/categories/{id}
CategoryService.ping()          →  GET    /api/v1/categories/ping
```

### User Endpoints
```
Frontend Service                    →  Backend Endpoint
─────────────────────────────────────────────────────────────────────
UserService.getAll(status?,role?)   →  GET    /api/v1/users
UserService.getById(id)             →  GET    /api/v1/users/{id}
UserService.getByUsername(username) →  GET    /api/v1/users/username/{username}
UserService.create(data)            →  POST   /api/v1/users
UserService.update(id,data)         →  PUT    /api/v1/users/{id}
UserService.changePassword(id,data) →  PUT    /api/v1/users/{id}/password
UserService.updateLastLogin(id)     →  PUT    /api/v1/users/{id}/last-login
UserService.delete(id)              →  DELETE /api/v1/users/{id}
UserService.getStats()              →  GET    /api/v1/users/stats
```

## Technology Stack

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend Layer                        │
│                                                          │
│  React 18.3                  (UI Library)               │
│  TypeScript 5.6              (Type Safety)              │
│  Vite 7.1                    (Build Tool)               │
│  React Router DOM 7.1        (Routing)                  │
│  Axios 1.7                   (HTTP Client)              │
│  React Hook Form 7.54        (Forms)                    │
│  Zod 3.24                    (Validation)               │
└─────────────────────────────────────────────────────────┘
                            │
                            │ HTTP/REST
                            ▼
┌─────────────────────────────────────────────────────────┐
│                    Backend Layer                         │
│                                                          │
│  Quarkus 3.x                 (Framework)                │
│  Java 21                     (Language)                 │
│  Jakarta EE                  (Specifications)           │
│  JWT                         (Authentication)           │
│  Hibernate                   (ORM)                      │
└─────────────────────────────────────────────────────────┘
                            │
                            │ JPA
                            ▼
┌─────────────────────────────────────────────────────────┐
│                   Database Layer                         │
│                                                          │
│  PostgreSQL 13+              (Database)                 │
└─────────────────────────────────────────────────────────┘
```

## Deployment Architecture (Future)

```
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│   Browser    │         │   Browser    │         │   Browser    │
└──────┬───────┘         └──────┬───────┘         └──────┬───────┘
       │                        │                        │
       └────────────────────────┴────────────────────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │   CDN / Static Host   │
                    │   (React App)         │
                    │   - Vercel / Netlify  │
                    └───────────────────────┘
                                │
                                │ API Calls
                                ▼
                    ┌───────────────────────┐
                    │   Load Balancer       │
                    └───────────────────────┘
                                │
                ┌───────────────┴───────────────┐
                ▼                               ▼
    ┌─────────────────────┐       ┌─────────────────────┐
    │ Quarkus Instance 1  │       │ Quarkus Instance 2  │
    └─────────────────────┘       └─────────────────────┘
                │                               │
                └───────────────┬───────────────┘
                                ▼
                    ┌───────────────────────┐
                    │   PostgreSQL DB       │
                    │   (with replication)  │
                    └───────────────────────┘
```

This architecture provides a scalable, maintainable, and production-ready full-stack application!
