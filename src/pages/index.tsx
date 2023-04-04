import { GetServerSideProps } from "next";

export default function Home() {
  return <></>;
}

export const getServerSideProps: GetServerSideProps = async (_ctx) => {
  return {
    props: {},
  };
};
