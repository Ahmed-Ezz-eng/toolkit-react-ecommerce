import React from 'react';
import {Formik, Form} from "formik";
import * as Yup from "yup";
import TextField from "./CreateTextField";
import { Button, Container, Grid, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/reducers/userSlice';
import {useNavigate, useLocation} from "react-router-dom";


const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const initialValues = {
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  }

  const validationSchema = Yup.object({
    fname: Yup.string().min(3, "Enter 3 characters at least").required("First name is required"),
    lname: Yup.string().min(3, "Enter 3 characters at least").required("Last name is required"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string().min(4, "Password must be at least 4 characters").required("Password is required"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Password must be match").required("Required"),
    phone: Yup.number().integer().typeError("Please enter valid phone").required("Required"),
  })

  const onSubmit = (values, submitProps) => {
    submitProps.setSubmitting(false);
    dispatch(login(values));
    navigate(location.state?.path || "/");
  }

  return (
    <Grid container>
      
        <Container maxWidth="md">
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {
          formik => (
            <Form>
              <Grid container spacing={2}>

                <Grid item xs={12}>
                  <Typography>Your details</Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField name="fname" label="First name" type="text" />
                </Grid>


                <Grid item xs={12} md={6}>
                  <TextField name="lname" label="Last name" type="text" />
                </Grid>


                <Grid item xs={12}>
                  <TextField name="email" label="Email" type="email" />
                </Grid>

                <Grid item xs={12}>
                  <TextField name="password" label="Password" type="password" />
                </Grid>

                <Grid item xs={12}>
                  <TextField name="confirmPassword" label="Confirm password" type="password" />
                </Grid>

                <Grid item xs={12}>
                  <TextField name="phone" label="Phone number" type="tel" />
                </Grid>

                <Grid item xs={12} >
                    <Button variant='contained' fullWidth type='submit' disabled ={!formik.isValid || formik.isSubmitting}>Submit</Button>
                </Grid>

              </Grid>

            </Form>
          )
        }
      </Formik>
        </Container>
      </Grid>
  
  )
}

export default RegisterForm;

