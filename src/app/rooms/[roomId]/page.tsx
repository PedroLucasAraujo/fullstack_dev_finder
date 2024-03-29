import { getRoom } from "@/src/data-access/rooms";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { TagsList, splitTags } from "@/src/components/tags-list";

export default async function RoomPage(props: { params: { roomId: string } }) {
  const roomId = props.params.roomId;
  const room = await getRoom(roomId);

  if (!room) {
    return <div>No Room of this ID found</div>;
  }
  return (
    <div className="">
      <div className="grid grid-cols-4 min-h-screen">
        <div className="col-span-3  p-4 pr-2">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
            VIDEO PLAYER
          </div>
        </div>

        <div className="col-span-1  p-4 pl-2">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-4">
            <h1 className="text-base">{room?.name}</h1>
            {room?.githubRepo && (
              <Link
                href={room.githubRepo}
                className="flex items-center text-center gap-2 text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon />
                GitHub Project
              </Link>
            )}
            <p className="text-base text-gray-700">{room?.description}</p>
            {/* <h3>Tags:</h3> */}
            <div className="flex gap-2 flex-wrap">
              <TagsList tags={splitTags(room.tags)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
