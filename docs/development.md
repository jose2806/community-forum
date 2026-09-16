# Desarrollo

Esta guía describe el entorno local del prototipo. Docker Compose es el camino recomendado porque configura conjuntamente frontend, backend y PostgreSQL.

## Prerrequisitos

- Docker con Docker Compose.
- Git.
- Node.js 22 y pnpm 11.24.0 para desarrollo sin Docker.

## Arranque con Docker Compose

Construye las imágenes de desarrollo e inicia los servicios:

```sh
docker compose build
docker compose up -d
```

## URLs locales

- Frontend: <http://localhost:5173>
- Health check del backend: <http://localhost:3000/health>
- PostgreSQL: `localhost:5432`

## Apagado

Detén los servicios sin eliminar el volumen de datos de PostgreSQL:

```sh
docker compose down
```

Usa `docker compose down -v` únicamente si quieres restablecer intencionadamente la base de datos local; este comando elimina el volumen persistente `postgres_data`.

## Desarrollo sin Docker

PostgreSQL debe estar disponible y la variable `DATABASE_URL` debe apuntar a esa instancia. Compose sigue siendo la opción recomendada.

En una terminal, prepara y arranca el frontend:

```sh
cd frontend
pnpm install
pnpm dev
```

En otra terminal, prepara y arranca el backend:

```sh
cd backend
pnpm install
cp .env.example .env
pnpm dev
```

En PowerShell, la copia equivalente es `Copy-Item .env.example .env`.

## Variables de entorno

`backend/.env.example` documenta las variables principales:

- `DATABASE_URL`: cadena de conexión de PostgreSQL.
- `FRONTEND_URL`: uno o varios orígenes permitidos por CORS, separados por comas.
- `PORT`: puerto del backend; por defecto se usa `3000`.

## Validación

Ejecuta los comandos desde el directorio indicado:

```sh
cd backend
pnpm build

cd ../frontend
pnpm lint
pnpm build
```

## Migraciones de Drizzle

Después de cambiar el esquema, genera una migración desde el contenedor del backend:

```sh
docker compose exec backend pnpm db:generate
```

Cuando PostgreSQL esté saludable, aplica explícitamente las migraciones pendientes:

```sh
docker compose exec backend pnpm db:migrate
```

Las migraciones se generan después de cambios en el esquema y se aplican de forma explícita; iniciar Compose no implica ejecutar migraciones automáticamente.

## Diagnóstico básico

- Comprueba el estado de los servicios con `docker compose ps`.
- Revisa los registros con `docker compose logs backend` o `docker compose logs frontend`.
- Si el backend no responde, verifica primero que PostgreSQL aparezca como saludable con `docker compose ps`.
- Confirma que `FRONTEND_URL` coincida con el origen desde el que abres el frontend.
