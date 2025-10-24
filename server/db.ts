import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, okrs, InsertOKR, cronogramaActivities, InsertCronogramaActivity, responsaveis, InsertResponsavel } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// OKRs queries
export async function getOKRsByTopic(topicId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(okrs).where(eq(okrs.topicId, topicId));
}

export async function createOKR(data: InsertOKR) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(okrs).values(data);
  return result;
}

export async function updateOKR(id: number, data: Partial<InsertOKR>) {
  const db = await getDb();
  if (!db) return null;
  return db.update(okrs).set(data).where(eq(okrs.id, id));
}

export async function deleteOKR(id: number) {
  const db = await getDb();
  if (!db) return null;
  return db.delete(okrs).where(eq(okrs.id, id));
}

// Cronograma queries
export async function getCronogramaActivities() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(cronogramaActivities);
}

export async function createCronogramaActivity(data: InsertCronogramaActivity) {
  const db = await getDb();
  if (!db) return null;
  return db.insert(cronogramaActivities).values(data);
}

export async function updateCronogramaActivity(id: number, data: Partial<InsertCronogramaActivity>) {
  const db = await getDb();
  if (!db) return null;
  return db.update(cronogramaActivities).set(data).where(eq(cronogramaActivities.id, id));
}

export async function deleteCronogramaActivity(id: number) {
  const db = await getDb();
  if (!db) return null;
  return db.delete(cronogramaActivities).where(eq(cronogramaActivities.id, id));
}

// Responsáveis queries
export async function getResponsaveis() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(responsaveis);
}

export async function createResponsavel(data: InsertResponsavel) {
  const db = await getDb();
  if (!db) return null;
  return db.insert(responsaveis).values(data);
}

export async function updateResponsavel(id: number, data: Partial<InsertResponsavel>) {
  const db = await getDb();
  if (!db) return null;
  return db.update(responsaveis).set(data).where(eq(responsaveis.id, id));
}

export async function deleteResponsavel(id: number) {
  const db = await getDb();
  if (!db) return null;
  return db.delete(responsaveis).where(eq(responsaveis.id, id));
}
