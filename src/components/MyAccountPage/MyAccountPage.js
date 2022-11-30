import React from 'react';
import { Formik, Form, Field } from 'formik';
import '../Login/Login';
import { validateUpdateProfileForm } from 'utility/formValidation';
import useStore from 'store/AuthState';

const MyAccountPage = () => {
  const store = useStore();

  let initialValues = {
    email: store?.userData.user_email,
    user_first_name: store?.userData.user_first_name,
    user_last_name: store?.userData.user_last_name,
  };

  const handleSubmit = values => {
    console.log(values, 'Form Submitted');
    store.updateUserProfile(
      { ...values },
      store?.userData?.user_id,
      success => {
        if (success) {
          store.refreshUserProfile(store?.userData?.user_id);
        }
      },
    );
  };

  return (
    <div className="login">
      <Formik
        initialValues={initialValues}
        onSubmit={values => handleSubmit(values)}
        validationSchema={validateUpdateProfileForm}
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
                  placeholder="johndoe@email.com"
                  id="user_email"
                  name="email"
                />
                <span>
                  {errors.email && touched.email ? errors.email : null}
                </span>
              </div>
              {/* <div className="rowLogin">
                <label for="password">Password</label>
                <Field
                  type="password"
                  placeholder="Password"
                  id="password"
                  name="password"
                />
                <span>
                  {errors.password && touched.password ? errors.password : null}
                </span>
              </div> */}
              <button className="buttonClass" type="submit">
                Update Profile
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default MyAccountPage;
