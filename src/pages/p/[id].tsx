import {useRouter} from "next/router";
import Modal from "@/components/ui/modal";
import getDataByField from "@/lib/getDataByField";
import {useEffect, useState} from "react";
import { getPost } from "@/lib/firebase/firestore";
import { usePostStore } from "@/lib/store/usePostStore";

export default function Post() {
  const router = useRouter();
  const {id} = router.query;
  const getPostById = usePostStore((state) => state.getPostById);
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    if (id && typeof id === "string") {
      // Fetch data menggunakan id dari URL
      const post = getPostById(id);
      setPost(post || null)
    }
  }, [id, getPostById]);

  if (!post) return <div>Loading...</div>;

  console.log(post);

  return (
    <Modal>
      <div className="flex w-[80vw]">
        <div className="w-1/2 h-[80vh]">
          <img
            src={post.content}
            alt={post.caption}
            className="w-full h-full object-cover aspect-square"
          />
        </div>
        <div className="w-1/2 h-[80vh]">
          <h1>{post.caption}</h1>
          <p>{post.caption}</p>
        </div>
      </div>
    </Modal>
  );
}
