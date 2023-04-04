import { gql } from "@apollo/client";

export const SET_LINEUP = gql`
  mutation setLineup($lineup: LineupInput!) {
    setLineup(lineup: $lineup) {
      gameResults {
        gameday
        players {
          playerId
          score
        }
      }
    }
  }
`;

export const GET_USER = gql`
  query user {
    user {
      gameResults {
        gameday
        players {
          playerId
          score
        }
      }
    }
  }
`;

export const GET_USERS_SCORE = gql`
  query users {
    users {
      subId
      totalScore
      name
      gameResults {
        gameday
        players {
          playerId
          score
        }
      }
    }
  }
`;
