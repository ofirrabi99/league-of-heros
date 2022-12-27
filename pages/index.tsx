import Login from "../components/layout/login/Login";
import Divider from "../components/shared/divider/Divider";
import styles from "../styles/pages/index.module.scss";

export default function Home() {
  return (
    <>
      <h1 className={styles.headerPrimary}>HEROES OF THE NIGHT</h1>
      <p className={styles.headerSecondary}>
        Create a Fantasy Basketball Champions League team and challenge your
        friends in each gameday!
      </p>
      <br />
      <div className="center">
        <Login />
      </div>
      <Divider />
      <p className={styles.headerSecondary}>
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
      </p>
    </>
  );
}
