import React from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  AccountCircleIcon,
  LogoutVariantIcon,
  SettingsIcon,
} from "@icons/material";
import { useRouter } from "next/router";

const AccountSidebar = () => {
  const router = useRouter();

  return (
    <List component="nav">
      <ListItemButton
        selected={router.route === "/account/profile"}
        onClick={() => router.push("/account/profile")}
      >
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItemButton>
      <ListItemButton
        selected={router.route === "/account/settings"}
        onClick={() => router.push("/account/settings")}
      >
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <LogoutVariantIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>
  );
};

export default AccountSidebar;
