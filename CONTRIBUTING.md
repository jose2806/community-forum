# Contribuir a community-forum

community-forum es un prototipo abierto a propuestas. Antes de realizar cambios grandes, abre un issue para discutir el objetivo y el alcance. Las contribuciones deben ser pequeñas, enfocadas y documentarse cuando cambien el uso, la configuración o la arquitectura.

Consulta también el [README](README.md), la [guía de desarrollo](docs/development.md) y la [licencia MIT](LICENSE).

## Flujo de ramas

- Todo trabajo parte de `develop` actualizado.
- Usa ramas descriptivas, por ejemplo `feat/nombre-corto`, `fix/nombre-corto` o `docs/nombre-corto`.
- Abre los pull requests contra `develop`.
- `main` no es destino del flujo normal; solo se modifica mediante el proceso de release que el equipo defina posteriormente.

## Commits

Usamos Conventional Commits. Los tipos permitidos son `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `build` y `ci`. El scope es opcional.

```text
docs(readme): aclarar el estado del prototipo
feat(api): añadir endpoint de comunidades
fix!: cambiar el formato de respuesta de salud
```

Un breaking change también puede declararse con `BREAKING CHANGE:` en el pie del commit. Esta convención es obligatoria, pero esta tarea no añade herramientas automáticas de enforcement.

## Preparación y validación

Sigue [`docs/development.md`](docs/development.md) para preparar el entorno. Ejecuta las validaciones aplicables antes de abrir el PR:

```sh
# frontend/
pnpm lint
pnpm build

# backend/
pnpm build
```

Actualmente no hay una suite de tests configurada. Si incorporas tests como parte de un cambio, documenta cómo ejecutarlos.

## Checklist del pull request

- [ ] El objetivo y el alcance del cambio están descritos.
- [ ] Se indican las validaciones ejecutadas y sus resultados.
- [ ] Se documentan los cambios de entorno o migraciones, si existen.
- [ ] Se incluyen capturas o una descripción visual para cambios de UI.
- [ ] El cambio evita presentar como disponibles funcionalidades que aún están en el roadmap.
