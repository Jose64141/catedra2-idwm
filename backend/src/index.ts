import { ApolloServer } from '@apollo/server';
import {expressMiddleware} from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv"
import bodyParser from "body-parser";
import {createContext} from "./schema/context";
import {resolvers, typeDefs} from "./schema";

dotenv.config();


let schema = makeExecutableSchema({
  typeDefs: [typeDefs],
  resolvers: resolvers
})

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
  ]
});

await server.start();

app.use(
  "/",
  cors(),
  bodyParser.json(),
  expressMiddleware(server, {
    context: createContext
  }));

await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));

export { server, schema };

console.log(`🚀  Server ready at: http://localhost:4000/`);