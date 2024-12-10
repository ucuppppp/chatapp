"use client";
import { Bookmark, Camera, Heart, Home, MessageCircle, PlusSquare, Search, Settings, User } from "lucide-react";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { getCookie } from "@/lib/withAuth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type UserData = {
  username: string;
  email: string;
  createdAt: Date;
  token: string;
  profilePicture?: string;
}

export default function Sidebar() {
  const [user, setUser] = useState<UserData>();
  const router = useRouter();

  useEffect(() => {
    const userData = getCookie("currentUser");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [])

  console.log(user?.username)

  return (
    <>
      {/* Sidebar */}
      <aside className="text-black flex-1 fixed left-0 top-0 z-40 hidden h-screen flex-col border-r bg-white p-5 min-w-20 sm:flex xl:flex xl:w-64">
        <div className="mb-10 text-2xl font-bold hidden xl:block">
          SocialApp
        </div>
        <div className="mb-10 text-2xl font-bold xl:hidden flex justify-center items-center">
          <Camera />
        </div>
        <nav className="flex flex-1 gap-4 flex-col items-center text-2xl space-y-2 xl:items-start xl:gap-3">
          <Button
            variant="ghost"
            className="w-full lex gap-3 justify-start !text-lg"
            onClick={() => router.push("/")}
          >
            <Home className="!w-7 !h-7" />
            <p className="hidden xl:block">Beranda</p>
          </Button>
          <Button
            variant="ghost"
            className="w-full flex gap-3 justify-start !text-lg"
          >
            <Search className="!w-7 !h-7" />
            <p className="hidden xl:block">Cari</p>
          </Button>
          <Button
            variant="ghost"
            className="w-full flex gap-3 justify-start !text-lg"
          >
            <PlusSquare className="!w-7 !h-7" />
            <p className="hidden xl:block">Buat</p>
          </Button>
          <Button
            variant="ghost"
            className="w-full flex gap-3 justify-start !text-lg"
          >
            <Heart className="!w-7 !h-7" />
            <p className="hidden xl:block">Notifikasi</p>
          </Button>
          <Button
            variant="ghost"
            className="w-full flex gap-3 justify-start !text-lg"
          >
            <MessageCircle className="!w-7 !h-7" />
            <p className="hidden xl:block">Pesan</p>
          </Button>
          <Button
            variant="ghost"
            className="w-full flex gap-3 justify-start !text-lg"
          >
            <Bookmark className="!w-7 !h-7" />
            <p className="hidden xl:block">Koleksi</p>
          </Button>
          <Button
            variant="ghost"
            className="w-full flex gap-3 justify-start !text-lg"
            onClick={() => router.push(`/${user?.username}`)}
          >
            <Avatar className="w-8 h-8 xl:w-7 xl:h-7">
              <AvatarImage
                src={user?.profilePicture}
                alt={`@${user?.username}`}
              />
              <AvatarFallback>{user?.username[0].toLocaleUpperCase()}</AvatarFallback>
            </Avatar>
            <p className="hidden xl:block">Profil</p>
          </Button>
          {/* Button components omitted for brevity */}
        </nav>
        <Button
          variant="ghost"
          className="w-full flex gap-3 justify-start !text-lg"
        >
          <Settings className="!w-7 !h-7" />
          <p className="hidden xl:block">Pengaturan</p>
        </Button>
      </aside>
    </>
  );
}
