import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

const subjectSchema = z.object({
  subject: z.string(),
  points: z.string(),
  grade: z.enum(["A", "B", "C", "D", "E", "F"]),
});

const studentSchema = z.object({
  studentId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  subjects: z.array(subjectSchema),
});

export const studentRouter = createTRPCRouter({
  createStudent: protectedProcedure
    .input(studentSchema)
    .mutation(async ({ ctx, input }) => {
      const { studentId, firstName, lastName, subjects } = input;

      const student = await ctx.prisma.student.create({
        data: {
          id: studentId,
          firstName,
          lastName,
          subjects: {
            create: subjects.map((subject) => ({
              subject: subject.subject,
              points: subject.points,
              grade: subject.grade,
            })),
          },
        },
      });

      return student;
    }),

  getSubjectsByStudentId: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const student = await ctx.prisma.student.findUnique({
        where: {
          id: input,
        },
        include: {
          subjects: true,
        },
      });

      if (!student) {
        throw new Error(`Student with ID ${input} not found.`);
      }

      return student.subjects;
    }),
});
