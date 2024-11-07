import {collection, query, where, getDocs} from "firebase/firestore";
import {db} from "@/lib/firebase/init"; // Sesuaikan dengan konfigurasi Firebase Anda

const getDataByField = async (
  collectionName: string,
  fieldName: string,
  inputValue: string
) => {
  try {
    // Membuat query untuk mencari dokumen di koleksi yang sesuai dengan field dan nilai input
    const q = query(
      collection(db, collectionName), // Ganti "users" dengan nama koleksi Anda
      where(fieldName, "==", inputValue) // Memfilter berdasarkan field dan nilai
    );

    // Menjalankan query untuk mendapatkan data
    const querySnapshot = await getDocs(q);

    // Mengecek apakah ada data yang sesuai
    if (querySnapshot.empty) {
      console.log("Tidak ada data yang ditemukan.");
      return null; // Kembalikan null jika tidak ada data
    } else {
      const data: any[] = [];
      querySnapshot.forEach((doc) => {
        data.push({id: doc.id, ...doc.data()}); // Menyimpan data dokumen dalam array
      });
    //   console.log(querySnapshot)
      return data; // Mengembalikan array data yang ditemukan
    }
  } catch (error) {
    console.log("Error mendapatkan data: ", error);
    return null;
  }
};


export default getDataByField;
