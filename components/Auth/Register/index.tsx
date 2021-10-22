import React, { FC, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Backdrop,
  Button,
  Fade,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./Register.module.scss";
import { CreateUserDto } from "store/types/user.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterFormSchema } from "utils/validation";
import { useTypedDispatch } from "store/hooks";
import { register as registerThunk } from "store/slices/user";
import { Box } from "@mui/system";
import { Fade as FadeEffect } from "react-awesome-reveal";

const Register: FC = () => {
  const dispatch = useTypedDispatch();

  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateUserDto>({
    resolver: yupResolver(RegisterFormSchema),
    mode: "onChange",
  });

  const watchAllFields = watch();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleModalOpen = (): void => setIsModalOpen(true);
  const handleModalClose = (): void => setIsModalOpen(false);

  const [registerStepper, setRegisterStepper] = useState<number>(1);

  const onSubmit: SubmitHandler<CreateUserDto> = async (
    createUserDto: CreateUserDto
  ) => {
    dispatch(registerThunk(createUserDto));
  };

  useEffect(() => {
    if (isModalOpen) return;

    if (!isModalOpen) {
      setRegisterStepper(1);
      reset();
    }
  }, [isModalOpen]);

  return (
    <>
      <Button variant="contained" size="small" onClick={handleModalOpen}>
        Sign up
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
                    Register
                  </Typography>
                </FadeEffect>

                <form onSubmit={handleSubmit(onSubmit)}>
                  {registerStepper === 1 && (
                    <>
                      <FadeEffect direction="right" duration={200} delay={300}>
                        <Controller
                          control={control}
                          name="username"
                          render={({ field: { onChange } }) => (
                            <TextField
                              error={errors.username && true}
                              label="Username"
                              className={styles.login__input}
                              onChange={onChange}
                            />
                          )}
                        />

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
                            onClick={() => setRegisterStepper(2)}
                            disabled={
                              (errors.email && true) ||
                              (errors.username && true) ||
                              !watchAllFields?.email ||
                              !watchAllFields?.username
                            }
                            type="button"
                          >
                            Next
                          </Button>
                        </div>
                      </FadeEffect>
                    </>
                  )}

                  {registerStepper === 2 && (
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
                          <Button onClick={() => setRegisterStepper(1)}>
                            Prev step
                          </Button>
                          <Button
                            variant="contained"
                            type="submit"
                            disabled={
                              (errors.password && true) ||
                              !watchAllFields.password
                            }
                          >
                            Register
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

export default Register;
