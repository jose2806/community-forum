// Define las 4 tablas núcleo que requiere Better Auth (user, session, account,
// verification) más la tabla `profile` con los datos públicos del usuario.

import {pgTable, pgEnum, uuid ,text, boolean, timestamp, unique, index} from "drizzle-orm/pg-core";

// Tipo ENUM nativo de Postgres. Restringe la columna `role` a solo estos dos
export const roleEnum = pgEnum("role", ["user", "owner"]);

// Tabla: user
export const user = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),  // UUID generado automáticamente por Postgres
  name: text("name").notNull(),
  email: text("email").notNull().unique(),//Obligatorio y único: no puede haber dos usuarios con el mismo correo.
  emailVerified: boolean("email_verified").notNull().default(false), //Por defecto false hasta que complete el flujo de verificación.
  image: text("image"),
  role: roleEnum("role").notNull().default("user"), // Todo usuario nuevo entra como "user"; "owner" se asigna manualmente.
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

// Tabla: profile
// Datos públicos del usuario dentro de la red social 
// No forma parte del core schema de Better Auth, es una extensión propia del proyecto).
// Relación 1 a 1 con `user`.
export const profile = pgTable("profile", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().unique().references(() => user.id, {onDelete: "cascade"}), // Llave foránea hacia user.id.
  alias: text("alias").notNull().unique(), // Alias público (tipo "username"), //único en toda la plataforma
  avatarUrl: text("avatar_url"),
  bio: text("bio"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

// Tabla: session
export const session = pgTable("session", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => user.id, {onDelete: "cascade"}), // Llave foránea hacia user.id.
  token: text("token").notNull().unique(), // Token único que identifica la sesión
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(), // Momento en que la sesión deja de ser válida
  ipAddress: text("ip_address"),// Metadata del dispositivo/origen de la sesión. Opcional.
  userAgent: text("user_agent"),// Metadata del dispositivo/origen de la sesión. Opcional.
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
},(t) => ({
  // Índice sobre user_id: acelera la consulta típica "dame las sesiones de este usuario", 
  // que Better Auth ejecuta constantemente al validar cada request
  userIdIndex: index("session_user_id_idx").on(t.userId),
}));

// Tabla: account
// Representa un método de autenticación vinculado a un usuario
// puede ser credenciales (email+password) o un proveedor OAuth (Google, GitHub, etc)
export const account = pgTable("account", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => user.id, {onDelete: "cascade"}),
  accountId: text("account_id").notNull(), // Identificador de la cuenta dado por el proveedor
  providerId: text("provider_id").notNull(),// Qué proveedor de autenticación es: "credential", "google", "github", etc.
  // Tokens de OAuth. Todos opcionales porque no aplican al login por email+password.
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  accessTokenExpires: timestamp("access_token_expires_at", { withTimezone: true }),
  refreshTokenExpires: timestamp("refresh_token_expires_at", { withTimezone: true }),
  scope: text("scope"),
  idToken: text("id_token"),
  password: text("password"),//Better Auth lo hashea internamente
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
},(t) => ({
  // No puede haber dos filas con el mismo par (providerId, accountId). 
  // Sí puede repetirse el mismo accountId en distinto proveedor
  // o  el mismo providerId con distinto accountId.
  userIdIndex: index("account_user_id_idx").on(t.userId),
  providerAccountUnique: unique("account_provider_account_unique").on(t.accountId, t.providerId),
}));
 
// Tabla: verification
// Guarda tokens/códigos temporales usadoscpara verificar un email o resetear una contraseña
export const verification = pgTable("verification", {
  id: uuid("id").primaryKey().defaultRandom(),
  identifier: text("identifier").notNull(),  // Qué se está verificando
  value: text("value").notNull(),  // El valor a verificar
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
},(t) => ({
  identifierIndex: index("verification_identifier_idx").on(t.identifier),
}));