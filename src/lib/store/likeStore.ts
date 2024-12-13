import {create} from "zustand";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import {db} from "@/lib/firebase/init"; // pastikan import Firestore db
import {debounce} from "lodash";

type LikeStore = {
  isLiking: boolean;
  toggleLike: (postId: string, userId: string) => void;
  getLikesStatus: (postId: string, userId: string) => Promise<boolean>;
};

export const useLikeStore = create<LikeStore>((set) => {
  const debouncedToggle = debounce(async (postId: string, userId: string) => {
    try {
      const postRef = doc(db, "posts", postId);
      const postSnap = await getDoc(postRef);

      if (postSnap.exists()) {
        const post = postSnap.data();
        const likes = post.likes || [];

        if (likes.includes(userId)) {
          await updateDoc(postRef, {likes: arrayRemove(userId)});
        } else {
          await updateDoc(postRef, {likes: arrayUnion(userId)});
        }
      } else {
        console.log("Post not found.");
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
    set({isLiking: false});
  }, 300); // Delay 300ms

  const getLikesStatus = async (postId: string, userId: string) => {
    try {
      const postRef = doc(db, "posts", postId);
      const postSnap = await getDoc(postRef);

      if (postSnap.exists()) {
        const post = postSnap.data();
        const likes = post.likes || [];

        // Mengembalikan true jika user sudah menyukai post, false jika belum
        return likes.includes(userId);
      } else {
        console.log("Post not found.");
        return false; // Jika post tidak ditemukan, dianggap tidak disukai
      }
    } catch (error) {
      console.error("Error getting likes status:", error);
      return false;
    }
  };


  return {
    isLiking: false,
    toggleLike: (postId, userId) => {
      set({isLiking: true});
      debouncedToggle(postId, userId);
    },
    getLikesStatus
  };
});
