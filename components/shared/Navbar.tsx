import {
  AppBar,
  Toolbar,
  Avatar,
  Button,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import Link from "next/link";
import { FunctionComponent } from "react";
import {
  FAVORITES,
  HOME,
  LEADERBOARD,
  LOGIN,
  MAIN_QUIZ,
  PROFILE,
} from "../../lib/constants/routes";
import NavItem from "./NavItem";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/router";
import Drawer from "./Drawer";
import { useAuthContext } from "../../lib/data/contexts/AuthContext";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  const router = useRouter();
  const {
    authState: [user],
    signOut,
  } = useAuthContext();

  return (
    <div>
      <Box className="flex md:hidden bg-background-paper">
        <AppBar position="fixed" className="flex md:hidden bg-background-paper">
          <Toolbar>
            <Drawer />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Quiz
            </Typography>
            <Link href={PROFILE}>
              <a>
                <Avatar alt="profile" src="/person.png" />
              </a>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
      <div className="justify-between hidden px-8 py-4 lg:px-16 md:flex bg-background-paper">
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
            isActive={router.pathname.includes(MAIN_QUIZ)}
            name="Quiz"
            path={`${MAIN_QUIZ}/${user?.uid}`}
          />
          <NavItem
            isActive={router.pathname === FAVORITES}
            name="Favorites"
            path={FAVORITES}
          />
          <NavItem
            isActive={router.pathname === LEADERBOARD}
            name="Leaderboard"
            path={LEADERBOARD}
          />
        </div>
        <div className="flex gap-4">
          {user ? (
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<LogoutIcon />}
              onClick={signOut}
            >
              Log out
            </Button>
          ) : (
            <Link href={LOGIN}>
              <a>
                <Button
                  variant="outlined"
                  color="secondary"
                  endIcon={<LoginIcon />}
                >
                  Log in
                </Button>
              </a>
            </Link>
          )}
          {user && (
            <Link href={PROFILE}>
              <a>
                <Avatar alt="profile" src={user.photoURL ?? "/person.png"} />
              </a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
