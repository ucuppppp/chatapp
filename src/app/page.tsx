"use client";
import React, {use, useEffect, useState} from "react";
import {Bookmark, Camera, Heart, MessageCircle} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {ScrollArea} from "@/components/ui/scroll-area";
import withAuth, {getCookie} from "@/lib/withAuth";
import Sidebar from "@/components/ui/sidebar";
import MobileNav from "@/components/ui/mobileNav";
import {getRecentPosts} from "@/lib/firebase/firestore";
import {DotsVerticalIcon} from "@radix-ui/react-icons";
import {useRouter} from "next/navigation";
import {usePostStore} from "@/lib/store/usePostStore";
import { useLikeStore } from "@/lib/store/likeStore";

interface UserData {
  id: string;
  email: string;
  username: string;
  createdAt: Date;
  token: string;
  profilePicture?: string;
}

interface PostsData {
  id: string;
  owner: string;
  content: string;
  caption: string;
  createdAt: string;
  likes: string[];
  userId: string;
  avatar: string;
}

const SocialMediaLayout = () => {
  const [user, setUser] = useState<UserData>();
  const router = useRouter();

  const setPosts = usePostStore((state) => state.setPosts);
  const {isLiking, toggleLike, getLikesStatus} = useLikeStore();


  const handleLike =  (postId: string, userId: string) => {
    toggleLike(postId, userId);
}


  useEffect(() => {
    const fetchData = async () => {
      const userData = getCookie("currentUser");
      if (userData) {
        setUser(JSON.parse(userData));
      }
      const postsData = await getRecentPosts();
      if (postsData) {
        setPosts(postsData);
      }
    };

    fetchData();
    
  }, []);

  const posts = usePostStore((state) => state.posts);
  // Mock data for stories, posts, and suggestions

  const isPostLiked = (postId: string) => {
    return getLikesStatus(postId);
  }

  const stories = [
    {id: 1, username: "user1", avatar: "/placeholder.svg?height=64&width=64"},
    {id: 2, username: "user2", avatar: "/placeholder.svg?height=64&width=64"},
    {id: 3, username: "user3", avatar: "/placeholder.svg?height=64&width=64"},
    {id: 4, username: "user4", avatar: "/placeholder.svg?height=64&width=64"},
    {id: 5, username: "user5", avatar: "/placeholder.svg?height=64&width=64"},
  ];

  // const posts = [
  //   { id: 1, username: 'johndoe', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb-NGEQDekk2BwsllLjk4tcIM_BPIzXECdsg&s', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb-NGEQDekk2BwsllLjk4tcIM_BPIzXECdsg&s', likes: 1234, caption: 'Indahnya pemandangan hari ini! #liburan' },
  //   { id: 2, username: 'janedoe', avatar: '/placeholder.svg?height=32&width=32', image: 'https://i.pinimg.com/564x/d5/d4/bb/d5d4bb7e8a83e3cc20f3383e4ca3e5c7.jpg', likes: 5678, caption: 'Makan siang yang lezat 🍝 #foodie' },
  //   { id: 3, username: 'bobsmith', avatar: '/placeholder.svg?height=32&width=32', image: 'https://i.pinimg.com/564x/70/4d/ed/704ded581835279d7be80485b9756304.jpg', likes: 910, caption: 'Baru selesai maraton pertama! 🏃‍♂️ #fitness' },
  // ]

  const suggestions = [
    {
      id: 1,
      username: "suggested_user1",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      username: "suggested_user2",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      username: "suggested_user3",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen w-screen bg-gray-100 sm:flex-row ">
      {/* Header */}
      <header className="text-black z-50 flex h-16 w-full items-center justify-between bg-white px-4 sm:hidden">
        <div className="flex items-center gap-1">
          <Camera />
          <h1 className="text-2xl font-bold">SocialApp</h1>
        </div>
        <div className="flex items-center gap-4">
          <MessageCircle />
        </div>
      </header>

      <Sidebar />

      <MobileNav />

      {/* Main content */}
      <main className="flex-grow mx-auto text-black">
        <div className="w-screen sm:max-w-md md:max-w-xl mx-auto p-4">
          {/* Stories */}
          <ScrollArea className="mb-2 w-full whitespace-nowrap rounded-lg ">
            <div className="flex space-x-4 p-2">
              {stories.map((story) => (
                <div key={story.id} className="flex flex-col items-center">
                  <Avatar className="h-16 w-16 ring-2 ring-primary ring-offset-2">
                    <AvatarImage src={story.avatar} alt={story.username} />
                    <AvatarFallback>
                      {story.username[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="mt-1 text-xs">{story.username}</span>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Posts */}
          <div className="space-y-4 mx-auto rounded-xl overflow-hidden md:max-w-2xl">
            {posts?.map((post) => (
              <Card key={post.id}>
                <CardHeader className="flex flex-row items-center justify-between space-x-4">
                  <div className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage src={post.avatar} alt={post.owner} />
                      <AvatarFallback>
                        {post.owner[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="font-semibold">{post.owner}</div>
                    <div className="text-sm text-muted-foreground">
                      {`• ${post.createdAt}`}
                    </div>
                  </div>
                  <div className="cursor-pointer">
                    <DotsVerticalIcon className="h-6 w-6 text-black" />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <img src={post.content} alt="Post" className="w-full" />
                </CardContent>
                <CardFooter className="flex flex-col items-start space-y-2 p-2">
                  <div className="flex w-full items-center justify-between">
                    <div className="flex space-x-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleLike(post.id, user?.id ?? "")}
                      >
                        <Heart
                          className="!h-7 !w-7"
                          fill={isPostLiked(post.id) ? "red" : "white"}
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          router.push(`/p/${post.id}`);
                        }}
                      >
                        <MessageCircle className="!h-7 !w-7" />
                      </Button>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Bookmark className="!h-7 !w-7" />
                    </Button>
                  </div>
                  <div>{post.likes.length.toLocaleString()} suka</div>
                  <div className="">
                    <span className="font-semibold">{post.owner}</span>{" "}
                    {post.caption}
                  </div>
                  <div className="text-sm text-muted-foreground md:hidden">
                    {/* {post?.createdAt} */}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Right section */}
      <aside className="text-black hidden xl:flex flex-1 fixed right-0 top-0 h-screen w-80 flex-col border-l bg-white p-5">
        <div className="mb-6 flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={user?.profilePicture} alt={user?.username} />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">{user?.username}</div>
            <div className="text-sm text-gray-500">{user?.email}</div>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="mb-4 text-sm font-semibold text-gray-500">
            Saran untuk Anda
          </h3>
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="mb-3 flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage
                    src={suggestion.avatar}
                    alt={suggestion.username}
                  />
                  <AvatarFallback>
                    {suggestion.username[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-semibold">
                    {suggestion.username}
                  </div>
                  <div className="text-xs text-gray-500">
                    Disarankan untuk Anda
                  </div>
                </div>
              </div>
              <Button variant="link" size="sm">
                Ikuti
              </Button>
            </div>
          ))}
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold text-gray-500">
            Tren Terkini
          </h3>
          <div className="space-y-2">
            <div>#TrenTerkini1</div>
            <div>#TrenTerkini2</div>
            <div>#TrenTerkini3</div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default SocialMediaLayout;
