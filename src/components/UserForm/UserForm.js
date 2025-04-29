import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addUser } from '../../redux/userSlice';

// Validation schema
const UserSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  address: Yup.string().required('Address is required'),
  company: Yup.string().required('Company is required'),
  telephone: Yup.string()
    .matches(/^[0-9]+$/, 'Phone number must contain only digits')
    .min(10, 'Phone number must be at least 10 digits')
    .required('Telephone Number is required')
});

const UserForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    firstName: '',
    lastName: '',
    address: '',
    company: '',
    telephone: ''
  };

  const handleSubmit = (values, { resetForm }) => {
    dispatch(addUser(values));
    resetForm();
    alert('User successfully added!');
  };

  return (
    <div className="form-container">
      <h2>Add New User</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={UserSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <Field type="text" name="firstName" className="form-field" />
              <ErrorMessage name="firstName" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <Field type="text" name="lastName" className="form-field" />
              <ErrorMessage name="lastName" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <Field type="text" name="address" className="form-field" />
              <ErrorMessage name="address" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="company">Company</label>
              <Field type="text" name="company" className="form-field" />
              <ErrorMessage name="company" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="telephone">Telephone Number</label>
              <Field type="text" name="telephone" className="form-field" />
              <ErrorMessage name="telephone" component="div" className="error-message" />
            </div>

            <button type="submit" className="submit-button" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserForm;