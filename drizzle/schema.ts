import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// SUSpensão Project Tables
export const okrs = mysqlTable("okrs", {
  id: int("id").autoincrement().primaryKey(),
  topicId: int("topicId").notNull(),
  krNumber: int("krNumber").notNull(), // KR1, KR2, KR3
  description: text("description").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type OKR = typeof okrs.$inferSelect;
export type InsertOKR = typeof okrs.$inferInsert;

export const cronogramaActivities = mysqlTable("cronogramaActivities", {
  id: int("id").autoincrement().primaryKey(),
  topicId: int("topicId").notNull(),
  activityName: varchar("activityName", { length: 255 }).notNull(),
  startDate: varchar("startDate", { length: 10 }).notNull(), // DD/MM format
  durationDays: int("durationDays").notNull(),
  dependencyId: int("dependencyId"), // References another activity
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CronogramaActivity = typeof cronogramaActivities.$inferSelect;
export type InsertCronogramaActivity = typeof cronogramaActivities.$inferInsert;

export const responsaveis = mysqlTable("responsaveis", {
  id: int("id").autoincrement().primaryKey(),
  activityName: varchar("activityName", { length: 255 }).notNull(),
  responsible: varchar("responsible", { length: 100 }).notNull(),
  periodStart: varchar("periodStart", { length: 10 }).notNull(), // DD/MM format
  periodEnd: varchar("periodEnd", { length: 10 }).notNull(), // DD/MM format
  status: mysqlEnum("status", ["Em Progresso", "Planejado", "Concluído"]).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Responsavel = typeof responsaveis.$inferSelect;
export type InsertResponsavel = typeof responsaveis.$inferInsert;