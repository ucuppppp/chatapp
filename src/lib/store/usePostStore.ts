import { Timestamp } from "firebase/firestore";
import {create} from "zustand";

type Post = {
  id: string;
  content: string;
  caption?: string;
  createdAt: Timestamp;
  likes: string[];
  userId: string;
  owner: string;
  avatar: string;
};

type PostStore = {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  getPostById: (id: string) => Post | undefined;
};

export const usePostStore = create<PostStore>((set, get) => ({
  posts: [],
  setPosts: (posts) => set({posts}),
  getPostById: (id) => get().posts.find((post) => post.id === id),
}));
