import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://graphql.anilist.co",
  documents: ["./src/constants/anilist/queries.ts"],
  generates: {
    "./src/types/anilist-types.ts": {
      plugins: ["typescript", "typescript-operations"],
      config: {
        enumsAsTypes: true,
        avoidOptionals: true,
      },
    },
  },
};

export default config;
