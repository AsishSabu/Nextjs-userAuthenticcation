import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";
import { sendEmail } from "../../../../helpers/mailer";

connect();

export async function POST(req: NextRequest) {
  try {
    const { userName, email, password } = await req.json();
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser=new User({
      userName,
      email,
      password: hashedPassword,
    })
    await newUser.save();
    await sendEmail({email,emailType:"VERIFY",userId:newUser._id})
    return NextResponse.json({ message: "User created successfully",newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
