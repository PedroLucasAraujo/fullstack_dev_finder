import Link from "next/link";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Room } from "../db/schema";
import { GithubIcon } from "lucide-react";
import { getRooms } from "../data-access/rooms";
import { TagsList, splitTags } from "../components/tags-list";

function RoomCard({ room }: { room: Room }) {
  const tags = splitTags(room.tags);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>

        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <TagsList tags={tags} />
        {room.githubRepo && (
          <Link
            href={room.githubRepo}
            className="flex items-center gap-2 mb-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon />
            GitHub Project
          </Link>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default async function Home() {
  const rooms = await getRooms();

  return (
    <main className="min-h-screen p-16">
      <div className="flex justify-between items-center mb-16">
        <h1 className="text-4xl">Find Dev Rooms</h1>
        <Button asChild>
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {rooms.map((room) => {
          return <RoomCard key={room.userId} room={room} />;
        })}
      </div>
    </main>
  );
}
