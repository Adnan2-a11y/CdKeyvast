import { NextRequest, NextResponse } from "next/server";
import { getCouponByCode } from "@/lib/api/woocommerce.server";

// Mark this route as dynamic to allow searchParams
export const dynamic = "force-dynamic";

/**
 * GET /api/coupons/validate?code=COUPON_CODE
 * Validate and fetch coupon details
 */
export async function GET(request: NextRequest) {
  try {
    const code = request.nextUrl.searchParams.get("code");

    if (!code) {
      return NextResponse.json(
        { error: "Coupon code is required" },
        { status: 400 }
      );
    }

    const coupon = await getCouponByCode(code);

    if (!coupon) {
      return NextResponse.json(
        { error: "Coupon not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      coupon,
    });
  } catch (error) {
    console.error("Coupon validation error:", error);
    return NextResponse.json(
      { error: "Failed to validate coupon" },
      { status: 500 }
    );
  }
}
