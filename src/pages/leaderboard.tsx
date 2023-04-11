import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import UsersRows from "../components/leaderboard/UsersRows";
import Page from "../components/_layout/Page";
import useMyQuery from "../hooks/useMyQuery";
import { requireAuth } from "../lib/auth0";
import { GET_USERS_SCORE } from "../queries/user";
import { User } from "./api/graphql/features/user/user.model";

interface GetUsersResponse {
  users: User[];
}

export default function Leaderboard() {
  const { data } = useMyQuery<GetUsersResponse>(GET_USERS_SCORE);
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
            <UsersRows users={users} />
          </Tbody>
        </Table>
      </TableContainer>
    </Page>
  );
}

// export const getServerSideProps = requireAuth({});
