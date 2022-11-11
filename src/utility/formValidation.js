import * as Yup from 'yup';

export const validateSignupForm = Yup.object().shape({
  email: Yup.string()
    .email('Please Enter a Valid Email')
    .required('This field is required')
    .nullable(),
  password: Yup.string()
    .min(6, 'Minimum 6 characters')
    .required('This field is required')
    .nullable(),
  user_first_name: Yup.string().required('This field is required').nullable(),
  user_last_name: Yup.string().required('This field is required').nullable(),
});

export const validateLoginForm = Yup.object().shape({
  email: Yup.string()
    .email('Please Enter a Valid Email')
    .required('This field is required')
    .nullable(),
  password: Yup.string()
    .min(6, 'Minimum 6 characters')
    .required('This field is required')
    .nullable(),
});
