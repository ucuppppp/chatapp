"use client";
import React from "react";
import {useEffect, useState} from "react";
import ProfileBase from "@/components/ProfileBase";
import {Heart, Loader2, MessageCircle} from "lucide-react";
import getUserPosts from "@/lib/firebase/firestore";
import {getCookie} from "@/lib/withAuth";
import {useRouter} from "next/navigation";
import ProfileNavigation from "@/components/ui/profile-nav";
import getDataByField from "@/lib/getDataByField";
import Custom404 from "../not-found";

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

interface UserData {
  id: string;
  username: string;
  profilePicture: string;
}

export default function ProfilePosts({params}: {params: Promise<{profile: string}>}) {
  const [posts, setPosts] = useState<PostsData[]>([]);
  const [isOwner, setIsOwner] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  // Unwrap params using React.use()
  const profile = React.use(params).profile; // Unwrapping the promise

  console.log(profile);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const currentUserData = getCookie("currentUser");
        const visitedProfile = profile;

        if (!visitedProfile) return; // Jika profil tidak ada di query, keluar
        setUsername(visitedProfile);

        if (!currentUserData) {
          setCurrentUser(null);
          return;
        }

        const currentUser = JSON.parse(currentUserData);
        const isCurrentUser = currentUser.username === visitedProfile;
        setIsOwner(isCurrentUser);

        // Ambil data post sesuai pemilik
        const postsData: any = isCurrentUser
          ? await getUserPosts(currentUser.username)
          : await getUserPosts(visitedProfile);

        if (postsData.status === 404) {
          setPosts([]);
        } else {
          setPosts(postsData || []);
        }

        // Ambil data pengguna berdasarkan username
        const userData = await getDataByField(
          "users",
          "username",
          visitedProfile
        );
        setCurrentUser(userData?.[0] || null);
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [profile]);

  if (!currentUser) {
    return <Custom404 />;
  }

  return (
    <ProfileBase user={currentUser}>
      <ProfileNavigation username={username} isOwner={isOwner} />
      <div className="grid grid-cols-3 gap-1">
        {posts.length === 0 && !loading && <div>No posts available</div>}
        {loading && (
          <div className="w-full h-full flex justify-center items-center">
            <Loader2 className="w-10 h-10 animate-spin text-black m-auto" />
          </div>
        )}
        {posts &&
          posts.map((post) => (
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
    </ProfileBase>
  );
}

