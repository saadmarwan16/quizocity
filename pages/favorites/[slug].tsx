import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Layout from "../../components/shared/Layout";
import UserPoints from "../../components/shared/UserPoints";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { collection, getDocs } from "firebase/firestore";
import { firestore, getDateTime } from "../../lib/utils/firebaseInit";
import useCollectionGroup from "../../lib/data/hooks/useCollectionGroup";

interface FavoritesProps {
  path: string;
}

const Favorites: NextPage<FavoritesProps> = ({ path }) => {
  const { favorites, loading, error } = useCollectionGroup(path);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <Layout pageName="Favorites">
      <div className="w-full pb-6">
        <UserPoints />
        <div className="mt-12">
          <Typography variant="h6" className="mt-12 mb-3 font-semibold">
            Favorites
          </Typography>
          <div className="flex flex-col gap-2">
            {favorites?.map(
              ({ area, correct, createdAt, level, option, quiz }) => {
                const { date, time } = getDateTime(
                  createdAt.seconds,
                  createdAt.nanoseconds
                );

                return (
                  <Accordion
                    key={createdAt}
                    className="before:hidden"
                    sx={{ bgcolor: "#101010" }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreIcon className="text-text-primary" />
                      }
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      className="flex-row-reverse gap-3"
                    >
                      <div className="flex justify-between w-full">
                        <div className="flex items-center gap-10">
                          <Typography
                            color="text.secondary"
                            sx={{fontSize: '0.75rem'}}
                          >
                            {date} {time}
                          </Typography>
                          <Typography>
                            {area.toUpperCase()} at Level {level}
                          </Typography>
                        </div>
                        <FavoriteIcon />
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="flex flex-col gap-4">
                        <div>
                          <Typography className="text-lg text-teal-500">
                            Question:
                          </Typography>
                          <Typography>
                            Which of two words is more related to the given
                            words below:
                          </Typography>
                          <Typography className="text-text-disabled">
                            {`${quiz[0]}, ${quiz[1]}, ${quiz[2]}`}
                          </Typography>
                        </div>
                        <div>
                          <Typography className="text-lg text-teal-500">
                            Options:
                          </Typography>
                          <Typography>{option[0]}</Typography>
                          <Typography>{option[1]}</Typography>
                        </div>
                        <div>
                          <Typography className="text-teal-500">
                            Correct Answer:{" "}
                            <span className="font-semibold text-text-primary">
                              {option[correct - 1]}
                            </span>
                          </Typography>
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                );
              }
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const ref = collection(firestore, "users");
  const users = await getDocs(ref);

  const paths = users.docs.map((user) => {
    return user.id;
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = ({ params }) => {
  const userId = params?.slug;

  if (!userId || typeof userId !== "string") {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      path: `questions`,
      //   path: `users/${userId}/favorites`,
    },
  };
};

export default Favorites;
