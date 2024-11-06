import Image from "next/image";
import localFont from "next/font/local";
import Sidebar from "@/components/ui/sidebar";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BookmarkIcon,
  ChatBubbleIcon,
  DotsHorizontalIcon,
  DotsVerticalIcon,
  HeartIcon,
  PaperPlaneIcon,
} from "@radix-ui/react-icons";
import {Button} from "@/components/ui/button";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <>
      <main className="flex flex-row">
        <Sidebar />
        <div className="w-full h-auto flex flex-col">
          <div className="main flex w-3/4 flex-col mx-7 px-4 justify-center items-center">
            <div className="statuses w-full p-4 flex justify-center gap-4">
              <div className="status flex flex-col items-center gap-1">
                <Avatar className="h-20 w-20 border-2 border-blue-700">
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
                <span className="username">username</span>
              </div>
              <div className="status flex flex-col items-center gap-1">
                <Avatar className="h-20 w-20 border-2 border-blue-700">
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
                <span className="username">username</span>
              </div>
              <div className="status flex flex-col items-center gap-1">
                <Avatar className="h-20 w-20 border-2 border-blue-700">
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
                <span className="username">username</span>
              </div>
              <div className="status flex flex-col items-center gap-1">
                <Avatar className="h-20 w-20 border border-blue-700">
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
                <span className="username">username</span>
              </div>
              <div className="status flex flex-col items-center gap-1">
                <Avatar className="h-20 w-20 border border-blue-700">
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
                <span className="username">username</span>
              </div>
              <div className="status flex flex-col items-center gap-1">
                <Avatar className="h-20 w-20 border border-blue-700">
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
                <span className="username">username</span>
              </div>
              <div className="status flex flex-col items-center gap-1">
                <Avatar className="h-20 w-20 border border-blue-700">
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
                <span className="username">username</span>
              </div>
              <div className="status flex flex-col items-center gap-1">
                <Avatar className="h-20 w-20 border border-blue-700">
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
                <span className="username">username</span>
              </div>
            </div>
            <div className="posts w-5/6 h-full p-4 flex flex-col items-center gap-4 ">
              <Card className="w-2/3 h-auto p-4 dark">
                <CardHeader className="flex flex-row items-center">
                  <Avatar className="flex">
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                  <CardTitle className="flex-1 pl-3">_cristiano7</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button className="text-sm">Follow</Button>
                    <DotsVerticalIcon className="h-6 w-6" color="white" />
                  </div>
                </CardHeader>
                <CardContent className="w-full h-[700px] flex flex-col">
                  <div className="rounded-lg overflow-hidden w-full">
                    <img
                      src="https://img.a.transfermarkt.technology/portrait/big/8198-1694609670.jpg?lm=1"
                      alt=""
                      className="object-cover h-full w-full"
                    />
                  </div>
                  <div className="interaction flex items-center justify-between pt-4">
                    <div className="share like flex items-center gap-2">
                      <div className="like flex items-center gap-1">
                        <HeartIcon className="h-9 w-9" />
                        <span className="likecount text-lg">10</span>
                      </div>
                      <div className="comment flex items-center gap-1">
                        <ChatBubbleIcon className="h-9 w-9" />
                        <span className="commentcount text-lg">10</span>
                      </div>
                      <div className="share flex items-center gap-1">
                        <PaperPlaneIcon className="h-9 w-9" />
                        <span className="sharecount text-lg">10</span>
                      </div>
                    </div>
                    <div className="bookmark flex items-center">
                      <BookmarkIcon className="h-9 w-9" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-row items-center h-auto pb-4">
                  <CardDescription className="flex text-lg text-white">
                    description Lorem ipsum dolor sit, amet consectetur
                    adipisicing elit. Adipisci reprehenderit asperiores, dolorem
                    facilis dignissimos enim. Sed a impedit animi velit! Qui
                    vitae tempore ex est beatae doloremque accusantium animi,
                    ipsam facilis tens.
                  </CardDescription>
                </CardFooter>
              </Card>
              <Card className="w-2/3 h-auto p-4 dark">
                <CardHeader className="flex flex-row items-center">
                  <Avatar className="flex">
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                  <CardTitle className="flex-1 pl-3">_cristiano7</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button className="text-sm">Follow</Button>
                    <DotsVerticalIcon className="h-6 w-6" color="white" />
                  </div>
                </CardHeader>
                <CardContent className="w-full h-[700px] flex flex-col">
                  <div className="rounded-lg overflow-hidden w-full">
                    <img
                      src="https://img.a.transfermarkt.technology/portrait/big/8198-1694609670.jpg?lm=1"
                      alt=""
                      className="object-cover h-full w-full"
                    />
                  </div>
                  <div className="interaction flex items-center justify-between pt-4">
                    <div className="share like flex items-center gap-2">
                      <div className="like flex items-center gap-1">
                        <HeartIcon className="h-9 w-9" />
                        <span className="likecount text-lg">10</span>
                      </div>
                      <div className="comment flex items-center gap-1">
                        <ChatBubbleIcon className="h-9 w-9" />
                        <span className="commentcount text-lg">10</span>
                      </div>
                      <div className="share flex items-center gap-1">
                        <PaperPlaneIcon className="h-9 w-9" />
                        <span className="sharecount text-lg">10</span>
                      </div>
                    </div>
                    <div className="bookmark flex items-center">
                      <BookmarkIcon className="h-9 w-9" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-row items-center h-auto pb-4">
                  <CardDescription className="flex text-lg text-white">
                    description Lorem ipsum dolor sit, amet consectetur
                    adipisicing elit. Adipisci reprehenderit asperiores, dolorem
                    facilis dignissimos enim. Sed a impedit animi velit! Qui
                    vitae tempore ex est beatae doloremque accusantium animi,
                    ipsam facilis tens.
                  </CardDescription>
                </CardFooter>
              </Card>
              <Card className="w-2/3 h-auto p-4 dark">
                <CardHeader className="flex flex-row items-center">
                  <Avatar className="flex">
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                  <CardTitle className="flex-1 pl-3">_cristiano7</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button className="text-sm">Follow</Button>
                    <DotsVerticalIcon className="h-6 w-6" color="white" />
                  </div>
                </CardHeader>
                <CardContent className="w-full h-[700px] flex flex-col">
                  <div className="rounded-lg overflow-hidden w-full">
                    <img
                      src="https://img.a.transfermarkt.technology/portrait/big/8198-1694609670.jpg?lm=1"
                      alt=""
                      className="object-cover h-full w-full"
                    />
                  </div>
                  <div className="interaction flex items-center justify-between pt-4">
                    <div className="share like flex items-center gap-2">
                      <div className="like flex items-center gap-1">
                        <HeartIcon className="h-9 w-9" />
                        <span className="likecount text-lg">10</span>
                      </div>
                      <div className="comment flex items-center gap-1">
                        <ChatBubbleIcon className="h-9 w-9" />
                        <span className="commentcount text-lg">10</span>
                      </div>
                      <div className="share flex items-center gap-1">
                        <PaperPlaneIcon className="h-9 w-9" />
                        <span className="sharecount text-lg">10</span>
                      </div>
                    </div>
                    <div className="bookmark flex items-center">
                      <BookmarkIcon className="h-9 w-9" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-row items-center h-auto pb-4">
                  <CardDescription className="flex text-lg text-white">
                    description Lorem ipsum dolor sit, amet consectetur
                    adipisicing elit. Adipisci reprehenderit asperiores, dolorem
                    facilis dignissimos enim. Sed a impedit animi velit! Qui
                    vitae tempore ex est beatae doloremque accusantium animi,
                    ipsam facilis tens.
                  </CardDescription>
                </CardFooter>
              </Card>
              <Card className="w-2/3 h-auto p-4 dark">
                <CardHeader className="flex flex-row items-center">
                  <Avatar className="flex">
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                  <CardTitle className="flex-1 pl-3">_cristiano7</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button className="text-sm">Follow</Button>
                    <DotsVerticalIcon className="h-6 w-6" color="white" />
                  </div>
                </CardHeader>
                <CardContent className="w-full h-[700px] flex flex-col">
                  <div className="rounded-lg overflow-hidden w-full">
                    <img
                      src="https://img.a.transfermarkt.technology/portrait/big/8198-1694609670.jpg?lm=1"
                      alt=""
                      className="object-cover h-full w-full"
                    />
                  </div>
                  <div className="interaction flex items-center justify-between pt-4">
                    <div className="share like flex items-center gap-2">
                      <div className="like flex items-center gap-1">
                        <HeartIcon className="h-9 w-9" />
                        <span className="likecount text-lg">10</span>
                      </div>
                      <div className="comment flex items-center gap-1">
                        <ChatBubbleIcon className="h-9 w-9" />
                        <span className="commentcount text-lg">10</span>
                      </div>
                      <div className="share flex items-center gap-1">
                        <PaperPlaneIcon className="h-9 w-9" />
                        <span className="sharecount text-lg">10</span>
                      </div>
                    </div>
                    <div className="bookmark flex items-center">
                      <BookmarkIcon className="h-9 w-9" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-row items-center h-auto pb-4">
                  <CardDescription className="flex text-lg text-white">
                    description Lorem ipsum dolor sit, amet consectetur
                    adipisicing elit. Adipisci reprehenderit asperiores, dolorem
                    facilis dignissimos enim. Sed a impedit animi velit! Qui
                    vitae tempore ex est beatae doloremque accusantium animi,
                    ipsam facilis tens.
                  </CardDescription>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
