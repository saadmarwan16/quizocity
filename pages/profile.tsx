import { NextPage } from "next";
import History from "../components/shared/History";
import Layout from "../components/shared/Layout";
import Settings from "../components/shared/Settings";
import UserPoints from "../components/shared/UserPoints";

const Profile: NextPage = () => {
  return (
    <Layout pageName="Profile">
      <div className="w-full pb-6">
        <UserPoints />
        <div className="w-4/5 mx-auto mt-10 md:w-3/5 lg:w-2/5">
          <Settings />
        </div>
        <History />
      </div>
    </Layout>
  );
};

export default Profile;
