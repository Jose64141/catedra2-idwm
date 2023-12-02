import { PrismaClient } from "@prisma/client";
export interface Context {
  prisma: PrismaClient;
}

const prisma = new PrismaClient();

/**
 * Creates a context for a GraphQL operation.
 * @param req The HTTP request information.
 * @returns The context for the GraphQL operation.
 */
export const createContext = async ({req}): Promise<Context> => {
  return {
    prisma: prisma,
  };
};