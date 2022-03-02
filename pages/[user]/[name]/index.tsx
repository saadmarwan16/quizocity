import { GetServerSideProps, NextPage } from "next";

interface Props {
  user: string;
  name: string;
}

const ServerSideProps: NextPage<Props> = ({ user, name }) => {
  return (
    <>
      <div>{user}</div>
      <div>{name}</div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: context.query,
  };
};

export default ServerSideProps;
