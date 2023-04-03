import {
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Page from "../components/_layout/Page";
import client from "../lib/apolloClient";
import { requireAuth } from "../lib/auth0";
import { GET_USERS_SCORE } from "../queries/user";
import { User } from "./api/graphql/features/user/user.model";

interface GetUsersResponse {
  users: User[];
}

interface Props {
  users: GetUsersResponse["users"];
}
export default function Leaderboard({ users }: Props) {
  return (
    <Page>
      <TableContainer>
        <Table size="sm" variant="striped" colorScheme="purple">
          <Thead>
            <Tr>
              <Th>place</Th>
              <Th isNumeric>score</Th>
              <Th>name</Th>
              <Th>team name</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user, index) => (
              <Tr key={user.subId}>
                <Td>{index + 1}</Td>
                <Td isNumeric>{user.totalScore || 0}</Td>
                <Td>{user.name}</Td>
                <Td>{user.teamName}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Page>
  );
}

export const getServerSideProps = requireAuth({
  async getServerSideProps(_ctx) {
    const {
      data: { users },
    } = await client.query<GetUsersResponse>({
      query: GET_USERS_SCORE,
    });

    return {
      props: { users: users || [] },
    };
  },
});
