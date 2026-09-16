# Arquitectura

## Estado actual

El sistema actual es un esqueleto de desarrollo, no una aplicación de foro funcional. El flujo disponible es:

1. Vite sirve la aplicación React del directorio `frontend/` en el puerto `5173`.
2. Express crea el backend en `backend/`, configura CORS a partir de `FRONTEND_URL`, analiza JSON y expone `GET /health` en el puerto `3000`.
3. PostgreSQL 17 se ejecuta como servicio de Docker Compose en el puerto `5432`.
4. Drizzle ORM y Drizzle Kit están configurados para el backend, pero `backend/src/db/schema/index.ts` todavía no contiene tablas.

## Límites de responsabilidad

| Límite | Responsabilidad actual | Configuración | Estado |
| --- | --- | --- | --- |
| Frontend | Servir la plantilla inicial de React | Vite, `5173` | Plantilla sin funcionalidades de foro |
| API | Arranque de Express, CORS, JSON y `GET /health` | `FRONTEND_URL`, `PORT`, `3000` | Sin contrato de dominio |
| Persistencia | Ejecutar PostgreSQL localmente | `DATABASE_URL`, `5432` | Sin modelo de datos definido |
| Entorno local | Orquestar frontend, backend y PostgreSQL | Docker Compose | Disponible para desarrollo |

`FRONTEND_URL` admite varios orígenes separados por comas. La configuración de Compose establece `http://localhost:5173`.

## Arquitectura objetivo

Estas son decisiones pendientes del roadmap, no implementaciones existentes:

- autenticación e identidad de usuarios;
- comunidades y sus reglas;
- publicaciones, comentarios e interacción;
- moderación y permisos;
- API de dominio y sus contratos;
- modelo de datos y migraciones asociadas.

Todavía no existe un contrato API ni un modelo de datos definitivo. El orden previsto para resolver estas decisiones está en [`roadmap.md`](roadmap.md).
