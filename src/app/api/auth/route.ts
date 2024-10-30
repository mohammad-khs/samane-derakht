import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { access, token } = await req.json();
    if (!access || !token) {
      return NextResponse.json({ message: "Missing tokens" }, { status: 400 });
    }

    // Set cookies for access and token tokens as a single string
    const cookies = [
      `access=${access}; HttpOnly; Secure; Path=/; SameSite=Strict; Max-Age=86400`, // Expires in 1 day
      `token=${token}; HttpOnly; Secure; Path=/; SameSite=Strict; Max-Age=604800`, // Expires in 7 days
    ].join(", ");

    return NextResponse.json(
      { message: "Cookies set" },
      {
        status: 200,
        headers: {
          "Set-Cookie": cookies,
        },
      }
    );
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
