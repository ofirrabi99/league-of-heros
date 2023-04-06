import { getSession } from "@auth0/nextjs-auth0";
import { AuthChecker, MiddlewareFn } from "type-graphql";
import ContextType from "../contextType";

export const CheckRole: AuthChecker<ContextType> = async (
  { context },
  roles
) => {
  const user = (await getSession(context.req, context.res))?.user;
  const userRoles = user
    ? (user[process.env.NEXT_PUBLIC_AUTH0_ROLES_AREA as string] as string[]) ||
      []
    : [];
  const isRoleApproved = Boolean(
    roles.find((role) => userRoles.includes(role))
  );

  return isRoleApproved; // or false if access denied
};
