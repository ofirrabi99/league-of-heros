import { Td, Tr } from "@chakra-ui/react";
import { User } from "../../pages/api/graphql/features/user/user.model";

interface Props {
  users: User[];
}

export default function UsersRows({ users }: Props) {
  return (
    <>
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
