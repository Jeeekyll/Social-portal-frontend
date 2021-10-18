import React, { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./Login.module.scss";
import { Button, TextField, Typography } from "@mui/material";
import Link from "next/link";

type FormValues = {
  email: string;
  password: string;
};

const Login: FC = () => {
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <div className={styles.login}>
      <div className={styles.login__body}>
        <Typography variant="h3" className={styles.login__title}>
          Login there
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            {...register("email")}
            className={styles.login__input}
          />
          <TextField
            label="Password"
            type="password"
            {...register("password")}
            className={styles.login__input}
          />
          <div className={styles.login__submit}>
            <Link href="/register">
              <Button>I don`t have an account</Button>
            </Link>

            <Button variant="contained" type="submit">
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
