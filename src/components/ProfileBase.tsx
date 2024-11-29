import {useState, useEffect} from "react";
import {Button} from "@/components/ui/button";
import {Settings} from "lucide-react";
import Sidebar from "@/components/ui/sidebar";
import {getCookie} from "@/lib/withAuth"; // Pastikan getCookie digunakan dengan benar
import Custom404 from "@/pages/404";

interface UserData {
  id: string;
  email: string;
  fullname: string;
  username: string;
  bio: string;
  createdAt: Date;
  token: string;
  profilePicture?: string;
}

interface ProfileBaseProps {
  user: UserData | any; // Tipe data user bisa null jika user tidak ditemukan
  children?: React.ReactNode;
}

export default function ProfileBase({user, children}: ProfileBaseProps) {
  if (!user) {
    return <Custom404 />; // Jika user null atau tidak ada, tampilkan halaman 404
  }

  return (
    <div className="flex flex-col min-h-screen w-screen bg-gray-100 sm:flex-row text-black">
      <Sidebar />
      <div className="w-2/3 ml-96 text-black p-4 bg-white rounded-xl">
        <div className="flex items-center mb-8">
          <img
            src={
              user?.profilePicture ||
              "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
            }
            alt={user?.username}
            className="rounded-full w-48 h-48 object-cover"
          />
          <div className="ml-8">
            <div className="flex items-center mb-4">
              <h1 className="text-2xl font-bold mr-4">
                {user?.username || "user"}
              </h1>
              <Button variant="outline" className="mr-2">
                Edit Profile
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex mb-4">
              <span className="mr-6">
                <strong>0</strong> posts
              </span>
              <span className="mr-6">
                <strong>1000</strong> followers
              </span>
              <span>
                <strong>2</strong> following
              </span>
            </div>
            <div>
              <h2 className="font-bold">{user?.fullname || "user"}</h2>
              <p>{user?.bio}</p>
            </div>
          </div>
        </div>
        {/* Tulis konten lain yang ingin ditampilkan di bagian bawah */}
        <div className="flex flex-col gap-5">{children}</div>
      </div>
    </div>
  );
}
