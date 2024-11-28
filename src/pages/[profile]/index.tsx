import {useEffect, useState} from "react";
import ProfileBase from "@/components/ProfileBase";
import {Heart, MessageCircle} from "lucide-react";
import getUserPosts from "@/lib/firebase/firestore";
import {getCookie} from "@/lib/withAuth";
import {useRouter} from "next/router";
import ProfileNavigation from "@/components/ui/profile-nav";
import getDataByField from "@/lib/getDataByField";

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

export default function ProfilePosts() {
  const [posts, setPosts] = useState<PostsData[]>([]);
  const [isOwner, setIsOwner] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<any[] | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const currentUserData = getCookie("currentUser");
        const visitedProfile = router.query.profile as string;

        if (!visitedProfile) return; // Jika profil tidak ada di query, keluar
        setUsername(visitedProfile);

        if (currentUserData) {
          const currentUser = JSON.parse(currentUserData);

          // Periksa apakah profil yang dikunjungi adalah milik pengguna sendiri
          const isCurrentUser = currentUser.username === visitedProfile;
          setIsOwner(isCurrentUser);
          
          // Ambil data post sesuai pemilik
          const postsData = isCurrentUser
          ? await getUserPosts(currentUser.username) // Data untuk pemilik akun
          : await getUserPosts(visitedProfile); // Data untuk profil lain
          
          setCurrentUser((await getDataByField("users", "username", visitedProfile))?.[0]);

          setPosts(postsData || []);
        }
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [router.query.profile]);

  if (loading) {
    return (
        <p>Loading profile...</p>
    );
  }

  if (!posts.length) {
    return (
        <p>No posts available.</p>
    );
  }

  return (
    <ProfileBase user={currentUser}>
      <ProfileNavigation username={username} isOwner={isOwner} />
      <div className="grid grid-cols-3 gap-1">
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
    </ProfileBase>
  );
}
