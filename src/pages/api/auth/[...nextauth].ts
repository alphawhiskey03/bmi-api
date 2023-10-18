import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Cache-Control", "no-store, max-age=0");
  return NextAuth(req, res, authOptions);
}
