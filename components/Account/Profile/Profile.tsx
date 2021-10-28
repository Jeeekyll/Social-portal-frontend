import React from "react";
import { useTypedSelector } from "store/hooks";
import { Divider, Grid } from "@mui/material";
import styles from "./Profile.module.scss";
import { Fade } from "react-awesome-reveal";

const api = process.env.NEXT_PUBLIC_DOMAIN_API;

const Profile = () => {
  const { user } = useTypedSelector((state) => state.user);

  const userImage = (): string => {
    return user.image ? `${api}/${user.image}` : `/account/profile-empty.png`;
  };

  return (
    <>
      {user && (
        <Fade>
          <div className={styles.profile}>
            <Divider textAlign="left" className={styles.profile__divider}>
              Avatar
            </Divider>
            <div className={styles.profile__item}>
              <div className={styles.profile__avatar}>
                <img
                  src={userImage()}
                  className={styles.profile__avatar}
                  alt="avatar"
                />
              </div>
            </div>

            <Divider textAlign="left">General</Divider>
            <div className={styles.profile__item}>
              <Grid container spacing={2}>
                <Grid item xs={3} md={3}>
                  <div className={styles.profile__item__title}>Username</div>
                </Grid>
                <Grid item>
                  <div className={styles.profile__item__content}>
                    {user.username}
                  </div>
                </Grid>
              </Grid>
            </div>
            <Divider className={styles.profile__divider} />
            <div className={styles.profile__item}>
              <Grid container spacing={2}>
                <Grid item xs={3} md={3}>
                  <div className={styles.profile__item__title}>Email</div>
                </Grid>
                <Grid item>
                  <div className={styles.profile__item__content}>
                    {user.email}
                  </div>
                </Grid>
              </Grid>
            </div>

            <Divider textAlign="left" className={styles.profile__divider}>
              Advanced
            </Divider>

            <div className={styles.profile__item}>
              <Grid container spacing={2}>
                <Grid item xs={3} md={3}>
                  <div className={styles.profile__item__title}>Bio</div>
                </Grid>
                <Grid item>
                  <div className={styles.profile__item__content}>
                    {user.bio || "Data not specified"}
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
        </Fade>
      )}
    </>
  );
};

export default Profile;
