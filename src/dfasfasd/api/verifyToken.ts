// pages/api/verifyToken.ts
import type {NextApiRequest, NextApiResponse} from "next";
import {auth} from "../../lib/firebaseAdmin";

export default async function verifyToken(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({error: "Token tidak ditemukan"});
  }

  try {
    // Verifikasi token dengan Firebase Admin SDK
    const decodedToken = await auth.verifyIdToken(token);
    res.status(200).json({valid: true, uid: decodedToken.uid});
  } catch (error) {
    console.error("Token tidak valid:", error);
    res.status(401).json({valid: false, error: "Token tidak valid"});
  }
}
