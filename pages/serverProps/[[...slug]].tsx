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
      <div>Server route</div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context.query.slug);
  console.log(context.query.slug);
  return {
    props: context.query,
  };
};

export default ServerSideProps;
