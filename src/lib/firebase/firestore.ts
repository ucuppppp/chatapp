import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  doc,
  getDoc,
} from "firebase/firestore";
import {db} from "@/lib/firebase/init"; // Sesuaikan dengan konfigurasi Firebase Anda

const getUserPosts = async (uid: string | undefined) => {
  try {
    const q = query(collection(db, "posts"), where("userId", "==", uid));
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
      return data; // Mengembalikan array data yang ditemukan
    }
  } catch (error) {
    console.log("Error mendapatkan data: ", error);
    return null;
  }
};

interface Timestamp {
  seconds: number;
  nanoseconds: number;
}

function formatTimeAgo(timestamp: Timestamp) {
  const date = new Date(timestamp.seconds * 1000);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} detik yang lalu`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} menit yang lalu`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} jam yang lalu`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} hari yang lalu`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} minggu yang lalu`;
  }

  const currentYear = now.getFullYear();
  const dateYear = date.getFullYear();
  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  if (currentYear === dateYear) {
    return `${date.getDate()} ${monthNames[date.getMonth()]}`;
  }
  return `${date.getDate()} ${monthNames[date.getMonth()]} ${dateYear}`;
}


const getRecentPosts = async () => {
  try {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No data found.");
      return null;
    } else {
      const data: any[] = [];

      for (const docSnap of querySnapshot.docs) {
        const postData = docSnap.data();
        const userRef = doc(db, "users", postData.userId);

        // Fetching user data for avatar and username
        const userSnap = await getDoc(userRef);
        const userData = userSnap.exists() ? userSnap.data() : null;

        data.push({
          id: docSnap.id,
          avatar: userData?.profilePicture || null,
          owner: userData?.username || null,
          ...postData,
        });

        data[data.length - 1].createdAt = formatTimeAgo(postData.createdAt);
      }

      return data;
    }
  } catch (error) {
    console.error("Error retrieving data: ", error);
    return null;
  }
};

export {getRecentPosts}
export default getUserPosts
