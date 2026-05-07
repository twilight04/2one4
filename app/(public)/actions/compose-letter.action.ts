"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function composeLetterAction(content: string) {
  try {
    if (content.length > 1000) {
      return { success: false, error: "Signal too long for the frequency." };
    }

    const letter = await prisma.letter.create({
      data: {
        content,
      },
    });

    if (!letter) {
      throw new Error("Failed to broadcast");
    }

    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Failed to broadcast:", error);
    return { success: false };
  }
}
