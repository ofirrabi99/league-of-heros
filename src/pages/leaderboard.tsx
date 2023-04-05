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

const EMPTY_ROWS_AMOUNT = 10;

const Loaders = () => (
  <>
    {[...Array(EMPTY_ROWS_AMOUNT)].map((_e, i) => (
      <Tr key={i}>
        <Td>
          <Skeleton height={"1rem"} />
        </Td>
        <Td>
          <Skeleton height={"1rem"} />
        </Td>
        <Td>
          <Skeleton height={"1rem"} />
        </Td>
      </Tr>
    ))}
  </>
);

interface GetUsersResponse {
  users: User[];
}

export default function Leaderboard() {
  // TODO - handle errors
  const { data, loading } = useQuery<GetUsersResponse>(GET_USERS_SCORE);
  const users = data?.users || [];

  return (
    <Page
      title="LEADERBOARD"
      subTitle="Who's on top? Find out with our regularly updated leaderboard rankings."
    >
      <TableContainer>
        <Table size="sm" variant="striped" colorScheme="blackAlpha">
          <Thead>
            <Tr>
              <Th>place</Th>
              <Th>name</Th>
              <Th isNumeric>score</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading && <Loaders />}
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
    </Page>
  );
}

export const getServerSideProps = requireAuth({});
