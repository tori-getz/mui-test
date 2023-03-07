import { CodegenConfig } from '@graphql-codegen/cli';

const codegenConfig: CodegenConfig = {
  overwrite: true,
  schema: "http://152.228.215.94:83/api",
  documents: "src/**/*.ts",
  generates: {
    "src/gql/": {
      preset: "client",
      config: {
        withHooks: true
      },
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ]
    }
  }
};

export default codegenConfig;
