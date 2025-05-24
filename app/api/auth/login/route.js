import axios from "axios";
import { NextResponse } from "next/server";
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function POST(request) {
  try {
    const userdata = await request.json();
    console.log(backendUrl);
    const res = await axios.post(`${backendUrl}/auth/login`,
      userdata,
      { validateStatus: () => true } 
    );

    return NextResponse.json(res.data, {
      status: res.status,
    });
  } catch (err) {
    console.error("Error logging in:", err);
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}
