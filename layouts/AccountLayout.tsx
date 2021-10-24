import React, { FC, ReactElement } from "react";
import { Container, Grid, Typography } from "@mui/material";
import AccountSidebar from "components/Account/AccountSidebar/AccountSidebar";
import { useRouter } from "next/router";
import Redirect from "common/Redirect";

interface AccountLayoutProps {
  title: string;
}

const AccountLayout: FC<AccountLayoutProps> = ({
  title,
  children,
}): ReactElement => {
  const router = useRouter();
  if (
    typeof window !== "undefined" &&
    !localStorage.getItem("token") &&
    router.route !== "/account/activation"
  ) {
    return <Redirect to="/" />;
  }

  return (
    <div style={{ paddingTop: 70 }}>
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={8} md={8}>
            <Typography
              variant="h5"
              gutterBottom
              component="div"
              style={{ textAlign: "center", marginTop: 20, marginBottom: 15 }}
            >
              {title}
            </Typography>
            {children}
          </Grid>
          <Grid item xs={1} md={1}></Grid>
          <Grid item xs={3} md={3}>
            <AccountSidebar />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AccountLayout;
