import React, { FC, ReactElement } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Link from 'next/link';
import { HomeIcon, ChatIcon, RssIcon } from '@icons/material';
import PersonIcon from '@mui/icons-material/Person';
import styles from '@/components/Header/Header.module.scss';
import { HeaderSidebarProps } from '@/components/Header/HeaderSidebar/HeaderSidebar.props';

const HeaderSidebar: FC<HeaderSidebarProps> = ({
  isSidebarOpen,
  isAuth,
}): ReactElement => {
  return (
    <Drawer
      variant='persistent'
      anchor='left'
      open={isSidebarOpen}
      sx={{
        '& .MuiDrawer-paper': {
          zIndex: 400,
          border: 'none',
          minWidth: 180,
          paddingTop: '70px',
          background: '#F0F0F0',
        },
      }}
    >
      <List>
        <Link href='/'>
          <a className={styles.header__menu__item}>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary='Home' />
            </ListItem>
          </a>
        </Link>

        <Link href='/feed'>
          <a className={styles.header__menu__item}>
            <ListItem button>
              <ListItemIcon>
                <RssIcon />
              </ListItemIcon>
              <ListItemText primary='News' />
            </ListItem>
          </a>
        </Link>

        {isAuth && (
          <>
            <Link href='/chat'>
              <a className={styles.header__menu__item}>
                <ListItem button>
                  <ListItemIcon>
                    <ChatIcon />
                  </ListItemIcon>
                  <ListItemText primary='Chat' />
                </ListItem>
              </a>
            </Link>

            <Link href='/friends'>
              <a className={styles.header__menu__item}>
                <ListItem button>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary='Friends' />
                </ListItem>
              </a>
            </Link>
          </>
        )}
      </List>
    </Drawer>
  );
};

export default HeaderSidebar;
