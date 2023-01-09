import {
  withPageAuthRequired,
  WithPageAuthRequiredOptions,
} from "@auth0/nextjs-auth0";
import { injectCookies } from "./apolloClient";

interface Props {
  getServerSideProps?: WithPageAuthRequiredOptions["getServerSideProps"];
}

export const requireAuth = ({ getServerSideProps }: Props) =>
  withPageAuthRequired({
    async getServerSideProps(ctx) {
      injectCookies(ctx.req.headers.cookie);

      if (!getServerSideProps) return { props: {} };

      return getServerSideProps!(ctx);
    },
  });
