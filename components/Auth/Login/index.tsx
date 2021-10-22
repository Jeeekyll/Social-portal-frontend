import React, { FC, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import styles from "./Login.module.scss";
import {
  Backdrop,
  Button,
  Fade,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { LoginUserDto } from "store/types/user.type";
import { LoginFormSchema } from "utils/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { login } from "store/slices/user";
import { useDispatch } from "react-redux";
import { Box } from "@mui/system";
import { Fade as FadeEffect } from "react-awesome-reveal";

const Login: FC = () => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleModalOpen = (): void => setIsModalOpen(true);
  const handleModalClose = (): void => setIsModalOpen(false);

  const [loginStepper, setLoginStepper] = useState<number>(1);

  const {
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm<LoginUserDto>({
    resolver: yupResolver(LoginFormSchema),
    mode: "onChange",
  });

  const watchAllFields = watch();

  const onSubmit: SubmitHandler<LoginUserDto> = async (
    loginUserDto: LoginUserDto
  ) => {
    dispatch(login(loginUserDto));
  };

  useEffect(() => {
    if (isModalOpen) return;

    if (!isModalOpen) {
      setLoginStepper(1);
      reset();
    }
  }, [isModalOpen]);

  return (
    <>
      <Button variant="outlined" size="small" onClick={handleModalOpen}>
        Sign in
      </Button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isModalOpen}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isModalOpen}>
          <Box className={styles.login__modal}>
            <div className={styles.login}>
              <div className={styles.login__body}>
                <FadeEffect delay={300}>
                  <Typography variant="h3" className={styles.login__title}>
                    Login
                  </Typography>
                </FadeEffect>

                <form onSubmit={handleSubmit(onSubmit)}>
                  {loginStepper === 1 && (
                    <>
                      <FadeEffect direction="right" duration={200} delay={300}>
                        <Controller
                          control={control}
                          name="email"
                          render={({ field: { onChange } }) => (
                            <TextField
                              error={errors.email && true}
                              label="Email"
                              className={styles.login__input}
                              onChange={onChange}
                            />
                          )}
                        />
                      </FadeEffect>

                      <FadeEffect delay={300}>
                        <div className={styles.login__actions}>
                          <Button onClick={handleModalClose}>Close</Button>
                          <Button
                            variant="contained"
                            onClick={() => setLoginStepper(2)}
                            disabled={
                              (errors.email && true) || !watchAllFields?.email
                            }
                            type="button"
                          >
                            Next
                          </Button>
                        </div>
                      </FadeEffect>
                    </>
                  )}

                  {loginStepper === 2 && (
                    <>
                      <FadeEffect delay={300}>
                        <Controller
                          control={control}
                          name="password"
                          render={({ field: { onChange } }) => (
                            <TextField
                              label="Password"
                              type="password"
                              error={errors.password && true}
                              onChange={onChange}
                              className={styles.login__input}
                            />
                          )}
                        />

                        <div className={styles.login__actions}>
                          <Button onClick={() => setLoginStepper(1)}>
                            Prev step
                          </Button>
                          <Button
                            variant="contained"
                            type="submit"
                            disabled={errors.password && true}
                          >
                            Login
                          </Button>
                        </div>
                      </FadeEffect>
                    </>
                  )}
                </form>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default Login;
