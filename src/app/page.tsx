import { db } from "../db";

export default async function Home() {
  const rooms = await db.query.room.findMany();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {rooms.map((room) => {
        return (
          <div key={room.userId}>
            <h2>{room.name}</h2>
            <p>{room.description}</p>
            <a href={room.githubRepo}>{room.githubRepo}</a>
            <span>{room.language}</span>
          </div>
        );
      })}
    </main>
  );
}
