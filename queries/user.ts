import { gql } from "@apollo/client";

export const GET_USER = gql`
  query getUser {
    user {
      coachName
      teamName
    }
  }
`;

export const SET_USER = gql`
  mutation setUser($user: NewUserInput!) {
    setUser(user: $user) {
      coachName
      teamName
    }
  }
`;
