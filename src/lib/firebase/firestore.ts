import {doc, setDoc, getDoc} from "firebase/firestore";
import {db} from "./init";

// Fungsi untuk menyimpan data pengguna ke Firestore
const saveUserToFirestore = async (uid: string, email: string) => {
  try {
    await setDoc(doc(db, "users", uid), {
      email: email,
      createdAt: new Date(),
    });
    console.log("Data pengguna berhasil disimpan ke Firestore.");
  } catch (error) {
    console.error("Gagal menyimpan data pengguna: ", error);
  }
};

// Fungsi untuk membaca data pengguna
const getUserData = async (uid: string) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return JSON.stringify(docSnap.data());
    } else {
      console.log("Dokumen tidak ditemukan.");
      return null;
    }
  } catch (error) {
    console.error("Gagal membaca data pengguna: ", error);
  }
};

export {saveUserToFirestore, getUserData};
