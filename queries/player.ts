import { gql } from "@apollo/client";

export const SET_PLAYER = gql`
  mutation setPlayer($player: PlayerInput!) {
    setPlayer(player: $player) {
      _id
      name
      price
      imageUrl
      team
    }
  }
`;

export const GET_PLAYERS_BY_TEAM = gql`
  query players($teamId: String) {
    players(teamId: $teamId) {
      _id
      name
      price
      imageUrl
      team
    }
  }
`;
