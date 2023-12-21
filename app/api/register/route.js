import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const data = await req.json();
    await connectMongoDB();

    let user = await User.findOne({ email: data.email });

    if (user) {
      return NextResponse.json({ err: "User already exists" }, { status: 400 });
    }

    data.password = await bcrypt.hash(data.password, 8);
    await User.create(data);

    return NextResponse.json({ msg: "User registered" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ err: "Internal Server Error" }, { status: 500 });
  }
}
