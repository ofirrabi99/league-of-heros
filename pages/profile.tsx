import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import styles from "../styles/pages/profile.module.scss";
import { getUserFromSession } from "../utils/commonFunctions";

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const session = await getSession(ctx.req, ctx.res);
    const user = await getUserFromSession(session);

    return {
      props: { data: user },
    };
  },
});
export default function Profile() {
  return (
    <div>
      <h1 className={styles.headerPrimaryWithBackground}>PROFILE</h1>
    </div>
  );
}
