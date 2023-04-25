import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { FormattedMessage } from "react-intl";
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
      title="page.leaderboard.title"
      subTitle="page.leaderboard.description"
    >
      <TableContainer>
        <Table size="sm" variant="striped" colorScheme="blackAlpha">
          <Thead>
            <Tr>
              <Th>
                <FormattedMessage id="page.leaderboard.table.place" />
              </Th>
              <Th>
                <FormattedMessage id="page.leaderboard.table.name" />
              </Th>
              <Th isNumeric>
                <FormattedMessage id="page.leaderboard.table.score" />
              </Th>
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

export const getServerSideProps = requireAuth({});
