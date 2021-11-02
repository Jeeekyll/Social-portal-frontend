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

export const ChangeUserCredentials = yup.object().shape({
  email: yup.string().email("Wrong email").required(),
  username: yup.string().min(4).max(20).required(),
  bio: yup.string().max(50).notRequired(),
});

export const ChangeUserPassword = yup.object().shape({
  currentPassword: yup.string().min(4).max(30).required(),
  newPassword: yup.string().min(4).max(30).required(),
});

export const CreateArticleComment = yup.object().shape({
  text: yup.string().min(4).max(200).required(),
});

export const CreateArticle = yup.object().shape({
  title: yup.string().min(4).max(100).required(),
  description: yup.string().min(4).max(300).required(),
  body: yup.string().min(4).max(2000).required(),
});

export const UpdateArticle = yup.object().shape({
  title: yup.string().min(4).max(100).required(),
  description: yup.string().min(4).max(300).required(),
  body: yup.string().min(4).max(2000).required(),
});
