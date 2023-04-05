import { Td, Tr } from "@chakra-ui/react";
import { User } from "../../pages/api/graphql/features/user/user.model";
import TableLoader from "../_shared/TableLoader";

interface Props {
  users: User[];
  loading: boolean;
}

export default function UsersRows({ users, loading }: Props) {
  return (
    <>
      {loading && <TableLoader rows={10} cells={3} />}
      {users.map((user, index) => (
        <Tr key={user.subId}>
          <Td>{index + 1}</Td>
          <Td>{user.name}</Td>
          <Td isNumeric>{user.totalScore || 0}</Td>
        </Tr>
      ))}
    </>
  );
}
