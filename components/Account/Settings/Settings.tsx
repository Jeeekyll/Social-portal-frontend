import React, { useEffect, useMemo, useState } from "react";
import { useTypedSelector } from "store/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginUserDto, UpdateUserDto } from "store/types/user.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Divider, Grid, IconButton, Input } from "@mui/material";
import ModeEdit from "@mui/icons-material/ModeEdit";
import EditOffIcon from "@mui/icons-material/EditOff";
import styles from "./Settings.module.scss";

const Settings = () => {
  const { user, isAuth } = useTypedSelector((state) => state.user);

  const [isUsernameActive, setIsUsernameActive] = useState<boolean>(false);
  const toggleUsername = (): void => setIsUsernameActive(!isUsernameActive);

  const [isEmailActive, setIsEmailActive] = useState<boolean>(false);
  const toggleEmail = (): void => setIsEmailActive(!isEmailActive);

  const [isBioActive, setIsBioActive] = useState<boolean>(false);
  const toggleBio = (): void => setIsBioActive(!isBioActive);

  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { errors },
  } = useForm<UpdateUserDto>({
    defaultValues: useMemo(() => user, [user]),
  });

  useEffect(() => {
    if (!user) return;

    reset({
      username: user.username,
      email: user.email,
      bio: user.bio,
    });
  }, [user]);

  const onSubmit: SubmitHandler<UpdateUserDto> = async (
    updateUserDto: UpdateUserDto
  ) => {
    console.log(updateUserDto);
  };

  return (
    <>
      {isAuth && (
        <>
          <Divider textAlign="left">Avatar</Divider>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Divider textAlign="left">General</Divider>

            <div className={styles.settings__item}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3} md={3}>
                  <div className={styles.settings__item__title}>Username</div>
                </Grid>
                <Grid item xs={4} md={4}>
                  {isUsernameActive ? (
                    <Input
                      fullWidth
                      placeholder="Username"
                      {...register("username")}
                    />
                  ) : (
                    <div className={styles.settings__item__value}>
                      {user.username}
                    </div>
                  )}
                </Grid>
                <Grid item xs={5} md={5}>
                  <div
                    className={styles.settings__item__edit}
                    onClick={toggleUsername}
                  >
                    <IconButton
                      color="primary"
                      size="small"
                      style={{ marginLeft: "auto" }}
                    >
                      {isUsernameActive ? <EditOffIcon /> : <ModeEdit />}
                    </IconButton>
                    <span>{isUsernameActive ? "Discard" : "Change"}</span>
                  </div>
                </Grid>
              </Grid>
            </div>

            <Divider />

            <div className={styles.settings__item}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3} md={3}>
                  <div className={styles.settings__item__title}>Email</div>
                </Grid>
                <Grid item xs={4} md={4}>
                  {isEmailActive ? (
                    <Input
                      fullWidth
                      placeholder="Email"
                      {...register("email")}
                    />
                  ) : (
                    <div className={styles.settings__item__value}>
                      {user.email}
                    </div>
                  )}
                </Grid>
                <Grid item xs={5} md={5}>
                  <div
                    className={styles.settings__item__edit}
                    onClick={toggleEmail}
                  >
                    <IconButton
                      color="primary"
                      size="small"
                      style={{ marginLeft: "auto" }}
                    >
                      {isEmailActive ? <EditOffIcon /> : <ModeEdit />}
                    </IconButton>
                    <span>{isEmailActive ? "Discard" : "Change"}</span>
                  </div>
                </Grid>
              </Grid>
            </div>

            <Divider textAlign="left">Advanced</Divider>

            <div className={styles.settings__item}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3} md={3}>
                  <div className={styles.settings__item__title}>Bio</div>
                </Grid>
                <Grid item xs={4} md={4}>
                  {isBioActive ? (
                    <Input fullWidth placeholder="Email" {...register("bio")} />
                  ) : (
                    <div className={styles.settings__item__value}>
                      {user.bio}
                    </div>
                  )}
                </Grid>
                <Grid item xs={5} md={5}>
                  <div
                    className={styles.settings__item__edit}
                    onClick={toggleBio}
                  >
                    <IconButton
                      color="primary"
                      size="small"
                      style={{ marginLeft: "auto" }}
                    >
                      {isBioActive ? <EditOffIcon /> : <ModeEdit />}
                    </IconButton>
                    <span>{isBioActive ? "Discard" : "Change"}</span>
                  </div>
                </Grid>
              </Grid>
            </div>

            <Divider textAlign="left">Password</Divider>

            <Button type="submit">Save</Button>
          </form>
        </>
      )}
    </>
  );
};

export default Settings;
