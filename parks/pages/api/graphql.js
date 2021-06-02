import { ApolloServer, gql } from "apollo-server-micro";
import cors from "micro-cors";

import { MultiMatchQuery, SearchkitSchema } from "@searchkit/schema";

const searchkitConfig = {
  host: process.env.ES_HOST || "http://localhost:9200",
  index: "us_parks",
  hits: {
    fields: ["title", "location", "nps_link", "states", "description"],
  },
  query: new MultiMatchQuery({
    fields: ["title", "location", "nps_link", "states", "description"],
  }),
};

const { typeDefs, withSearchkitResolvers, context } = SearchkitSchema({
  config: searchkitConfig,
  typeName: "ResultSet",
  hitTypeName: "ResultHit",
  addToQueryType: true,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const server = new ApolloServer({
  typeDefs: [
    gql`
      type Query {
        root: String
      }

      type HitFields {
        title: String
        location: String
        nps_link: String
        states: [String]
        description: String
      }

      type ResultHit implements SKHit {
        id: ID!
        fields: HitFields
        customField: String
      }
    `,
    ...typeDefs,
  ],
  resolvers: withSearchkitResolvers({
    ResultHit: {
      customField: (parent) => `parent id ${parent.id}`,
    },
  }),
  introspection: true,
  playground: true,
  context: {
    ...context,
  },
});

const handler = server.createHandler({ path: "/api/graphql" });

export default cors()((req, res) =>
  req.method === "OPTIONS" ? res.end() : handler(req, res)
);
