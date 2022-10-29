
import React from 'react';
import { Avatar, Drawer, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import {Home, Storefront, AccountCircle, AutoFixHigh, ShoppingBag} from "@mui/icons-material";
import { NavLink } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import { logOut } from '../../redux/reducers/userSlice';
import { clearAll } from '../../redux/reducers/cartSlice';
import {useNavigate, Link} from "react-router-dom";


const SideBar = ({open, closeDrawer}) => {
const {userData} = useSelector(state => state.userSlice);
const navigate = useNavigate();
const dispatch = useDispatch();

  return (
    <Drawer open={open} onClose = {closeDrawer}>
    <List>

        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <img src={userData.imgSrc || "imgs/userIcon.png" } alt="user profile" 
                    sx={{objectFit:"contain"}}/>
                </Avatar>
            </ListItemAvatar>
            <ListItemText sx={{color: "primary"}} primary={userData.fname || "Unknown"}  />
        </ListItem>


        <ListItem>
            <ListItemButton component={NavLink} to="/">
                <ListItemIcon>
                    <Home />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItemButton>
        </ListItem>
        <ListItem>
            <ListItemButton component={NavLink} to="/products">
                <ListItemIcon>
                    <Storefront />
                </ListItemIcon>
                <ListItemText primary="Products" />
            </ListItemButton>
        </ListItem>
        <ListItem>
            <ListItemButton component={NavLink} to="/profile">
                <ListItemIcon>
                    <AccountCircle />
                </ListItemIcon>
                <ListItemText primary="Profile" />
            </ListItemButton>
        </ListItem>
        <ListItem>
            <ListItemButton component={NavLink} to="/features">
                <ListItemIcon>
                    <AutoFixHigh />
                </ListItemIcon>
                <ListItemText primary="Features" />
            </ListItemButton>
        </ListItem>

        <ListItem>
            <ListItemButton component={NavLink} to="/cart">
                <ListItemIcon>
                    <ShoppingBag />
                </ListItemIcon>
                <ListItemText primary="Cart" />
            </ListItemButton>
        </ListItem>

        <ListItem>
        {
            userData.isLogin ? (
                <ListItemButton onClick={() => {
                    dispatch(logOut());
                    dispatch(clearAll())
                    navigate("/register");

                }}>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            ): (
                <ListItemButton component={Link} to="/register">
                    <ListItemText primary="Register" />
                </ListItemButton>
            )
        }
        </ListItem>

    </List>

    </Drawer>
  )
}

export default SideBar