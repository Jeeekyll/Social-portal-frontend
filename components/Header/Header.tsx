import {
  AppBar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { FC, ReactElement, useState } from "react";
import { MenuIcon, ChevronLeftIcon, InboxIcon } from "@icons/material";
import Link from "next/link";

const menuItems: { text: string; href: string }[] = [
  { text: "Home", href: "/" },
  { text: "News", href: "/news" },
  { text: "Chat rooms", href: "/chat" },
];

const Header: FC = (): ReactElement => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleMenuOpen = (): void => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = (): void => {
    setIsMenuOpen(false);
  };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleMenuOpen}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Link href="/">
            <a>
              <Typography variant="h6" noWrap component="div">
                Social portal
              </Typography>
            </a>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer variant="persistent" anchor="left" open={isMenuOpen}>
        <IconButton onClick={handleMenuClose}>
          <ChevronLeftIcon />
        </IconButton>
        <List>
          {menuItems.map(({ text, href }) => (
            <Link href={href} key={`${text}-${href}`}>
              <a>
                <ListItem button>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </a>
            </Link>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default Header;
