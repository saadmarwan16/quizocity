import { Avatar, Button, Divider, Typography } from "@mui/material";
import Link from "next/link";
import { FunctionComponent } from "react";
import {
  FAVORITES,
  HOME,
  LOGIN,
  MAIN_QUIZ,
  PERFORMANCE,
  PROFILE,
} from "../../lib/constants/routes";
import NavItem from "./NavItem";
import LoginIcon from "@mui/icons-material/Login";
import { useRouter } from "next/router";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  const router = useRouter();

  return (
    <div className="flex justify-between px-16 py-4 bg-background-paper">
      <Link href={HOME}>
        <a>
          <div className="flex items-center">
            <Avatar alt="logo" src="/logo.png" />
            <Typography color="common.white" variant="h5" ml={1} mr={3}>
              Quizocity
            </Typography>
            <Divider orientation="vertical" className="h-8" />
          </div>
        </a>
      </Link>

      <div className="flex items-center gap-6">
        <NavItem
          isActive={router.pathname === MAIN_QUIZ}
          name="Quiz"
          path={MAIN_QUIZ}
        />
        <NavItem
          isActive={router.pathname === FAVORITES}
          name="Favorites"
          path={FAVORITES}
        />
        <NavItem
          isActive={router.pathname === PERFORMANCE}
          name="Performance"
          path={PERFORMANCE}
        />
      </div>
      <div className="flex gap-4">
        <Link href={LOGIN}>
          <a>
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<LoginIcon />}
            >
              Sign in
            </Button>
          </a>
        </Link>
        <Link href={PROFILE}>
          <a>
            <Avatar alt="profile" src="/person.png" />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
