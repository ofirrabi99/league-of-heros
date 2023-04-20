import { gql } from "@apollo/client";
import { gameProps } from "./game";

const cycleProps = `
_id
name
budget
fromTime
toTime`;

export const ADD_CYCLE = gql`
  mutation addCycle($cycle: CycleInput!) {
    addCycle(cycle: $cycle) {
      ${cycleProps}
    }
  }
`;

export const GET_ALL_CYCLES = gql`
query cycles {
  cycles {
    ${cycleProps}
    games {
      ${gameProps}
    }
  }
}
`;

export const DELETE_CYCLE = gql`
  mutation deleteCycle($cycleId: String!) {
    deleteCycle(cycleId: $cycleId) {
      ${cycleProps}
    }
  }
`;
