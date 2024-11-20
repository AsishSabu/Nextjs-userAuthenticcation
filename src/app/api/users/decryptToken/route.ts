import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { getTokenData } from "../../../../helpers/getTokenData";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getTokenData(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json({ message: "User found", data: user });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
