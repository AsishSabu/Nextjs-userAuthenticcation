import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getTokenData = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const data:any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return data.id;
  } catch (error) {
    throw new Error(error.message);
  }
};
