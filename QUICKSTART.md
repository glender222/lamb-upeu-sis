# Quick Start Guide - LAMB UPEU SIS

Esta guía te ayudará a ejecutar tanto el backend como el frontend de la aplicación.

## Requisitos Previos

- Java 21+
- PostgreSQL 13+
- Node.js 18+
- npm

## Paso 1: Configurar Base de Datos

```sql
CREATE DATABASE quarkus_db;
CREATE USER postgres WITH PASSWORD '12345678';
GRANT ALL PRIVILEGES ON DATABASE quarkus_db TO postgres;
```

## Paso 2: Iniciar Backend

```bash
# En el directorio raíz del proyecto
./gradlew quarkusDev
```

El backend estará disponible en `http://localhost:8080`

### Endpoints principales del backend:

- Swagger UI: `http://localhost:8080/q/swagger-ui/`
- API Base: `http://localhost:8080/api/v1/`
- Auth: `http://localhost:8080/api/v1/auth/`
- Categories: `http://localhost:8080/api/v1/categories/`
- Users: `http://localhost:8080/api/v1/users/`

## Paso 3: Iniciar Frontend

En una nueva terminal:

```bash
# Navegar al directorio frontend
cd frontend

# Instalar dependencias (solo la primera vez)
npm install

# Copiar configuración de entorno
cp .env.example .env

# Iniciar servidor de desarrollo
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

## Paso 4: Probar la Aplicación

### 1. Registrar un Usuario

1. Abre `http://localhost:5173` en tu navegador
2. Haz clic en "Register here"
3. Completa el formulario de registro:
   - Username: `admin123`
   - Email: `admin@example.com`
   - Password: `password123`
   - First Name: `Admin`
   - Last Name: `User`
   - Phone: `+51987654321`
   - Role: `ADMIN`
4. Haz clic en "Register"

### 2. Iniciar Sesión

Si ya tienes una cuenta:

1. Ve a `http://localhost:5173/login`
2. Ingresa tus credenciales
3. Haz clic en "Login"

### 3. Explorar las Funcionalidades

Una vez autenticado, puedes:

- **Dashboard**: Ver información general y enlaces rápidos
- **Categories**: 
  - Ver lista de categorías
  - Crear nuevas categorías
  - Editar categorías existentes
  - Ver detalles de una categoría
  - Eliminar categorías
- **Users**:
  - Ver lista de usuarios
  - Crear nuevos usuarios
  - Editar perfiles de usuario
  - Ver detalles de usuario
  - Ver estadísticas de usuarios
  - Filtrar por rol o estado

## Estructura de la Aplicación

```
lamb-upeu-sis/
├── src/                      # Backend (Quarkus/Java)
│   ├── main/java/upeu/edu/pe/
│   │   ├── catalog/         # Módulo de categorías
│   │   ├── security/        # Módulo de seguridad/usuarios
│   │   └── shared/          # Componentes compartidos
│   └── main/resources/
└── frontend/                # Frontend (React/TypeScript)
    ├── src/
    │   ├── pages/          # Páginas de la aplicación
    │   ├── services/       # Servicios API
    │   ├── components/     # Componentes reutilizables
    │   └── contexts/       # Contextos de React
    └── package.json
```

## Arquitectura de Autenticación

1. **Login/Registro** → Backend genera JWT access token + refresh token
2. **Frontend** almacena tokens en localStorage
3. **Todas las peticiones** incluyen el access token en header `Authorization: Bearer <token>`
4. **Auto-refresh** → Si el token expira, se usa el refresh token automáticamente
5. **Logout** → Tokens se eliminan y se redirige a login

## Comandos Útiles

### Backend

```bash
# Modo desarrollo
./gradlew quarkusDev

# Compilar
./gradlew build

# Limpiar
./gradlew clean

# Tests
./gradlew test
```

### Frontend

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build producción
npm run build

# Preview build
npm run preview

# Lint
npm run lint
```

## Solución de Problemas

### Backend no inicia

1. Verificar que PostgreSQL esté corriendo
2. Verificar credenciales en `application.properties`
3. Verificar que el puerto 8080 esté disponible

### Frontend no conecta con Backend

1. Verificar que backend esté corriendo en `http://localhost:8080`
2. Revisar archivo `.env` en frontend: `VITE_API_BASE_URL=http://localhost:8080/api/v1`
3. Verificar configuración CORS en backend

### Error de CORS

El backend debe permitir peticiones desde `http://localhost:5173`. Verificar configuración de CORS en el backend.

### Tokens no se refrescan

1. Verificar que el endpoint `/api/v1/auth/refresh` esté funcionando
2. Revisar que el refresh token sea válido
3. Comprobar en consola del navegador si hay errores

## Datos de Prueba

Puedes crear usuarios de prueba con diferentes roles:

### Admin
- Username: `admin123`
- Password: `password123`
- Role: ADMIN

### Manager
- Username: `manager123`
- Password: `password123`
- Role: MANAGER

### User Regular
- Username: `user123`
- Password: `password123`
- Role: USER

## Próximos Pasos

1. Explora todas las páginas de la aplicación
2. Crea categorías de prueba
3. Gestiona usuarios con diferentes roles
4. Revisa las estadísticas de usuarios
5. Prueba el flujo completo de autenticación (login → uso → logout)

## Documentación Adicional

- Backend: Ver README.md principal
- Frontend: Ver frontend/README.md
- API: Swagger UI en `http://localhost:8080/q/swagger-ui/`
