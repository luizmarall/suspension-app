import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import * as db from "./db";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  okrs: router({
    getByTopic: publicProcedure
      .input((val: any) => {
        if (typeof val?.topicId !== 'number') throw new Error('topicId must be a number');
        return val as { topicId: number };
      })
      .query(async ({ input }) => {
        return db.getOKRsByTopic(input.topicId);
      }),
    create: protectedProcedure
      .input((val: any) => {
        if (typeof val?.topicId !== 'number' || typeof val?.krNumber !== 'number' || typeof val?.description !== 'string') {
          throw new Error('Invalid input');
        }
        return val as { topicId: number; krNumber: number; description: string };
      })
      .mutation(async ({ input }) => {
        return db.createOKR(input);
      }),
    update: protectedProcedure
      .input((val: any) => {
        if (typeof val?.id !== 'number') throw new Error('id must be a number');
        return val as { id: number; [key: string]: any };
      })
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return db.updateOKR(id, data);
      }),
    delete: protectedProcedure
      .input((val: any) => {
        if (typeof val?.id !== 'number') throw new Error('id must be a number');
        return val as { id: number };
      })
      .mutation(async ({ input }) => {
        return db.deleteOKR(input.id);
      }),
  }),

  cronograma: router({
    list: publicProcedure.query(async () => {
      return db.getCronogramaActivities();
    }),
    create: protectedProcedure
      .input((val: any) => {
        if (typeof val?.topicId !== 'number' || typeof val?.activityName !== 'string' || typeof val?.startDate !== 'string' || typeof val?.durationDays !== 'number') {
          throw new Error('Invalid input');
        }
        return val as { topicId: number; activityName: string; startDate: string; durationDays: number; dependencyId?: number };
      })
      .mutation(async ({ input }) => {
        return db.createCronogramaActivity(input);
      }),
    update: protectedProcedure
      .input((val: any) => {
        if (typeof val?.id !== 'number') throw new Error('id must be a number');
        return val as { id: number; [key: string]: any };
      })
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return db.updateCronogramaActivity(id, data);
      }),
    delete: protectedProcedure
      .input((val: any) => {
        if (typeof val?.id !== 'number') throw new Error('id must be a number');
        return val as { id: number };
      })
      .mutation(async ({ input }) => {
        return db.deleteCronogramaActivity(input.id);
      }),
  }),

  responsaveis: router({
    list: publicProcedure.query(async () => {
      return db.getResponsaveis();
    }),
    create: protectedProcedure
      .input((val: any) => {
        if (typeof val?.activityName !== 'string' || typeof val?.responsible !== 'string' || typeof val?.periodStart !== 'string' || typeof val?.periodEnd !== 'string' || typeof val?.status !== 'string') {
          throw new Error('Invalid input');
        }
        const validStatuses = ['Em Progresso', 'Planejado', 'Concluído'];
        if (!validStatuses.includes(val.status)) {
          throw new Error('Invalid status');
        }
        return val as { activityName: string; responsible: string; periodStart: string; periodEnd: string; status: 'Em Progresso' | 'Planejado' | 'Concluído' };
      })
      .mutation(async ({ input }) => {
        return db.createResponsavel(input);
      }),
    update: protectedProcedure
      .input((val: any) => {
        if (typeof val?.id !== 'number') throw new Error('id must be a number');
        return val as { id: number; [key: string]: any };
      })
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return db.updateResponsavel(id, data);
      }),
    delete: protectedProcedure
      .input((val: any) => {
        if (typeof val?.id !== 'number') throw new Error('id must be a number');
        return val as { id: number };
      })
      .mutation(async ({ input }) => {
        return db.deleteResponsavel(input.id);
      }),
  }),
});

export type AppRouter = typeof appRouter;
