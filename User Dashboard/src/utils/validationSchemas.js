import * as Yup from 'yup';


const email = Yup.string()
  .email('Invalid email format')
  .required('Email is required');

const password = Yup.string()
  .min(8, 'Password must be at least 8 characters')
  .required('Password is required');


export const loginSchema = Yup.object().shape({
  email,
  password,
});


export const registerSchema = Yup.object().shape({
  email,
  password,
});


export const emailSchema = Yup.object().shape({
  email,
});


export const passwordResetSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Must contain at least one number')
    .required('New password is required'),

  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm new password is required'),
});
