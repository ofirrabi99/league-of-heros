import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Login from "../components/layout/login/Login";

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const session = await getSession(ctx.req, ctx.res);

    return {
      props: {},
      ...(session?.user && {
        redirect: { destination: "/my-team", permanent: false },
      }),
    };
  },
});

export default function Home() {
  return (
    <>
      {/* <h1 className={styles.headerPrimary}>HEROES OF THE NIGHT</h1>
      <p className={styles.headerPrimary}>
        Create a Fantasy Basketball Champions League team and challenge your
        friends in each gameday!
      </p>
      <br />
      <div className="center">
        <Login />
      </div>
      <Divider />
      <p className={styles.headerPrimary}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni placeat
        officiis earum pariatur, maiores sunt laborum ut iure fuga sint amet
        officia neque recusandae? Ex reiciendis illo quos odit fuga! Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Magni placeat officiis
        earum pariatur, maiores sunt laborum ut iure fuga sint amet officia
        neque recusandae? Ex reiciendis illo quos odit fuga! Lorem ipsum dolor
        sit amet consectetur adipisicing elit. Magni placeat officiis earum
        pariatur, maiores sunt laborum ut iure fuga sint amet officia neque
        recusandae? Ex reiciendis illo quos odit fuga! Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Magni placeat officiis earum
        pariatur, maiores sunt laborum ut iure fuga sint amet officia neque
        recusandae? Ex reiciendis illo quos odit fuga! Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Magni placeat officiis earum
        pariatur, maiores sunt laborum ut iure fuga sint amet officia neque
        recusandae? Ex reiciendis illo quos odit fuga!
      </p> */}
    </>
  );
}
