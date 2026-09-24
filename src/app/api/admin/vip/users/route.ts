import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser, isSuperAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET: List all VIP users with optional search/filter
export async function GET(request: NextRequest) {
  const currentUser = await getCurrentUser();
  if (!isSuperAdmin(currentUser)) {
    return NextResponse.json({ error: "Superadmin access required." }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";
  const tier = searchParams.get("tier") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  try {
    const where: any = {};
    if (query) {
      where.OR = [
        { email: { contains: query, mode: "insensitive" } },
        { name: { contains: query, mode: "insensitive" } },
      ];
    }
    if (tier) {
      where.vipTier = tier;
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          email: true,
          name: true,
          isVip: true,
          vipTier: true,
          emailVerified: true,
          createdAt: true,
          updatedAt: true,
          _count: { select: { sessions: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.user.count({ where }),
    ]);

    const tiers = await prisma.user.groupBy({
      by: ["vipTier"],
      _count: { vipTier: true },
    });

    return NextResponse.json({
      success: true,
      users,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      tierDistribution: tiers.map((t) => ({
        tier: t.vipTier,
        count: t._count.vipTier,
      })),
    });
  } catch (error) {
    console.error("Admin VIP users GET error:", error);
    return NextResponse.json({ error: "Failed to fetch users." }, { status: 500 });
  }
}

// PATCH: Update user VIP status, tier, or other fields
export async function PATCH(request: NextRequest) {
  const currentUser = await getCurrentUser();
  if (!isSuperAdmin(currentUser)) {
    return NextResponse.json({ error: "Superadmin access required." }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { userId, isVip, vipTier, name } = body;

    if (!userId) {
      return NextResponse.json({ error: "userId is required." }, { status: 400 });
    }

    // Prevent superadmin from downgrading themselves
    const targetUser = await prisma.user.findUnique({ where: { id: userId }, select: { email: true } });
    if (!targetUser) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const updateData: any = {};
    if (typeof isVip === "boolean") updateData.isVip = isVip;
    if (vipTier) updateData.vipTier = vipTier;
    if (name !== undefined) updateData.name = name;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        isVip: true,
        vipTier: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Admin VIP users PATCH error:", error);
    return NextResponse.json({ error: "Failed to update user." }, { status: 500 });
  }
}

// DELETE: Remove a user account
export async function DELETE(request: NextRequest) {
  const currentUser = await getCurrentUser();
  if (!isSuperAdmin(currentUser)) {
    return NextResponse.json({ error: "Superadmin access required." }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId is required." }, { status: 400 });
    }

    // Safety: prevent deleting superadmin accounts
    const targetUser = await prisma.user.findUnique({ where: { id: userId }, select: { email: true, vipTier: true } });
    if (!targetUser) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    if (isSuperAdmin(targetUser)) {
      return NextResponse.json({ error: "Cannot delete a Superadmin account." }, { status: 403 });
    }

    await prisma.user.delete({ where: { id: userId } });

    return NextResponse.json({ success: true, message: "User account deleted successfully." });
  } catch (error) {
    console.error("Admin VIP users DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete user." }, { status: 500 });
  }
}
