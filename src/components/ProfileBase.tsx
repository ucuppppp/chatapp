import {useState, useEffect} from "react";
import {Button} from "@/components/ui/button";
import {Settings} from "lucide-react";
import Sidebar from "@/components/ui/sidebar";
import {getCookie} from "@/lib/withAuth";

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
  user: any;
  children?: React.ReactNode;
}

export default function ProfileBase({user, children}: ProfileBaseProps) {

  console.log(user)
  return (
    <div className="flex flex-col min-h-screen w-screen bg-gray-100 sm:flex-row text-black">
      <Sidebar />
      <div className="w-2/3 ml-96 text-black p-4 bg-white rounded-xl">
        <div className="flex items-center mb-8">
          <img
            src={
              user?.profilePicture ||
              "https://i.pinimg.com/564x/3e/9a/94/3e9a94bccd76d57e77ff27bebca4028c.jpg"
            }
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
        <div className="flex flex-col gap-5">
        {children}
        </div>
      </div>
    </div>
  );
}
