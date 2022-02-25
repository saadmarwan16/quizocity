import { useState } from "react";
import { useRouter } from "next/router";
import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import {
  FAVORITES,
  MAIN_QUIZ,
  PERFORMANCE,
  PROFILE,
} from "../../lib/constants/routes";

export default function Drawer() {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  const closeDrawer = (close: () => void) => {
    setOpen(false);
    close();
  };
  return (
    <div className="md:hidden">
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={() => setOpen(true)}
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => {}}
      >
        <div className="flex flex-col justify-between h-screen bg-background-paper w-52">
          <div>
            <div className="flex flex-col items-center gap-3 pt-8 pb-2">
              <Avatar alt="logo" src="/logo.png" className="w-32 h-32" />
              <Typography variant="h4">
                Quizocity
              </Typography>
            </div>
            <Divider />
            <List className="px-4">
            <ListItem
                button
                onClick={() => closeDrawer(() => router.push(PROFILE))}
                className={`mt-2 pl-6 ${
                  router.pathname === PROFILE ? "bg-teal-600" : null
                } hover:bg-teal-700 rounded-lg`}
              >
                <ListItemText primary={"Profile"} />
              </ListItem>
              <ListItem
                button
                onClick={() => closeDrawer(() => router.push(MAIN_QUIZ))}
                className={`mt-2 pl-6 ${
                  router.pathname === MAIN_QUIZ ? "bg-teal-600" : null
                } hover:bg-teal-700 rounded-lg`}
              >
                <ListItemText primary={"Quiz"} />
              </ListItem>
              <ListItem
                button
                onClick={() => closeDrawer(() => router.push(FAVORITES))}
                className={`mt-2 pl-6 ${
                  router.pathname === FAVORITES ? "bg-teal-600" : null
                } hover:bg-teal-700 rounded-lg`}
              >
                <ListItemText primary={"Favorites"} />
              </ListItem>
              <ListItem
                button
                onClick={() => closeDrawer(() => router.push(PERFORMANCE))}
                className={`mt-2 mb-2 pl-6 ${
                  router.pathname === PERFORMANCE ? "bg-teal-600" : null
                } hover:bg-teal-700 rounded-lg`}
              >
                <ListItemText primary={"Perfomance"} />
              </ListItem>
              <Divider />
              <ListItem button className={`pl-1 hover:bg-teal-700 rounded-lg mt-4`}>
                <ListItemButton>
                  <ListItemIcon className="pr-2 text-white min-w-fit">
                    <LoginIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Logout"} />
                </ListItemButton>
              </ListItem>
            </List>
          </div>
          <div
            className="flex items-center gap-2 p-2 rounded-t-lg border-disabled border-right border-left hover:cursor-pointer"
            onClick={() => closeDrawer(() => router.push(PROFILE))}
          >
            <Avatar alt="profile" src="/person.png" className="w-14 h-14" />
            <div>
              <Typography className="w-32 overflow-hidden leading-3 truncate bg-clip-text">
                Marwan Saad
              </Typography>
              <Typography variant="caption">Hello</Typography>
            </div>
          </div>
        </div>
      </SwipeableDrawer>
    </div>
  );
}
