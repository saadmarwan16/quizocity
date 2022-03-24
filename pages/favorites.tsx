import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import Layout from "../components/shared/Layout";
import UserPoints from "../components/shared/UserPoints";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Favorites: NextPage = () => {
  return (
    <Layout pageName="Favorites">
      <div className="w-full pb-6">
        <UserPoints />
        <div className="mt-12">
          <Typography variant="h6" className="mt-12 mb-3 font-semibold">
            Favorites
          </Typography>
          <Accordion className="bg-background-paper before:hidden">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className="text-text-primary" />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className="flex-row-reverse gap-3"
            >
              <div className="flex justify-between w-full">
                <div className="flex items-center gap-10">
                  <Typography className="text-xs" color="text.secondary">
                    Mar, 5, 2022 08:10
                  </Typography>
                  <Typography>SAT at Level 3</Typography>
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
                    Which of two words is more related to the given words below:
                  </Typography>
                  <Typography className="text-text-disabled">
                    replacement, substitute, instead
                  </Typography>
                </div>
                <div>
                  <Typography className="text-lg text-teal-500">
                    Options:
                  </Typography>
                  <Typography>Socket</Typography>
                  <Typography>Alternate</Typography>
                </div>
                <div>
                  <Typography className="text-teal-500">
                    Correct Answer:{" "}
                    <span className="font-semibold text-text-primary">
                      Alternate
                    </span>
                  </Typography>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </Layout>
  );
};

export default Favorites;
