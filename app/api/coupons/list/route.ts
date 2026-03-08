import { NextResponse } from "next/server";
import { getActiveCoupons } from "@/lib/api/woocommerce.server";

/**
 * GET /api/coupons/list
 * Get all active and non-expired coupons
 * Useful for promotional display
 */
export async function GET() {
  try {
    const coupons = await getActiveCoupons();

    return NextResponse.json({
      success: true,
      coupons,
      count: coupons.length,
    });
  } catch (error) {
    console.error("Get coupons error:", error);
    return NextResponse.json(
      { error: "Failed to fetch coupons" },
      { status: 500 }
    );
  }
}
