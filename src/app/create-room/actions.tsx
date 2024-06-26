"use server";

import { db } from "@/src/db";
import { Room, room } from "@/src/db/schema";
import { getSession } from "@/src/lib/auth";
import { revalidatePath } from "next/cache";

export async function createRoomAction(roomData: Omit<Room, "id" | "userId">) {
  const session = await getSession();
  console.log(session);
  if (!session) {
    throw new Error("You must be logged in to create this room");
  }
  await db.insert(room).values({ ...roomData, userId: session.user.id });

  revalidatePath("/");
}
