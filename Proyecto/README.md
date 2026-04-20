# Centro Médico Apollo — Guía de instalación y uso

## Requisitos previos

- PHP 8.2 o superior
- Composer
- Node.js 18 o superior y npm
- XAMPP (Apache + MySQL)

---

## Configuración inicial

### 1. Clonar o descargar el proyecto

Colocar la carpeta del proyecto en:
```
C:\xampp\htdocs\Tecnologias\Proyecto\
```

### 2. Configurar variables de entorno del backend

Entrar a la carpeta `backend/` y copiar el archivo de ejemplo:
```bash
cd backend
copy .env.example .env
```

Abrir `.env` y configurar la base de datos:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=consultorio_apollo
DB_USERNAME=root
DB_PASSWORD=
```

### 3. Instalar dependencias del backend

```bash
cd backend
composer install
```

### 4. Generar la clave de la aplicación

```bash
php artisan key:generate
```

### 5. Instalar dependencias del frontend

```bash
cd ../frontend
npm install
```

---

## Base de datos y migraciones

> Asegurarse de que MySQL esté corriendo en XAMPP antes de ejecutar estos comandos.

### Crear la base de datos

Abrir phpMyAdmin en `http://localhost/phpmyadmin` y crear una base de datos llamada `consultorio_apollo`.

### Ejecutar todas las migraciones

Crea todas las tablas en la base de datos:
```bash
cd backend
php artisan migrate
```

### Revertir y volver a crear todas las tablas (entorno de desarrollo)

⚠️ Este comando **borra todos los datos** y recrea las tablas desde cero:
```bash
php artisan migrate:fresh
```

### Insertar datos iniciales (doctores)

```bash
php artisan db:seed --class=DoctorSeeder
```

### Ejecutar migraciones y seeders juntos

```bash
php artisan migrate:fresh --seed
```

### Otros comandos útiles de migraciones

| Comando | Descripción |
|---|---|
| `php artisan migrate:status` | Ver el estado de cada migración |
| `php artisan migrate:rollback` | Revertir la última migración |
| `php artisan make:migration nombre` | Crear una nueva migración |
| `php artisan make:model NombreModelo` | Crear un nuevo modelo |
| `php artisan make:controller NombreController` | Crear un nuevo controlador |

---

## Iniciar la aplicación

Se necesitan **dos terminales abiertas al mismo tiempo**.

### Terminal 1 — Servidor backend (Laravel)

```bash
cd backend
php artisan serve
```
php backend/artisan serve

El servidor quedará corriendo en: `http://127.0.0.1:8000`

### Terminal 2 — Servidor frontend (React + Vite)

```bash
cd frontend
npm run dev
cd ..
```
npm run frontend/dev

El servidor quedará corriendo en: `http://localhost:5173`

### Abrir la aplicación

Abrir el navegador y entrar a:
```
http://localhost:5173
```

> ⚠️ Ambos servidores deben estar corriendo al mismo tiempo para que la aplicación funcione correctamente.

---

## Resumen rápido (primer uso)

```bash
# 1. Instalar dependencias
cd backend && composer install
cd ../frontend && npm install

# 2. Configurar .env y crear base de datos en phpMyAdmin

# 3. Correr migraciones y seeders
cd backend
php artisan key:generate
php artisan migrate
php artisan db:seed --class=DoctorSeeder

# 4. Iniciar servidores (en dos terminales separadas)
php artisan serve        # Terminal 1
cd ../frontend
npm run dev              # Terminal 2
```


# Ejecucion:

php /backend/artisan serve

