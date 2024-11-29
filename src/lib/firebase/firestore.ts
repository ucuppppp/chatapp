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

const getUserPosts = async (username: string | undefined) => {
  if (!username) {
    return null;
  }

  try {
    // Query untuk mendapatkan pengguna berdasarkan username
    const userQuery = query(
      collection(db, "users"),
      where("username", "==", username)
    );
    const userSnapshot = await getDocs(userQuery);

    // Cek apakah ada pengguna dengan username tersebut
    if (userSnapshot.empty) {
      console.log("Pengguna dengan username tersebut tidak ditemukan.");
      return {status : 404, "message": "Pengguna tidak ditemukan."};
    }

    // Ambil dokumen pertama (asumsi username unik)
    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();
    const userId = userDoc.id; // ID dokumen pengguna
    const userName = userData.name; // Nama pengguna

    // Query untuk mendapatkan postingan berdasarkan userId
    const postsQuery = query(
      collection(db, "posts"),
      where("userId", "==", userId)
    );
    const postsSnapshot = await getDocs(postsQuery);

    if (postsSnapshot.empty) {
      console.log("Tidak ada postingan untuk pengguna ini.");
      return {"message": "Tidak ada postingan untuk pengguna ini."};
    }

    // Format data postingan
    const postsData: any[] = [];
    postsSnapshot.forEach((doc) => {
      postsData.push({
        id: doc.id,
        owner: userName,
        ...doc.data(),
      });
    });

    return postsData;
  } catch (error) {
    console.error("Error mendapatkan data:", error);
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
