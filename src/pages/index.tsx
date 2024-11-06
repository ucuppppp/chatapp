import React from 'react'
import { Bell, Bookmark, Camera, Heart, Home, LogOut, MessageCircle, PlusSquare, Search, Settings, TvIcon, User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

export default function SocialMediaLayout() {
  // Mock data for stories, posts, and suggestions
  const stories = [
    { id: 1, username: 'user1', avatar: '/placeholder.svg?height=64&width=64' },
    { id: 2, username: 'user2', avatar: '/placeholder.svg?height=64&width=64' },
    { id: 3, username: 'user3', avatar: '/placeholder.svg?height=64&width=64' },
    { id: 4, username: 'user4', avatar: '/placeholder.svg?height=64&width=64' },
    { id: 5, username: 'user5', avatar: '/placeholder.svg?height=64&width=64' },
  ]

  const posts = [
    { id: 1, username: 'johndoe', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb-NGEQDekk2BwsllLjk4tcIM_BPIzXECdsg&s', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb-NGEQDekk2BwsllLjk4tcIM_BPIzXECdsg&s', likes: 1234, caption: 'Indahnya pemandangan hari ini! #liburan' },
    { id: 2, username: 'janedoe', avatar: '/placeholder.svg?height=32&width=32', image: 'https://i.pinimg.com/564x/d5/d4/bb/d5d4bb7e8a83e3cc20f3383e4ca3e5c7.jpg', likes: 5678, caption: 'Makan siang yang lezat 🍝 #foodie' },
    { id: 3, username: 'bobsmith', avatar: '/placeholder.svg?height=32&width=32', image: 'https://i.pinimg.com/564x/70/4d/ed/704ded581835279d7be80485b9756304.jpg', likes: 910, caption: 'Baru selesai maraton pertama! 🏃‍♂️ #fitness' },
  ]

  const suggestions = [
    { id: 1, username: 'suggested_user1', avatar: '/placeholder.svg?height=40&width=40' },
    { id: 2, username: 'suggested_user2', avatar: '/placeholder.svg?height=40&width=40' },
    { id: 3, username: 'suggested_user3', avatar: '/placeholder.svg?height=40&width=40' },
  ]

  return (
    <div className="flex flex-col min-h-screen w-screen bg-gray-100 sm:flex-row ">
      {/* Header */}
      <header className="z-50 flex h-16 w-full items-center justify-between bg-white px-4 sm:hidden">
        <div className="flex items-center gap-1">
          <Camera />
          <h1 className="text-2xl font-bold">SocialApp</h1>
        </div>
        <div className="flex items-center gap-4">
          <MessageCircle />
        </div>
      </header>

    

      {/* Sidebar */}
      <aside className="flex-1 fixed left-0 top-0 z-40 hidden h-screen flex-col border-r bg-white p-5 min-w-20 sm:flex xl:flex xl:w-64">
        <div className="mb-10 text-2xl font-bold hidden xl:block">SocialApp</div>
        <div className="mb-10 text-2xl font-bold xl:hidden flex justify-center items-center"><Camera /></div>
        <nav className="flex flex-1 flex-col items-center text-2xl space-y-2 xl:items-start">
          <Button variant="ghost" className="justify-start text-xl xl:text-base">
            <Home size={64} />
            <p className='hidden xl:block'>
              Beranda
            </p>
          </Button>
          <Button variant="ghost" className="justify-start text-2xl xl:text-base">
            <Search />
            <p className='hidden xl:block'>
              Cari
            </p>
          </Button>
          <Button variant="ghost" className="justify-start text-xl xl:text-base">
            <PlusSquare />
            <p className='hidden xl:block'>
              Buat
            </p>
          </Button>
          <Button variant="ghost" className="justify-start text-xl xl:text-base">
            <Heart />
            <p className='hidden xl:block'>
              Notifikasi
            </p>
          </Button>
          <Button variant="ghost" className="justify-start text-xl xl:text-base">
            <MessageCircle />
            <p className='hidden xl:block'>
              Pesan
            </p>
          </Button>
          <Button variant="ghost" className="justify-start text-xl xl:text-base">
            <Bookmark />
            <p className='hidden xl:block'>
              Koleksi
            </p>
          </Button>
          <Button variant="ghost" className="justify-start text-xl xl:text-base">
            <User />
            <p className='hidden xl:block'>
              Profil
            </p>
          </Button>
          {/* Button components omitted for brevity */}
        </nav>
        <Button variant="ghost" className="justify-start text-xl xl:text-base">
          <Settings />
          <p className='hidden xl:block'>Pengaturan</p>
        </Button>
      </aside>

      {/* Main content */}
      <main className="flex-grow mx-auto">
        <div className="w-screen sm:max-w-md md:max-w-xl mx-auto p-4">
          {/* Stories */}
          <ScrollArea className="mb-2 w-full whitespace-nowrap rounded-lg ">
            <div className="flex space-x-4 p-2">
              {stories.map((story) => (
                <div key={story.id} className="flex flex-col items-center">
                  <Avatar className="h-16 w-16 ring-2 ring-primary ring-offset-2">
                    <AvatarImage src={story.avatar} alt={story.username} />
                    <AvatarFallback>{story.username[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="mt-1 text-xs">{story.username}</span>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Posts */}
          <div className="space-y-4 mx-auto rounded-xl overflow-hidden md:max-w-2xl">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardHeader className="flex flex-row items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={post.avatar} alt={post.username} />
                    <AvatarFallback>{post.username[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="font-semibold">{post.username}</div>
                </CardHeader>
                <CardContent className="p-0">
                  <img src={post.image} alt="Post" className="w-full" />
                </CardContent>
                <CardFooter className="flex flex-col items-start space-y-2">
                  <div className="flex w-full items-center justify-between">
                    <div className="flex space-x-4">
                      <Button variant="ghost" size="icon">
                        <Heart className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MessageCircle className="h-5 w-5" />
                      </Button>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Bookmark className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="font-semibold">{post.likes.toLocaleString()} suka</div>
                  <div>
                    <span className="font-semibold">{post.username}</span> {post.caption}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Right section */}
      <aside className="hidden xl:flex flex-1 fixed right-0 top-0 h-screen w-80 flex-col border-l bg-white p-5">
        <div className="mb-6 flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=64&width=64" alt="@johndoe" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">johndoe</div>
            <div className="text-sm text-gray-500">John Doe</div>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="mb-4 text-sm font-semibold text-gray-500">Saran untuk Anda</h3>
          {suggestions.map((suggestion) => (
            <div key={suggestion.id} className="mb-3 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={suggestion.avatar} alt={suggestion.username} />
                  <AvatarFallback>{suggestion.username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-semibold">{suggestion.username}</div>
                  <div className="text-xs text-gray-500">Disarankan untuk Anda</div>
                </div>
              </div>
              <Button variant="link" size="sm">
                Ikuti
              </Button>
            </div>
          ))}
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold text-gray-500">Tren Terkini</h3>
          <div className="space-y-2">
            <div>#TrenTerkini1</div>
            <div>#TrenTerkini2</div>
            <div>#TrenTerkini3</div>
          </div>
        </div>
      </aside>

      {/* Mobile bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 flex justify-around border-t bg-white p-3 sm:hidden">
        <Button variant="ghost" size="icon">
          <Home className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <Search className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <PlusSquare className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <Heart className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-6 w-6" />
        </Button>
      </nav>
    </div>
  )
}
