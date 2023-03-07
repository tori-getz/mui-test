import { graphql } from "~/gql/gql";

export const GET_RELATIONS = graphql(`
  query GetRelations {
    applicantIndividualCompanyRelations {
      data {
        id
        name
      }
    }
  }
`);
