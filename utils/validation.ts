import * as yup from "yup";

export const RegisterFormSchema = yup.object().shape({
  username: yup.string().min(4).required(),
  email: yup.string().email("Wrong email").required(),
  password: yup.string().min(4).required(),
});

export const LoginFormSchema = yup.object().shape({
  email: yup.string().email("Wrong email").required(),
  password: yup.string().min(4).required(),
});
