import { graphql } from "~/gql";

export const GET_POSITIONS = graphql(`
  query GetPositions {
    applicantIndividualCompanyPositions {
      data {
        id
        name
      }
    }
  }
`);
