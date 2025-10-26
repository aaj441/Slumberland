import { z } from "zod";
import { baseProcedure } from "~/server/trpc/main";
import { db } from "~/server/db";

export const getDreams = baseProcedure
  .input(z.object({
    userId: z.number(),
  }))
  .query(async ({ input }) => {
    const dreams = await db.dream.findMany({
      where: {
        userId: input.userId,
      },
      include: {
        symbols: {
          include: {
            archetype: true,
          },
        },
        insights: true,
        comments: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { dreams };
  });
