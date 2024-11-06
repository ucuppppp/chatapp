// lib/firebase/auth.ts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import {doc, setDoc} from "firebase/firestore";
import {auth, db} from "./init";
import { getUserData } from "./firestore";
// Tipe untuk data pengguna
interface UserData {
  email: string;
  username: string;
  createdAt: Date;
}

// Fungsi untuk mendaftar pengguna
const registerUser = async (
  username: string,
  email: string,
  password: string
): Promise<{message?: string; user?: UserCredential; error?: string}> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const {uid} = userCredential.user;

    // Simpan data pengguna ke Firestore
    const userData: UserData = {
      email,
      username,
      createdAt: new Date(),
    };

    await setDoc(doc(db, "users", uid), userData);

    return {message: "Pengguna berhasil didaftarkan", user: userCredential};
  } catch (error) {
    console.error("Error saat pendaftaran: ", error);
    return {
      error: (error as Error).message || "Terjadi kesalahan saat pendaftaran",
    };
  }
};

// Fungsi untuk login pengguna
const loginUser = async (
  email: string,
  password: string
): Promise<{message?: string; user?: UserCredential; error?: string}> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    document.cookie = `user=${await getUserData(userCredential.user.uid)}`
    document.cookie = `token=${await userCredential.user.getIdToken()}`
    return {message: "Login berhasil", user: userCredential};
  } catch (error) {
    return {error: (error as Error).message || "Terjadi kesalahan saat login"};
  }
};

export {registerUser, loginUser};
