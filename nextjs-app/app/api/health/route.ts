import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // adjust path to your prisma singleton

export async function GET() {
  try {
    // Simple raw query - works even with no tables/migrations yet
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json(
      { status: "ok", database: "connected" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Database health check failed:", error);

    return NextResponse.json(
      {
        status: "error",
        database: "disconnected",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}