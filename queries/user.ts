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
  mutation setUser($user: NewUserInput!) {
    setUser(user: $user) {
      id
      coachName
      teamName
    }
  }
`;
