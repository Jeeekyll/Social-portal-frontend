import React, { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, TextField, Typography } from "@mui/material";
import styles from "./Register.module.scss";
import Link from "next/link";

type FormValues = {
  username: string;
  email: string;
  password: string;
};

const Register: FC = () => {
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <div className={styles.register}>
      <div className={styles.register__body}>
        <Typography variant="h3" className={styles.register__title}>
          Register there
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Username"
            {...register("username")}
            className={styles.register__input}
          />
          <TextField
            label="Email"
            {...register("email")}
            className={styles.register__input}
          />
          <TextField
            label="Password"
            type="password"
            error={true}
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
