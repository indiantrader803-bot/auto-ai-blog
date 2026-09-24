import crypto from "crypto";
import { cookies } from "next/headers";
import { prisma } from "./prisma";

export const VIP_SESSION_COOKIE = "smartmag_vip_session";
const SESSION_EXPIRY_DAYS = 30;

/**
 * 🔒 PBKDF2 Password Hashing (Zero external dependency, native Node.js crypto)
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, originalHash] = storedHash.split(":");
    if (!salt || !originalHash) return false;
    const computedHash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
    return crypto.timingSafeEqual(Buffer.from(originalHash, "hex"), Buffer.from(computedHash, "hex"));
  } catch {
    return false;
  }
}

/**
 * 🔑 Cryptographically Secure Random Token
 */
export function generateSecureToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

/**
 * 🎫 Session Management
 */
export async function createSession(userId: string): Promise<string> {
  const token = generateSecureToken();
  const expires = new Date();
  expires.setDate(expires.getDate() + SESSION_EXPIRY_DAYS);

  await prisma.session.create({
    data: {
      sessionToken: token,
      userId,
      expires,
    },
  });

  return token;
}

export async function destroySession(token: string): Promise<void> {
  try {
    await prisma.session.delete({
      where: { sessionToken: token },
    });
  } catch {}
}

export async function getSessionUser(token: string) {
  if (!token) return null;

  try {
    const session = await prisma.session.findUnique({
      where: { sessionToken: token },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            isVip: true,
            vipTier: true,
            emailVerified: true,
            createdAt: true,
          },
        },
      },
    });

    if (!session || session.expires < new Date()) {
      if (session) {
        await prisma.session.delete({ where: { id: session.id } }).catch(() => {});
      }
      return null;
    }

    return session.user;
  } catch (e) {
    console.warn("Session check notice:", e);
    return null;
  }
}

/**
 * Server Component / Route Handler current user resolver
 */
export async function getCurrentUser() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(VIP_SESSION_COOKIE)?.value;
    if (!token) return null;
    return await getSessionUser(token);
  } catch {
    return null;
  }
}

let isAuthTableChecked = false;

/**
 * 🛠️ Ensure User and Session tables and RLS policies exist in PostgreSQL
 */
export async function ensureAuthTables(force = false): Promise<void> {
  if (isAuthTableChecked && !force) return;

  const statements = [
    `CREATE TABLE IF NOT EXISTS "User" (
        "id" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "name" TEXT,
        "passwordHash" TEXT NOT NULL,
        "isVip" BOOLEAN NOT NULL DEFAULT true,
        "vipTier" TEXT NOT NULL DEFAULT 'VIP_MEMBER',
        "emailVerified" BOOLEAN NOT NULL DEFAULT false,
        "verificationToken" TEXT,
        "resetPasswordToken" TEXT,
        "resetPasswordExpires" TIMESTAMP(3),
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "User_pkey" PRIMARY KEY ("id")
    )`,
    `CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email")`,
    `CREATE UNIQUE INDEX IF NOT EXISTS "User_resetPasswordToken_key" ON "User"("resetPasswordToken")`,
    `CREATE INDEX IF NOT EXISTS "User_email_idx" ON "User"("email")`,
    `CREATE TABLE IF NOT EXISTS "Session" (
        "id" TEXT NOT NULL,
        "sessionToken" TEXT NOT NULL,
        "userId" TEXT NOT NULL,
        "expires" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "Session_pkey" PRIMARY KEY ("id"),
        CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
    )`,
    `CREATE UNIQUE INDEX IF NOT EXISTS "Session_sessionToken_key" ON "Session"("sessionToken")`,
    `CREATE INDEX IF NOT EXISTS "Session_userId_idx" ON "Session"("userId")`,
    `ALTER TABLE "User" ENABLE ROW LEVEL SECURITY`,
    `DROP POLICY IF EXISTS "Allow all for server on User" ON "User"`,
    `CREATE POLICY "Allow all for server on User" ON "User" FOR ALL USING (true) WITH CHECK (true)`,
    `ALTER TABLE "Session" ENABLE ROW LEVEL SECURITY`,
    `DROP POLICY IF EXISTS "Allow all for server on Session" ON "Session"`,
    `CREATE POLICY "Allow all for server on Session" ON "Session" FOR ALL USING (true) WITH CHECK (true)`,
  ];

  for (const sql of statements) {
    try {
      await prisma.$executeRawUnsafe(sql);
    } catch (err: any) {
      // Ignore if table/policy already configured or non-fatal
      console.warn("Table setup warning:", sql.slice(0, 40), err?.message || err);
    }
  }

  isAuthTableChecked = true;
}

/**
 * 👑 Superadmin Check
 * Returns true if the given user is a designated superadmin.
 */
export const SUPERADMIN_EMAILS = [
  "arnab.laha2018@gmail.com",
  "arnab.laha2011@gmail.com",
  "indiantrader803@gmail.com",
  "admin@thesmartmag.com",
];

export function isSuperAdmin(user: { email: string; vipTier?: string | null } | null): boolean {
  if (!user) return false;
  return user.vipTier === "SUPERADMIN" || SUPERADMIN_EMAILS.includes(user.email.toLowerCase());
}
