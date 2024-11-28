"use client";

import {usePathname} from "next/navigation";
import Link from "next/link";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Grid, Bookmark, Tag} from "lucide-react";

interface ProfileNavigationProps {
  username: string;
  isOwner: boolean;
}

export default function ProfileNavigation({username, isOwner}: ProfileNavigationProps) {
  const pathname = usePathname();

  return (
    <Tabs value={pathname} className="w-full border-t">
      <TabsList className="grid w-full grid-cols-3 bg-white">
        <TabsTrigger value={`/${username}`} asChild>
          <Link
            href={`/${username}`}
            className="flex items-center justify-center py-3"
          >
            <Grid className="h-4 w-4 mr-2" />
            <span className="text-xs font-medium uppercase">Posts</span>
          </Link>
        </TabsTrigger>
        {isOwner && (
            <TabsTrigger value={`/${username}/saved`} asChild>
          <Link
            href={`/${username}/saved`}
            className="flex items-center justify-center py-3"
            >
            <Bookmark className="h-4 w-4 mr-2" />
            <span className="text-xs font-medium uppercase">Saved</span>
          </Link>
        </TabsTrigger>
        )}
        <TabsTrigger value={`/${username}/tagged`} asChild>
          <Link
            href={`/${username}/tagged`}
            className="flex items-center justify-center py-3"
          >
            <Tag className="h-4 w-4 mr-2" />
            <span className="text-xs font-medium uppercase">Tagged</span>
          </Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
