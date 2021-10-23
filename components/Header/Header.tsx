import React, { FC, ReactElement, useEffect, useState } from "react";
import {
  AppBar,
  Backdrop,
  Button,
  Divider,
  Drawer,
  Fade,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Modal,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  MenuIcon,
  AccountCircleIcon,
  HomeIcon,
  ChatIcon,
  RssIcon,
  LogoutVariantIcon,
  SettingsIcon,
  CloseIcon,
} from "@icons/material";
import Link from "next/link";
import { useTypedSelector } from "store/hooks";
import { checkAuth, logout } from "store/slices/user";
import { useDispatch } from "react-redux";
import styles from "./Header.module.scss";
import { Box } from "@mui/system";
import Login from "../Auth/Login";
import cn from "classnames";
import { Fade as FadeEffect } from "react-awesome-reveal";
import Register from "../Auth/Register";

const Header: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const { user, isAuth } = useTypedSelector((state) => state.user);

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const toggleMenuOpen = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [isLogoutOpen, setIsLogoutOpen] = useState<boolean>(false);
  const handleLogoutOpen = (): void => setIsLogoutOpen(true);
  const handleLogoutClose = (): void => setIsLogoutOpen(false);

  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(
    null
  );
  const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>): void => {
    setUserMenuAnchor(event.currentTarget);
  };
  const handleUserMenuClose = (): void => {
    setUserMenuAnchor(null);
  };

  const isUserMenuOpen = Boolean(userMenuAnchor);

  const onLogoutClick = (): void => {
    dispatch(logout());
    handleLogoutClose();
  };

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  return (
    <div>
      <AppBar position="fixed" className={styles.header}>
        <FadeEffect delay={400}>
          <Toolbar className={styles.header__container}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={toggleMenuOpen}
              edge="start"
              className={styles.header__item}
            >
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            <Link href="/">
              <a className={cn(styles.header__title)}>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  className={styles.header__item}
                >
                  Social portal
                </Typography>
              </a>
            </Link>
            <div className={styles.header__user}>
              {isAuth ? (
                <FadeEffect delay={200}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    color="inherit"
                  >
                    <AccountCircleIcon />
                  </IconButton>
                  <div
                    onClick={handleUserMenuClick}
                    className={cn(
                      styles.header__user__username,
                      styles.header__item
                    )}
                  >
                    {user.username}
                  </div>
                  <Menu
                    open={isUserMenuOpen}
                    anchorEl={userMenuAnchor}
                    onClose={handleUserMenuClose}
                    onClick={handleUserMenuClose}
                    className={styles.avatar__menu}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        minWidth: 150,
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 2,
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem>
                      <Link href="/account/profile">
                        <a className={styles.account__menu__link}>
                          <AccountCircleIcon />
                          <div className={styles.account__menu__link__text}>
                            Profile
                          </div>
                        </a>
                      </Link>
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                      <Link href="/account/settings">
                        <a className={styles.account__menu__link}>
                          <SettingsIcon />
                          <div className={styles.account__menu__link__text}>
                            Settings
                          </div>
                        </a>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleLogoutOpen}>
                      <LogoutVariantIcon />
                      <div style={{ marginLeft: 8 }}>Logout</div>
                    </MenuItem>
                  </Menu>
                </FadeEffect>
              ) : (
                <FadeEffect delay={200}>
                  <div className={styles.header__user__auth}>
                    <Login />
                    <Register />
                  </div>
                </FadeEffect>
              )}
            </div>
          </Toolbar>
        </FadeEffect>
      </AppBar>
      <Drawer
        variant="persistent"
        anchor="left"
        open={isMenuOpen}
        sx={{
          "& .MuiDrawer-paper": {
            zIndex: 400,
            border: "none",
            minWidth: 180,
            paddingTop: "70px",
            background: "#F0F0F0",
          },
        }}
      >
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
              <Button onClick={handleLogoutClose}>Cancel</Button>
              <Button variant="contained" onClick={onLogoutClick}>
                Confirm
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default Header;
