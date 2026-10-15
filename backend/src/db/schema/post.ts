import { sql } from "drizzle-orm";
import { pgTable, uuid, text, integer, timestamp, index, uniqueIndex, check } from "drizzle-orm/pg-core";
import { user } from "./auth.js";

export const posts = pgTable( "posts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    authorId: uuid("author_id").notNull().references(() => user.id,{onDelete: "restrict"}),
    content: text("content"),
    createdAt: timestamp("created_at", {withTimezone: true}).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", {withTimezone: true}).notNull().defaultNow(),
    deletedAt: timestamp("deleted_at", {withTimezone: true}) // eliminación lógica
  },
  (t) => [
    index("posts_author_id_idx").on(t.authorId),
    index("posts_feed_idx").on(t.createdAt.desc()).where(sql`${t.deletedAt} is null`)
  ],
);

export const postAttachments = pgTable("post_attachments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    postId: uuid("post_id").notNull().references(() => posts.id,{onDelete: "cascade"}),
    storageKey: text("storage_key").notNull(),
    originalName: text("original_name").notNull(),
    mimeType: text("mime_type").notNull(),
    sizeBytes: integer("size_bytes").notNull(),
    createdAt: timestamp("created_at", {withTimezone: true}).notNull().defaultNow()
  },
  (t) => [
    uniqueIndex("post_attachments_post_id_unique").on(t.postId),
    check("post_attachments_size_positive", sql`${t.sizeBytes} > 0`)
  ],
);