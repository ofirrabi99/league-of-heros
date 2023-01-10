import { gql } from "@apollo/client";

export const SET_TEAM = gql`
  mutation setTeam($team: TeamInput!) {
    setTeam(team: $team) {
      _id
      name
      imageUrl
    }
  }
`;

export const GET_TEAMS = gql`
  query teams {
    teams {
      _id
      name
      imageUrl
    }
  }
`;

export const DELETE_TEAM = gql`
  mutation deleteTeam($teamId: String!) {
    deleteTeam(teamId: $teamId) {
      _id
      name
      imageUrl
    }
  }
`;
