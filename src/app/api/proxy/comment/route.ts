import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const productId = req.nextUrl.searchParams.get("productId");
  const { text } = await req.json();

  const access = req.cookies.get("access")?.value;
  const token = req.cookies.get("token")?.value;

  if (!access || !token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Forward the request to the external API
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/order/api/addComment/${productId}/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
        TOKEN: token,
      },
      body: JSON.stringify({ text }),
    }
  );
  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
