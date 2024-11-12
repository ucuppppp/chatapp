import {useEffect, useState} from "react";
import Image from "next/image";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Button} from "@/components/ui/button";
import {Grid, Settings, Bookmark, Tag, Heart, MessageCircle} from "lucide-react";
import Sidebar from "@/components/ui/sidebar";
import getUserPosts, { getRecentPosts } from "@/lib/firebase/firestore";
import { getCookie } from "@/lib/withAuth";

type Post = {
  id: string;
  imageUrl: string;
};

type Highlight = {
  id: string;
  title: string;
  coverUrl: string;
};

// type ProfileProps = {
//   username: string;
//   fullName: string;
//   bio: string;
//   postsCount: number;
//   followersCount: number;
//   followingCount: number;
//   posts: Post[];
//   savedPosts: Post[];
//   taggedPosts: Post[];
//   highlights: Highlight[];
// };

interface UserData {
  id: string;
  email: string;
  fullname:string;
  username: string;
  bio: string;
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

export default function ProfileOwner() {
  // const [activeTab, setActiveTab] = useState("posts");

  const [user, setUser] = useState<UserData>();
  const [posts, setPosts] = useState<PostsData[]>([]);
  const [activeTab, setActiveTab] = useState("posts");

  useEffect(() => {
    const userData = getCookie("currentUser");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    const fetchData = async () => {
      const postsData = await getUserPosts(user?.id);
      if (postsData) {
        //  console.log(postsData);
        setPosts(postsData);
      }
    };

    fetchData();
  }, [user?.id]);

  
  return (
    <div className="flex flex-col min-h-screen w-screen bg-gray-100 sm:flex-row text-black">
      <Sidebar />
      <div className="w-2/3 ml-96 text-black p-4 bg-white rounded-xl">
        <div className="flex items-center mb-8">
          <img
            src="https://i.pinimg.com/564x/3e/9a/94/3e9a94bccd76d57e77ff27bebca4028c.jpg"
            alt={user?.username}
            className="rounded-full w-48 h-48 object-cover"
          />
          <div className="ml-8">
            <div className="flex items-center mb-4">
              <h1 className="text-2xl font-bold mr-4">{user?.username}</h1>
              <Button variant="outline" className="mr-2">
                Edit Profile
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex mb-4">
              <span className="mr-6">
                <strong>{posts.length}</strong> posts
              </span>
              <span className="mr-6">
                <strong>1000</strong> followers
              </span>
              <span>
                <strong>2</strong> following
              </span>
            </div>
            <div>
              <h2 className="font-bold">{user?.fullname}</h2>
              <p>{user?.bio}</p>
            </div>
          </div>
        </div>

        {/* <div className="mb-8 flex space-x-4 overflow-x-auto">
          {highlights.map((highlight) => (
            <div key={highlight.id} className="flex flex-col items-center">
              <Image
                src={highlight.coverUrl}
                alt={highlight.title}
                width={60}
                height={60}
                className="rounded-full border-2 border-gray-300 p-0.5"
              />
              <span className="text-sm mt-1">{highlight.title}</span>
            </div>
          ))}
        </div> */}

        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-3 !text-black">
            <TabsTrigger value="posts" onClick={() => setActiveTab("posts")}>
              <Grid className="h-4 w-4 mr-2" />
              Posts
            </TabsTrigger>
            <TabsTrigger value="saved" onClick={() => setActiveTab("saved")}>
              <Bookmark className="h-4 w-4 mr-2" />
              Saved
            </TabsTrigger>
            <TabsTrigger value="tagged" onClick={() => setActiveTab("tagged")}>
              <Tag className="h-4 w-4 mr-2" />
              Tagged
            </TabsTrigger>
          </TabsList>
          <TabsContent value="posts" className="mt-4">
            <div className="grid grid-cols-3">
              {posts.map((post) => (
                <div className="cursor-pointer w-full relative" key={post.id}>
                  <div className="absolute opacity-0 flex justify-center items-center gap-2 w-full h-full text-white hover:opacity-100 hover:bg-black hover:bg-opacity-50">
                    <div className="flex items-center">
                      <Heart className="h-5 w-5 mr-2" />
                      <span>{post.likes.length}</span>
                    </div>
                    <div>
                      <MessageCircle className="h-5 w-5 mr-2" />
                    </div>
                  </div>
                  <img
                    src={post.content}
                    alt={`Post ${post.id}`}
                    className="object-cover aspect-square"
                  />
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="saved" className="mt-4">
            <div className="grid grid-cols-3 gap-1">
              {/* {savedPosts.map((post) => (
                <Image
                  key={post.id}
                  src={post.imageUrl}
                  alt={`Saved post ${post.id}`}
                  width={300}
                  height={300}
                  className="object-cover aspect-square"
                />
              ))} */}
            </div>
          </TabsContent>
          <TabsContent value="tagged" className="mt-4">
            <div className="grid grid-cols-3 gap-1">
              {/* {taggedPosts.map((post) => (
                <Image
                  key={post.id}
                  src={post.imageUrl}
                  alt={`Tagged post ${post.id}`}
                  width={300}
                  height={300}
                  className="object-cover aspect-square"
                />
              ))} */}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
