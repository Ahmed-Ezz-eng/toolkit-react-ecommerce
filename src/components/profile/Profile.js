import React, {useState} from 'react';
import { Button, Collapse, Container, Grid, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Stack, Typography } from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import CreateTextField from '../register/CreateTextField';
import * as Yup from "yup";
import {Formik, Form} from "formik";
import { setUserImg, updatePassword } from '../../redux/reducers/userSlice';
import { ProfileImg } from './profileStyle';
import { Email, Lock, PhoneAndroid, Settings, ExpandLess, ExpandMore } from '@mui/icons-material';


const Profile = () => {
  const {userData} = useSelector(state => state.userSlice);
  const dispatch = useDispatch()
  const {fname, lname, email, password, phone, imgSrc} = userData;
  const [changePass, setChangePass] = useState(false);

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
    setChangePass(false)
  };

  const initialValues = {
    password: "",
    confirmPassword: ""
  }
  const validationSchema = Yup.object({
    password: Yup.string().min(4, "Password must be at least 4 characters").required("Password is required"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Password must be match").required("required"),
  })

  const saveData = (values) => {
    dispatch(updatePassword(values))
    setChangePass(false);
  }


  return (
    <Container>
    {
      Object.keys(userData).length ? (
        <Grid container>
        <Grid item xs={12}>
            <Stack direction={{xs: "column", md:"row"}} spacing={3} alignItems="center">
              <ProfileImg>
                <label htmlFor='file-input'><img  src= {imgSrc || "imgs/userIcon.png"} alt="user profile" /></label>
                <input type="file" id="file-input" name="ImageStyle" 
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      dispatch(setUserImg(URL.createObjectURL(e.target.files[0])))
                    } 
                    }
                    }
                  />
              </ProfileImg>
              <Typography color="primary" variant="h3" component="h2">Hello {fname} {lname}</Typography>
            </Stack>
        </Grid>

          <Grid item xs={12}>
              <List
                component="div"
                aria-labelledby="nested-list-subheader"
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    {fname} resigter information
                  </ListSubheader>
                }
                >

                <ListItemButton>
                    <ListItemIcon>
                      <Email />
                    </ListItemIcon>
                    <ListItemText primary= {`Email: ${email}`} />
                </ListItemButton>

                <ListItemButton>
                  <ListItemIcon>
                    <Lock />
                  </ListItemIcon>
                  <ListItemText primary= {`Password: ${password}`} />
              </ListItemButton>

                <ListItemButton>
                  <ListItemIcon>
                    <PhoneAndroid />
                  </ListItemIcon>
                  <ListItemText primary= {`Phone: ${phone}`} />
              </ListItemButton>

              <ListItemButton onClick={handleClick}>
  
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                <ListItemText primary="Settings" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>

              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{margin: "10px 25px"}}>
                  {
                    changePass ? (
                      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={saveData}>
                        <Form>
                          <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                              <CreateTextField type="password" name="password" label="New Password" />
                            </Grid>
                        
                            <Grid item xs={12} md={6}>
                              <CreateTextField type="password" name="confirmPassword" label="Confirm password" />
                            </Grid>
                            
                            <Grid item xs={12} sm={6} sx={{textAlign: "right", ml: "auto"}}>
                            <Button variant="contained" type="submit" color="success">Save password</Button>
                            </Grid>
                          </Grid>
                        </Form>
                  
                      </Formik>
                    ):(
                      <Button variant="contained" color="error" sx={{float: "right"}} size="small" onClick={() => setChangePass(true)}>Change Password</Button>
                    )
                  }
                </List>
              </Collapse>
              </List>
          </Grid>
        </Grid>
      ) : <h2>Error to load data</h2>
    }
    </Container>
  )
}

export default Profile
