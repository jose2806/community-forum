import { eq, isNull, and} from "drizzle-orm"
import { db } from "../db/client.js"
import { user } from "../db/schema/auth.js"
import { posts, postAttachments } from "../db/schema/post.js"

async function expectError(label:string, fn: () => Promise<unknown>) {
  try {
    await fn();
    console.error(`❌ ${label}: debió fallar y no falló`);
    process.exitCode = 1;
  } catch (error) {
    console.log(`✅ ${label}: falló como se esperaba`);
  }
}

async function main() {
  // 1. Usuario de prueba (ajusta los campos obligatorios)
  const [u] = await db.insert(user).values({
    name: "Validador",
    email: `validador-${Date.now()}@test.local`,
    emailVerified: false
  }).returning();
  if (!u) throw new Error("No se pudo crear el usuario");

  // 2. Crear publicación con texto y adjunto
  const [post] = await db.insert(posts).values({
    authorId: u.id,
    content: "Hola mundo"
  }).returning();
  if (!post) throw new Error("No se pudo crear la publicación");

  await db.insert(postAttachments).values({
    postId: post.id,
    storageKey: "uploads/test.png",
    originalName: "test.png",
    mimeType: "image/png",
    sizeBytes: 1234,
  });
  console.log("✅ Publicación y adjunto creados");

  // 3. Publicación sin texto (texto opcional)
  await db.insert(posts).values({ authorId: u.id });
  console.log("✅ Publicación sin texto creada");

  // 4. Consultar publicación con su adjunto
  const found = await db.select().from(posts).leftJoin(
    postAttachments, eq(postAttachments.postId, posts.id)
  ).where(eq(posts.id, post.id));
  const firstFound = found[0];
  console.log("✅ Consulta:", found.length === 1 && firstFound && firstFound.post_attachments ? "ok" : "revisar");

  // 5. Eliminación lógica
  await db.update(posts).set({deletedAt: new Date()}).where(eq(posts.id, post.id));

  const physical = await db.select().from(posts).where(eq(posts.id, post.id));
  const visible = await db.select().from(posts).where(and(eq(posts.id,post.id), isNull(posts.deletedAt)));
  console.log( physical.length === 1 && visible.length === 0
      ? "✅ Eliminación lógica: la fila existe pero ya no es visible"
      : "❌ Eliminación lógica falló",
  );

  // 6. Restricciones
  await expectError("Segundo adjunto en la misma publicacion", () =>
    db.insert(postAttachments).values({
      postId: post.id,
      storageKey: "uploads/otro.png",
      originalName: "otro.png",
      mimeType: "image/png",
      sizeBytes: 10
    }),
  );

  await expectError("Publicacion con autor inexistente", () =>
    db.insert(posts).values({
      authorId: "00000000-0000-0000-0000-000000000000",
      content: "huerfana"
    })
  );

  await expectError("Adjunto con tamaño 0", async() => {
    const [p2] = await db.insert(posts).values({authorId: u.id}).returning();
    if (!p2) throw new Error("No se pudo crear la publicación");
    await db.insert(postAttachments).values({
      postId: p2.id,
      storageKey: "X",
      originalName: "x",
      mimeType: "text/plain",
      sizeBytes: 0
    });
  });

  // 7. Limpieza 
  await db.delete(posts).where(eq(posts.authorId,u.id));
  await db.delete(user).where(eq(user.id, u.id));
  console.log("🧹 Datos de prueba eliminados");
} 

main().catch((e)=>{
    console.error(e);
    process.exitCode = 1;
  }).finally(() => process.exit());