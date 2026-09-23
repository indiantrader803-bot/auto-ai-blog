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
