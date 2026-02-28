import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

// On-demand ISR revalidation endpoint
// Call POST /api/revalidate?secret=<REVALIDATE_SECRET>&path=/product/some-slug
export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const path = searchParams.get("path");
  const tag = searchParams.get("tag");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    if (path) {
      revalidatePath(path);
      return NextResponse.json({ revalidated: true, path });
    }
    if (tag) {
      revalidateTag(tag);
      return NextResponse.json({ revalidated: true, tag });
    }
    // Default: revalidate all product pages
    revalidatePath("/products");
    revalidatePath("/");
    return NextResponse.json({ revalidated: true, path: "/ and /products" });
  } catch (error) {
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
