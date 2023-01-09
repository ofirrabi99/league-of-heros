import { gql } from "@apollo/client";

export const SET_TEAM = gql`
  mutation setTeam($team: NewTeamInput!) {
    setTeam(team: $team) {
      name
      imageUrl
    }
  }
`;

export const GET_TEAMS = gql`
  query teams {
    teams {
      name
      imageUrl
    }
  }
`;
