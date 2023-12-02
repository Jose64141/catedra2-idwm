import { readFileSync } from "fs";
import { ProductQuery } from "./query";
import { ProductMutation } from "./mutation";
export const types = readFileSync(`./src/schema/type.graphql`, 'utf-8')

export const typeDefs = `#graphql
  type Query
  type Mutation
  ${types}
`;

export const resolvers = {
  Query: {
    ...ProductQuery,
  },
  Mutation: {
    ...ProductMutation,
  }
}