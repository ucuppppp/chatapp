// lib/firebaseAdmin.ts
import * as admin from "firebase-admin";

// Cek apakah admin sudah diinisialisasi sebelumnya
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

export const auth = admin.auth();
