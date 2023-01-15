import { gql } from "@apollo/client";

export const SET_GAME = gql`
  mutation setGame($game: GameInput!) {
    setGame(game: $game) {
      _id
      date
      teams {
        _id
        name
        imageUrl
      }
    }
  }
`;

export const GET_GAMES_AND_TEAMS = gql`
  query games {
    teams {
      _id
      name
      imageUrl
    }

    games {
      _id
      date
      teams {
        _id
        name
        imageUrl
      }
    }
  }
`;

export const DELETE_GAME = gql`
  mutation deleteGame($gameId: String!) {
    deleteGame(gameId: $gameId) {
      _id
      date
      teams {
        _id
        name
        imageUrl
      }
    }
  }
`;
