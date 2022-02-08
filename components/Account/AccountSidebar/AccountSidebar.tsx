import React, { useState } from 'react';
import {
  Backdrop,
  Button,
  Fade,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Typography,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import {
  AccountCircleIcon,
  LogoutVariantIcon,
  SettingsIcon,
} from '@icons/material';
import ArticleIcon from '@mui/icons-material/Article';
import { useRouter } from 'next/router';
import { Box } from '@mui/system';
import { useTypedDispatch } from '@/store/hooks';
import { logout } from '@/store/slices/user';
import styles from '@/components/Header/Header.module.scss';

const AccountSidebar = () => {
  const router = useRouter();
  const dispatch = useTypedDispatch();

  const [isLogoutOpen, setIsLogoutOpen] = useState<boolean>(false);

  const handleLogoutClose = (): void => setIsLogoutOpen(false);
  const handleLogoutOpen = (): void => setIsLogoutOpen(true);

  const onLogoutConfirm = (): void => {
    dispatch(logout());
    handleLogoutClose();
    router.push('/');
  };

  return (
    <>
      <List component='nav'>
        <ListItemButton
          selected={router.route === '/account/profile'}
          onClick={() => router.push('/account/profile')}
        >
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary='Profile' />
        </ListItemButton>

        <ListItemButton
          selected={router.route === '/account/articles'}
          onClick={() => router.push('/account/articles')}
        >
          <ListItemIcon>
            <ArticleIcon />
          </ListItemIcon>
          <ListItemText primary='Articles' />
        </ListItemButton>

        <ListItemButton
          selected={router.route === '/account/settings'}
          onClick={() => router.push('/account/settings')}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary='Settings' />
        </ListItemButton>

        <ListItemButton
          selected={router.route === '/account/privacy'}
          onClick={() => router.push('/account/privacy')}
        >
          <ListItemIcon>
            <LockIcon />
          </ListItemIcon>
          <ListItemText primary='Privacy' />
        </ListItemButton>

        <ListItemButton onClick={handleLogoutOpen}>
          <ListItemIcon>
            <LogoutVariantIcon />
          </ListItemIcon>
          <ListItemText primary='Logout' />
        </ListItemButton>
      </List>

      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
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
              variant='h4'
              component='h3'
              className={styles.logout__modal__title}
            >
              ARE YOU SURE?
            </Typography>
            <div className={styles.logout__modal__actions}>
              <Button onClick={handleLogoutClose}>Cancel</Button>
              <Button variant='contained' onClick={onLogoutConfirm}>
                Confirm
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default AccountSidebar;
