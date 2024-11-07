// lib/firebase/auth.ts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import {doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import {auth, db} from "./init";
import { getUserData } from "./firestore";
import { set } from "react-hook-form";
// Tipe untuk data pengguna
interface UserData {
  email: string;
  username: string;
  createdAt: Date;
  token: string;
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
      token: await userCredential.user.getIdToken(),
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

    const docRef = doc(db, "users", userCredential.user.uid);

    await updateDoc(docRef, {token : await userCredential.user.getIdToken()});
    const user = await getDoc(docRef);

    document.cookie = `currentUser=${JSON.stringify(user.data())}`;
    document.cookie = `token=${user.data()?.token}`
    return {message: "Login berhasil", user: userCredential};
  } catch (error) {
    return {error: (error as Error).message || "Terjadi kesalahan saat login"};
  }
};

export {registerUser, loginUser};
