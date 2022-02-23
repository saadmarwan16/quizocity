import { Typography } from "@mui/material";
import Link from "next/link";
import { FunctionComponent } from "react";

interface NavItemProps {
  isActive: boolean;
  name: string;
  path: string;
}

const NavItem: FunctionComponent<NavItemProps> = ({ isActive, name, path }) => {
  return (
    <Link href={path}>
      <a className="relative">
        <Typography
          color={`${isActive ? "text.primary" : "text.disabled"}`}
          variant="h6"
          className="pr-2"
        >
          {name}
        </Typography>
        {isActive ? (
          <div
            className="absolute right-0 w-1 h-1 rounded-lg top-2 bg-text-primary"
            style={{ backgroundColor: "#00796B" }}
          />
        ) : null}
      </a>
    </Link>
  );
};

export default NavItem;
