import React, { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, TextField, Typography } from "@mui/material";
import styles from "./Register.module.scss";
import Link from "next/link";
import { CreateUserDto } from "store/types/user.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterFormSchema } from "utils/validation";
import { useTypedDispatch } from "store/hooks";
import { register as registerThunk } from "store/slices/user";

const Register: FC = () => {
  const dispatch = useTypedDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserDto>({
    resolver: yupResolver(RegisterFormSchema),
  });

  const onSubmit: SubmitHandler<CreateUserDto> = async (
    createUserDto: CreateUserDto
  ) => {
    dispatch(registerThunk(createUserDto));
  };

  return (
    <div className={styles.register}>
      <div className={styles.register__body}>
        <Typography variant="h3" className={styles.register__title}>
          Register
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Username"
            error={errors.username && true}
            helperText={errors.username?.message}
            {...register("username")}
            className={styles.register__input}
          />
          <TextField
            label="Email"
            error={errors.email && true}
            helperText={errors.email?.message}
            {...register("email")}
            className={styles.register__input}
          />
          <TextField
            label="Password"
            type="password"
            error={errors.password && true}
            helperText={errors.password?.message}
            {...register("password")}
            className={styles.register__input}
          />

          <div className={styles.register__submit}>
            <Link href="/login">
              <Button>I already registered</Button>
            </Link>

            <Button variant="contained" type="submit">
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
