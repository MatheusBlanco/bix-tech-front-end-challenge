import { signToken } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const validEmail = "test@example.com";
    const validPassword = "1234";

    if (email === validEmail && password === validPassword) {
      const token = signToken({ email });

      const response = NextResponse.json({ success: true });

      response.cookies.set("token", token, {
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 1 day
      });

      return NextResponse.json(
        { success: true, data: { token } },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
