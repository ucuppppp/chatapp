"use client";
import Modal from "@/components/ui/modal";
import {usePostStore} from "@/lib/store/usePostStore";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {DotsVerticalIcon} from "@radix-ui/react-icons";
import React from "react";

export default function ModalPost({params}: {params : Promise<{id: string}>}) {
  const id = React.use(params).id;
  const getPostById = usePostStore((state) => state.getPostById);
  const post = getPostById(id);

  if (!post) {
    return (
      <Modal>
        <div className="flex justify-center items-center h-[80vh]">
          <p className="text-black">Loading...</p>
        </div>
      </Modal>
    );
  }

  console.log("intercepted");

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
        <div className="w-1/2 h-[80vh] flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src={post.avatar} alt={post.owner} />
                <AvatarFallback>{post.owner[0].toUpperCase()}</AvatarFallback>
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
                  <AvatarFallback>{post.owner[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="font-semibold text-black">{post.owner}</div>
                <p className="text-sm text-black">{post?.caption}</p>
                
              </>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
