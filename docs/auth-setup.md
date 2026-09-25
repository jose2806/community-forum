# Identidad y sesiones (Issue #1) — Guía de uso

Este documento explica cómo levantar y probar en local el schema de
autenticación (`user`, `profile`, `session`, `account`, `verification`)
agregado en este PR, y cómo generar nuevas migraciones si el schema cambia
más adelante.

## Requisitos previos

- Node 22
- pnpm 11.24.0 (`corepack enable` si no lo tenés configurado)
- Docker + Docker Compose

## 1. Instalar dependencias

Desde la raíz del repo:

```bash
pnpm install
```

Esto instala las dependencias nuevas (`better-auth`, `drizzle-orm`,
`drizzle-kit`) tanto en la raíz como en `backend`, gracias al workspace
de pnpm.

## 2. Variables de entorno

Copiá el `.env.example` de `backend/` a `.env` (si aún no lo tenés) y
confirmá que exista la variable de conexión a Postgres, por ejemplo:

```
DATABASE_URL=postgres://usuario:password@localhost:5432/community_forum
```

## 3. Levantar Postgres

```bash
docker compose up -d
```

Verificá que el contenedor de Postgres esté corriendo:

```bash
docker compose ps
```

## 4. Aplicar la migración

Este PR ya incluye la migración generada
(`backend/drizzle/0000_zippy_violations.sql`), así que **no hace falta
generarla de nuevo** — solo aplicarla:

```bash
cd backend
pnpm drizzle-kit migrate
```

Esto crea las tablas `user`, `profile`, `session`, `account` y
`verification` en la base de datos.

### Probar contra una base limpia (recomendado antes de aprobar el PR)

```bash
docker compose down -v   # borra el volumen de Postgres, base 100% vacía
docker compose up -d
cd backend
pnpm drizzle-kit migrate
```

Si corre sin errores sobre una base vacía, el schema está bien formado.

## ¿El schema cambió? Cómo generar una nueva migración

Si en el futuro modificás algo en `backend/src/db/schema/auth.ts`:

```bash
cd backend
pnpm drizzle-kit generate
```

Esto crea un nuevo archivo SQL en `backend/drizzle/` con solo el diff
respecto a la migración anterior. **No edites a mano las migraciones ya
aplicadas** — si necesitás corregir algo, generá una migración nueva.

Luego aplicá el cambio local con:

```bash
pnpm drizzle-kit migrate
```

## Nota sobre el perfil (`profile`)

La tabla `profile` (alias, avatar, bio) se creó en el schema, pero **la
creación automática de un `profile` al registrarse un usuario todavía no
está implementada** — queda pendiente de definir si va en este mismo PR o
en un issue aparte. Si tu feature depende de que todo usuario tenga un
`profile`, confirmá el estado antes de asumir que ya existe.

## Troubleshooting rápido

| Problema | Causa probable |
|---|---|
| `pnpm drizzle-kit migrate` falla con error de conexión | Postgres no está corriendo o `DATABASE_URL` está mal |
| La migración no crea las tablas de Better Auth | Revisá que `drizzle.config.ts` apunte al archivo correcto de schema |
| `sign-up/email` da 404 | El backend no está montando las rutas de `auth` — revisá `backend/src/lib/auth.ts` y su integración en el router principal |