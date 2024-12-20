"use client";
import {useRouter} from "next/router";
import Modal from "@/components/ui/modal";
import getDataByField from "@/lib/getDataByField";
import React, {useEffect, useState} from "react";
import { getPost } from "@/lib/firebase/firestore";
import { usePostStore } from "@/lib/store/usePostStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import Sidebar from "@/components/ui/sidebar";

export default function Post({params}: {params: Promise<{ id: string }>}) {
  const id = React.use(params).id;
  const [post, setPost] = useState<any>(null);

  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await getPost(id);
        setPost(post);
      } catch (err) {
        console.log(err);
      }
    };
  
    if (id && typeof id === "string") {
      // Fetch data menggunakan id dari URL
      const post = fetchPost();
      setPost(post || null)
    }
  }, [id]);
  
  console.log(post);
  if (!post) return <div>Loading...</div>;


  return (
    <>
      <Sidebar/>
      <main className="flex align-center justify-center h-screen bg-white">
        <div className="flex w-[70vw] h-[80vh] my-auto ml-72 border rounded-xl">
          <div className="w-1/2 h-[80vh]">
            <img
              src={post.content}
              alt={post.caption}
              className="w-full h-full object-cover aspect-square"
            />
          </div>
          <div className="w-1/2 h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src={post.avatar} alt={post.owner} />
                  {/* <AvatarFallback>{post.owner[0].toUpperCase()}</AvatarFallback> */}
                </Avatar>
                <div className="font-semibold text-black">{post.owner}</div>
                <div className="text-sm text-muted-foreground">
                  {`• ${post.createdAt}`}
                </div>
              </div>
              <div className="cursor-pointer">
                <DotsVerticalIcon className="h-6 w-6 text-black" />
              </div>
            </div>
            <div className="flex items-center gap-2 p-4">
              {post?.caption && (
                <>
                  <Avatar>
                    <AvatarImage src={post.avatar} alt={post.owner} />
                    <AvatarFallback>
                      {/* {post.owner[0].toUpperCase()} */}
                    </AvatarFallback>
                  </Avatar>
                  <div className="font-semibold text-black">{post.owner}</div>
                  <p className="text-sm text-black">{post?.caption}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
