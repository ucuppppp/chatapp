import { Heart, Home, PlusSquare, Search, User } from "lucide-react";
import { Button } from "./button";

export default function MobileNav() {
    return (
<nav className="text-black fixed bottom-0 left-0 right-0 flex justify-around border-t bg-white p-3 sm:hidden">
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
    )
}
