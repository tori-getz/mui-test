import { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';

dotenv.config();

const codegenConfig: CodegenConfig = {
  overwrite: true,
  schema: process.env.VITE_APP_API_URL,
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
