import * as yup from 'yup';

export const RegisterFormSchema = yup.object().shape({
  username: yup.string().min(4).required(),
  email: yup.string().email('Wrong email').required(),
  password: yup.string().min(4).required(),
});

export const LoginFormSchema = yup.object().shape({
  email: yup.string().email('Wrong email').required(),
  password: yup.string().min(4).required(),
});

export const UpdateUserCredentialsSchema = yup.object().shape({
  email: yup.string().email('Wrong email').required(),
  username: yup.string().min(4).max(20).required(),
  bio: yup.string().max(50).notRequired(),
});

export const UpdateUserPasswordSchema = yup.object().shape({
  currentPassword: yup.string().min(4).max(30).required(),
  newPassword: yup.string().min(4).max(30).required(),
});

export const CreateCommentSchema = yup.object().shape({
  text: yup.string().min(4).max(200).required(),
});

export const CreateArticleSchema = yup.object().shape({
  title: yup.string().min(4).max(100).required(),
  description: yup.string().min(4).max(300).required(),
  body: yup.string().min(4).max(2000).required(),
  category: yup.number().required(),
});

export const UpdateArticleSchema = yup.object().shape({
  title: yup.string().min(4).max(100).required(),
  description: yup.string().min(4).max(300).required(),
  body: yup.string().min(4).max(2000).required(),
});

export const CreateRoomSchema = yup.object().shape({
  name: yup.string().min(3).max(100).required(),
  description: yup.string().max(100).notRequired(),
});
