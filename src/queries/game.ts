import { gql } from "@apollo/client";

export const GET_GAME = gql`
  query getGame($gameId: String!) {
    game(gameId: $gameId) {
      _id
      cycle {
        _id
      }
      time
      result {
        cycle
        players {
          playerId
          score
        }
      }
      homeTeam {
        _id
        name
        imageUrl
        players {
          _id
          name
          imageUrl
          price
        }
      }
      awayTeam {
        _id
        name
        imageUrl
        players {
          _id
          name
          imageUrl
          price
        }
      }
    }
  }
`;

export const GET_GAMES = gql`
  query games {
    games {
      _id
      cycle {
        _id
      }
      time
      homeTeam {
        _id
        name
        imageUrl
      }
      awayTeam {
        _id
        name
        imageUrl
      }
    }
  }
`;

export const GET_NEXT_GAMES = gql`
  query nextGames {
    nextCycle {
      _id
      budget
    }
    currentCycle {
      _id
    }
    nextGames {
      _id
      time
      homeTeam {
        _id
        name
        imageUrl
        players(withoutHiddenPlayers: true) {
          _id
          name
          imageUrl
          price
        }
      }
      awayTeam {
        _id
        name
        imageUrl
        players(withoutHiddenPlayers: true) {
          _id
          name
          imageUrl
          price
        }
      }
    }
  }
`;

export const SET_GAME = gql`
  mutation setGame($game: GameInput!) {
    setGame(game: $game) {
      _id
    }
  }
`;

export const DELETE_GAME = gql`
  mutation deleteGame($gameId: String!) {
    deleteGame(gameId: $gameId) {
      _id
    }
  }
`;

export const SET_GAME_RESULT = gql`
  mutation setGameResult($gameResult: LineupInput!, $gameId: String!) {
    setGameResult(gameResult: $gameResult, gameId: $gameId) {
      cycle
    }
  }
`;
