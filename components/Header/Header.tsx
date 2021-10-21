import {
  AppBar,
  Backdrop,
  Button,
  Drawer,
  Fade,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { FC, ReactElement, useEffect, useState } from "react";
import {
  MenuIcon,
  ChevronLeftIcon,
  AccountCircleIcon,
  LogoutIcon,
  HomeIcon,
  ChatIcon,
  RssIcon,
} from "@icons/material";
import Link from "next/link";
import { useTypedSelector } from "store/hooks";
import { checkAuth, logout } from "store/slices/user";
import { useDispatch } from "react-redux";
import styles from "./Header.module.scss";
import { Box } from "@mui/system";
import Login from "../Auth/Login";

const Header: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const { user, isAuth } = useTypedSelector((state) => state.user);

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const [isLogoutOpen, setIsLogoutOpen] = useState<boolean>(false);
  const handleLogoutOpen = (): void => setIsLogoutOpen(true);
  const handleLogoutClose = (): void => setIsLogoutOpen(false);

  const onLogoutClick = () => {
    dispatch(logout());
    handleLogoutClose();
  };

  const handleMenuOpen = (): void => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = (): void => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

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
            <a className={styles.header__title}>
              <Typography variant="h6" noWrap component="div">
                Social portal
              </Typography>
            </a>
          </Link>
          <div className={styles.header__user}>
            {isAuth ? (
              <>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  color="inherit"
                >
                  <AccountCircleIcon />
                </IconButton>
                <div className={styles.header__user__username}>
                  {user.username}
                </div>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleLogoutOpen}
                  size="large"
                >
                  <LogoutIcon />
                </IconButton>
              </>
            ) : (
              <div className={styles.header__user__auth}>
                <Login />
                <Button variant="contained" size="small">
                  Sign up
                </Button>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="persistent" anchor="left" open={isMenuOpen}>
        <div className={styles.header__menu_arrow}>
          <IconButton color="inherit" onClick={handleMenuClose} size="large">
            <ChevronLeftIcon />
          </IconButton>
        </div>

        <List>
          <Link href="/">
            <a className={styles.header__menu__item}>
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </a>
          </Link>

          <Link href="/feed">
            <a className={styles.header__menu__item}>
              <ListItem button>
                <ListItemIcon>
                  <RssIcon />
                </ListItemIcon>
                <ListItemText primary="News" />
              </ListItem>
            </a>
          </Link>

          <Link href="/chat">
            <a className={styles.header__menu__item}>
              <ListItem button>
                <ListItemIcon>
                  <ChatIcon />
                </ListItemIcon>
                <ListItemText primary="Chat" />
              </ListItem>
            </a>
          </Link>
        </List>
      </Drawer>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isLogoutOpen}
        onClose={handleLogoutClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isLogoutOpen}>
          <Box className={styles.logout__modal}>
            <Typography
              variant="h4"
              component="h3"
              className={styles.logout__modal__title}
            >
              ARE YOU SURE?
            </Typography>
            <div className={styles.logout__modal__actions}>
              <Button variant="contained" onClick={onLogoutClick}>
                Confirm
              </Button>
              <Button onClick={handleLogoutClose}>Cancel</Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default Header;
