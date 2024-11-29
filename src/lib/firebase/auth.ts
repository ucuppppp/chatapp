// lib/firebase/auth.ts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import {doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import {auth, db} from "./init";
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


    document.cookie = `currentUser=${JSON.stringify({ id: uid,...userData})}`;
    document.cookie = `token=${userData.token}`;
    return {message: "Pengguna berhasil didaftarkan", user: userCredential};
  } catch (error) {
    console.log("Error saat pendaftaran: ", error);
    return {
      error: (error as Error).message || "Terjadi kesalahan saat pendaftaran",
    };
  }
};

// Fungsi untuk login pengguna
type LoginResponse = {
  message?: string;
  user?: UserCredential;
  error?: string;
};

const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const docRef = doc(db, "users", userCredential.user.uid);
    const token = await userCredential.user.getIdToken();
    await updateDoc(docRef, {token});

    const userSnapshot = await getDoc(docRef);
    if (!userSnapshot.exists()) {
      throw new Error("Data pengguna tidak ditemukan di Firestore.");
    }

    const userData = userSnapshot.data();
    document.cookie = `currentUser=${JSON.stringify({
      id: userCredential.user.uid,
      ...userData,
    })}; path=/;`;
    document.cookie = `token=${userData?.token}; path=/; Secure; SameSite=Strict`;

    return {
      message: "Login berhasil",
      user: userCredential,
    };
  } catch (error) {
    // Penanganan error berdasarkan kode error Firebase
    let errorMessage = "Terjadi kesalahan saat login";
    if (error instanceof Error && "code" in error) {
      const firebaseError = error as {code: string; message: string};
      switch (firebaseError.code) {
        case "auth/invalid-credential":
          errorMessage = "Email atau password tidak valid.";
          break;
        case "auth/invalid-email":
          errorMessage = "Format email tidak valid.";
          break;
        case "auth/user-not-found":
          errorMessage = "Pengguna dengan email ini tidak ditemukan.";
          break;
        case "auth/wrong-password":
          errorMessage = "Password yang Anda masukkan salah.";
          break;
        case "auth/too-many-requests":
          errorMessage =
            "Terlalu banyak percobaan login. Silakan coba lagi nanti.";
          break;
        default:
          errorMessage = firebaseError.message || "Kesalahan tidak dikenal.";
          break;
      }
    }
    return {
      error: errorMessage,
    };
  }
};


export {registerUser, loginUser};
