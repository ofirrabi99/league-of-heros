import { gql } from "@apollo/client";

export const ADD_CYCLE = gql`
  mutation addCycle($cycle: CycleInput!) {
    addCycle(cycle: $cycle) {
      _id
    }
  }
`;
