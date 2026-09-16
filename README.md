# community-forum

Una red social abierta para comunidades que desean fomentar la interacción entre sus miembros.

> **Estado del proyecto:** este repositorio contiene actualmente un prototipo no funcional en desarrollo.

## Estado actual

- El frontend conserva la plantilla inicial de Vite y React.
- El backend es una aplicación Express que expone `GET /health`.
- PostgreSQL se ejecuta mediante Docker Compose.
- Drizzle ORM y Drizzle Kit están configurados, pero el modelo de dominio aún no está definido.
- No existe todavía autenticación, API de dominio ni flujo funcional de publicaciones.

## Visión

Construir un espacio abierto donde distintas comunidades puedan organizarse, compartir publicaciones, conversar y definir reglas de convivencia con herramientas de moderación transparentes. Esta visión se desarrollará por etapas y no representa capacidades disponibles en la versión actual.

## Stack y estructura

- `frontend/`: React 19 servido y construido con Vite 8.
- `backend/`: Express 5 y TypeScript 7, con Drizzle ORM/Kit.
- PostgreSQL 17: persistencia local proporcionada por Compose.
- Docker Compose: entorno local con frontend, backend y base de datos.
- Node.js 22 y pnpm 11.24.0: herramientas de desarrollo.

```text
.
├── frontend/             # Aplicación React/Vite
├── backend/              # API Express y configuración Drizzle
├── docs/                 # Desarrollo, arquitectura y roadmap
├── docker-compose.yml    # Servicios locales
├── CONTRIBUTING.md       # Guía para colaboradores
├── LICENSE               # Licencia MIT
└── .gitignore
```

## Inicio rápido

### Requisitos

- Git
- Docker con Docker Compose
- Node.js 22 y pnpm 11.24.0 para ejecutar servicios fuera de Docker

### Con Docker Compose

```sh
docker compose build
docker compose up -d
```

URLs locales:

- Frontend: <http://localhost:5173>
- Health check del backend: <http://localhost:3000/health>
- PostgreSQL: `localhost:5432`

Para detener los servicios sin eliminar los datos locales:

```sh
docker compose down
```

Consulta [`docs/development.md`](docs/development.md) para variables de entorno, ejecución sin Docker, diagnóstico y migraciones.

## Límites conocidos

Este proyecto no debe tratarse todavía como un foro operativo: la interfaz es la plantilla de Vite/React, el backend solo expone `/health` y no hay tablas de dominio en `backend/src/db/schema/index.ts`.

## Documentación

- [Guía de contribución](CONTRIBUTING.md)
- [Guía de desarrollo](docs/development.md)
- [Arquitectura actual y objetivo](docs/architecture.md)
- [Roadmap](docs/roadmap.md)
- [Licencia MIT](LICENSE)
