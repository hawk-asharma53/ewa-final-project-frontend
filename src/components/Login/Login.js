import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { routes } from 'utility/constants';
import './login.css';
import useStore from 'store/AuthState';
import { validateLoginForm } from 'utility/formValidation';

export const Login = () => {
  const store = useStore();

  let initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = values => {
    console.log(values, 'Form Submitted');
    store.login({ ...values });
  };

  return (
    <div className="login">
      <Formik
        initialValues={initialValues}
        onSubmit={values => handleSubmit(values)}
        validationSchema={validateLoginForm}
      >
        {({ errors, touched }) => {
          return (
            <Form className="formClass">
              <div className="rowLogin">
                <label for="email">Email</label>
                <Field
                  type="email"
                  placeholder="email@example.com"
                  id="user_email"
                  name="email"
                />
                <span>
                  {errors.email && touched.email ? errors.email : null}
                </span>
              </div>
              <div className="rowLogin">
                <label for="password">Password</label>
                <Field
                  type="password"
                  placeholder=""
                  id="password"
                  name="password"
                />
                <span>
                  {errors.password && touched.password ? errors.password : null}
                </span>
              </div>
              <button className="buttonClass" type="submit">
                Login
              </button>
              <Link className="alignLinkCenter" to={routes.SIGNUP}>
                New User?
              </Link>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
