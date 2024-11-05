import {collection, addDoc} from "firebase/firestore";
import {db} from "./init";



const addChatMessage = async (message:string, userId:string) => {
  try {
    await addDoc(collection(db, "chats"), {
      userId: userId,
      message: message,
      timestamp: new Date(),
    });
    console.log("Pesan berhasil disimpan");
  } catch (e) {
    console.error("Error saat menyimpan pesan: ", e);
  }
};

export default addChatMessage;