import { gql } from "@apollo/client";

export const SET_GAME = gql`
  mutation setGame($game: GameInput!) {
    setGame(game: $game) {
      _id
      date
      teams {
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

// export const DELETE_TEAM = gql`
//   mutation deleteTeam($teamId: String!) {
//     deleteTeam(teamId: $teamId) {
//       _id
//       name
//       imageUrl
//     }
//   }
// `;
