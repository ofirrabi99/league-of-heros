import { useQuery } from "@apollo/client";
import {
  Skeleton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Page from "../components/_layout/Page";
import { requireAuth } from "../lib/auth0";
import { GET_USERS_SCORE } from "../queries/user";
import { User } from "./api/graphql/features/user/user.model";

interface GetUsersResponse {
  users: User[];
}

export default function Leaderboard() {
  const { data, loading, error } = useQuery<GetUsersResponse>(GET_USERS_SCORE);
  const users = data?.users || [];

  return (
    <Page>
      <TableContainer>
        <Table size="sm" variant="striped" colorScheme="purple">
          <Thead>
            <Tr>
              <Th>place</Th>
              <Th>name</Th>
              <Th isNumeric>score</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user, index) => (
              <Tr key={user.subId}>
                <Td>{index + 1}</Td>
                <Td>{user.name}</Td>
                <Td isNumeric>{user.totalScore || 0}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {loading && (
        <Stack>
          <Skeleton height={"20px"} />
          <Skeleton height={"20px"} />
          <Skeleton height={"20px"} />
          <Skeleton height={"20px"} />
        </Stack>
      )}
    </Page>
  );
}

export const getServerSideProps = requireAuth({});
