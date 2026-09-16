# Roadmap

Este roadmap expresa resultados esperados, no fechas ni promesas de entrega. Las funciones listadas como pendientes no están disponibles en el prototipo actual.

## Fases

### 1. Fundamento técnico

**Estado: En progreso**

Resultados esperados:

- Sustituir la plantilla inicial por una base de interfaz coherente.
- Mantener un endpoint de salud y una configuración clara del entorno.
- Establecer una estructura de código y documentación que permita iterar.
- Definir criterios básicos de validación para frontend y backend.

### 2. Modelo de dominio y persistencia

**Estado: Pendiente**

Resultados esperados:

- Diseñar entidades, relaciones y migraciones en Drizzle.
- Conectar el backend con PostgreSQL mediante un modelo de datos revisado.
- Documentar límites de consistencia, errores y evolución del esquema.

### 3. Usuarios, autenticación y gestión de cuentas

**Estado: Pendiente**

Resultados esperados:

- Permitir registro, inicio de sesión, cierre de sesión y recuperación de acceso.
- Gestionar sesiones de forma segura, incluyendo expiración y revocación.
- Crear perfiles con nombre de usuario, correo electrónico y datos básicos editables.
- Permitir actualizar credenciales, preferencias y datos de la cuenta.
- Definir estados de cuenta, validación de correo y recuperación ante pérdida de acceso.

### 4. Comunidades y permisos

**Estado: Pendiente**

Resultados esperados:

- Crear comunidades con reglas y configuración explícitas.
- Establecer permisos de miembros, administradores y propietarios.
- Definir el ciclo de vida de una comunidad, incluyendo unión, salida y cierre.
- Relacionar la identidad de los usuarios con sus membresías y roles.

### 5. Publicaciones e interacción

**Estado: Pendiente**

Resultados esperados:

- Incorporar publicaciones y comentarios con sus contratos API.
- Definir edición, borrado, visibilidad y estados de contenido.
- Añadir mecanismos de interacción después de acordar su alcance.

### 6. Moderación y operación

**Estado: Pendiente**

Resultados esperados:

- Diseñar reportes, acciones de moderación y registro de decisiones.
- Definir observabilidad, copias de seguridad y recuperación.
- Acordar una estrategia de despliegue segura y repetible.

## Decisiones abiertas

**Estado: Por definir**

- Reglas de creación y gobierno de comunidades.
- Permisos, roles y límites de moderación.
- Política de cuentas, verificación de correo y recuperación de acceso.
- Gestión de sesiones, privacidad de perfiles y eliminación de cuentas.
- Contrato API, versionado y formato de errores.
- Modelo de datos definitivo y estrategia de migraciones.
- Estrategia de despliegue, alojamiento y gestión de secretos.
- Requisitos de privacidad, retención y seguridad.

## Fuera de alcance actual

Registro de usuarios, autenticación, gestión de cuentas, comunidades, permisos, publicaciones, comentarios, reacciones, moderación y cualquier API de dominio permanecen fuera del alcance implementado hasta que las fases correspondientes se completen.
