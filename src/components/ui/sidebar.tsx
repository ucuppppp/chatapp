import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BellIcon, GearIcon, HomeIcon, MagnifyingGlassIcon, PersonIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarImage } from "./avatar";

export default function Sidebar() {
  return (
    <>
      <div className="w-1/5 p-4 h-screen border-r border-gray-700 flex flex-col justify-between sticky top-0">
      <div className="divide-y divide-gray-700">
        <div className="header p-10">
          <h1 className="text-xl text-center font-bold">SOCIALMEDIA</h1>
        </div>
        <div className="flex flex-col gap-10 pt-10">
          <h1 className="flex items-center gap-5 text-xl pl-3 cursor-pointer select-none font-bold">
            <HomeIcon className={"h-7 w-7 item"} />
            Beranda
          </h1>
          <h1 className="flex items-center gap-5 text-xl pl-3 cursor-pointer select-none">
            <MagnifyingGlassIcon className={"h-7 w-7 item"} />
            Cari
          </h1>
          <h1 className="flex items-center gap-5 text-xl pl-3 cursor-pointer select-none">
            <PlusCircledIcon className={"h-7 w-7 item"} />
            Posting
          </h1>
          <h1 className="flex items-center gap-5 text-xl pl-3 cursor-pointer select-none">
            <BellIcon className={"h-7 w-7 item"} />
            Notifikasi
          </h1>
        </div>
      </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full flex items-center justify-between pl-3 p-2 hover:bg-gray-900 rounded-lg">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
              <span className="select-none">Ucupp</span>
            </div>
            <span className="pr-3 text-gray-600 select-none">∧</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="dark w-56 h-56 bg-gray-800">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuItem className="cursor-pointer text-sm">
              <PersonIcon /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <GearIcon /> Settings
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
