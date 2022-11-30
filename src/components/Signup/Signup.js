import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { routes } from 'utility/constants';
import '../Login/login.css';
import useStore from 'store/AuthState';
import { validateSignupForm } from 'utility/formValidation';

const Signup = () => {
  const store = useStore();
  const history = useHistory();

  let initialValues = {
    email: '',
    password: '',
    user_first_name: '',
    user_last_name: '',
    user_type: 'customer',
  };

  const handleSubmit = values => {
    console.log(values, 'Form Submitted');
    store.signUp({ ...values }, success => {
      if (success) {
        history.push('/login');
      }
    });
  };

  return (
    <div className="login">
      <Formik
        initialValues={initialValues}
        onSubmit={values => handleSubmit(values)}
        validationSchema={validateSignupForm}
      >
        {({ errors, touched }) => {
          return (
            <Form className="formClass">
              <div className="rowLogin">
                <label for="user_first_name">First Name</label>
                <Field
                  type="text"
                  placeholder="John"
                  id="user_first_name"
                  name="user_first_name"
                />
                <span>
                  {errors.user_first_name && touched.user_first_name
                    ? errors.user_first_name
                    : null}
                </span>
              </div>
              <div className="rowLogin">
                <label for="user_last_name">Last Name</label>
                <Field
                  type="text"
                  placeholder="Doe"
                  id="user_last_name"
                  name="user_last_name"
                />
                <span>
                  {errors.user_last_name && touched.user_last_name
                    ? errors.user_last_name
                    : null}
                </span>
              </div>

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
                Signup
              </button>
              <Link className="alignLinkCenter" to={routes.LOGIN}>
                Back to Login?
              </Link>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Signup;
