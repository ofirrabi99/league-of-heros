import { gql } from "@apollo/client";

export const GET_USER = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      id
      coachName
      teamName
    }
  }
`;

export const SET_USER = gql`
  mutation setUser($id: ID!, $coachName: String!, $teamName: String!) {
    user(id: $id, coachName: $coachName, teamName: $teamName) {
      id
      coachName
      teamName
    }
  }
`;
