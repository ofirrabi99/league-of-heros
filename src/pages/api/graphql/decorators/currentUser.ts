import { getSession } from "@auth0/nextjs-auth0";
import { createParamDecorator } from "type-graphql";
import ContextType from "../contextType";

export default function CurrentUser(field?: string) {
  return createParamDecorator<ContextType>(async ({ context }) => {
    const user = (await getSession(context.req, context.res))?.user;
    if (!user || !field) return user;
    if (field === "id") return user["sub"];
    return user[field];
  });
}
