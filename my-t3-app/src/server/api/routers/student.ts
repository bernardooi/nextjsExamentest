import { schema } from "@/pages/register";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  createStudent: protectedProcedure.input(schema).mutation(({ ctx, input }) => {
    return ctx.prisma.subject.create({
      data: {
        firstName: input.firstName,
        lastName: input.lastName,
        subjects: {
          create: {
            points: 
          },
        },
      },
    });
  }),
});
