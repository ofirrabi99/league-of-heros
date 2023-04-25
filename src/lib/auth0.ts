import {
  getSession,
  withPageAuthRequired,
  WithPageAuthRequiredOptions,
} from "@auth0/nextjs-auth0";
import { injectCookies } from "./apolloClient";
import {} from "next/error";

interface RequireAuthProps {
  getServerSideProps?: WithPageAuthRequiredOptions["getServerSideProps"];
  roles?: string[];
}

export const requireAuth = ({ getServerSideProps, roles }: RequireAuthProps) =>
  withPageAuthRequired({
    async getServerSideProps(ctx) {
      // injectCookies(ctx.req.headers.cookie);
      // if (!getServerSideProps) return { props: {} };
      // return getServerSideProps(ctx);

      if (roles) {
        const user = (await getSession(ctx.req, ctx.res))?.user;
        const userRoles: string[] = user
          ? (user[
              process.env.NEXT_PUBLIC_AUTH0_ROLES_AREA as string
            ] as string[])
          : [];
        const isAllow = userRoles.some((role) => roles.includes(role));
        if (!isAllow) {
          return {
            redirect: {
              destination: "/",
              permanent: false,
            },
          };
        }
      }

      return { props: {} };
    },
  });
