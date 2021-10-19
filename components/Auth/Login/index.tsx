import React, { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./Login.module.scss";
import { Button, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { LoginUserDto } from "../../../store/types/user.type";
import { LoginFormSchema } from "../../../utils/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthService from "../../../services/AuthService";
import { useTypedDispatch } from "../../../store/hooks";
import { setUserData } from "store/slices/user";

const Login: FC = () => {
  const dispatch = useTypedDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserDto>({
    resolver: yupResolver(LoginFormSchema),
  });

  const onSubmit: SubmitHandler<LoginUserDto> = async (
    loginUserDto: LoginUserDto
  ) => {
    try {
      const data = await AuthService.login(loginUserDto);
      dispatch(setUserData(data));
      localStorage.setItem("token", data.token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.login__body}>
        <Typography variant="h3" className={styles.login__title}>
          Login
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            error={errors.email && true}
            helperText={errors.email?.message}
            label="Email"
            {...register("email")}
            className={styles.login__input}
          />
          <TextField
            label="Password"
            type="password"
            error={errors.password && true}
            helperText={errors.password?.message}
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
