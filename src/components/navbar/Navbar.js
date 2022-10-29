import React, { Fragment, useState } from 'react';
import { AppBar, Avatar, Badge, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Toolbar, 
    useMediaQuery, 
    useTheme} from '@mui/material';

import LocalMall from '@mui/icons-material/LocalMall';
import Menu from '@mui/icons-material/Menu';
import { Brightness4, Brightness7, FavoriteBorder, ShoppingCart } from '@mui/icons-material';

import { NavLogo, NavIcons } from './navStyles';
import SideBar from '../sidebarMenu/SideBar';
import {Link, useNavigate} from "react-router-dom";
import { useSelector, useDispatch} from 'react-redux';
import { logOut } from '../../redux/reducers/userSlice';
import { clearAll } from '../../redux/reducers/cartSlice';

const Navbar = ({mode, toggleMode}) => {

    const theme = useTheme();
    const dispatch = useDispatch();
    const isMatch = useMediaQuery(theme.breakpoints.down(825));
    const [openDrawer, setOpenDrawer] = useState(false);
    const {favorites} = useSelector (state => state.favoriteSlice);
    const {cartProducts} = useSelector (state => state.cartSlice);
    const {userData} = useSelector (state => state.userSlice);
    const {isLogin} = userData;

    const navigate = useNavigate();

    const openDrawerMenu = () => {
        setOpenDrawer(true);
    }
    
    const closeDrawer = () => {
        setOpenDrawer(false);
    }

  return (
    <AppBar>
        <Toolbar sx={{height: "64px"}}>
            <LocalMall sx={{ display: {md: 'flex' }, mr: 1, alignItems:"center" }} />
            <NavLogo to="/" className='logo'>
                mall
            </NavLogo>

            {
            !isMatch && <List sx={{marginLeft: "auto", display: "flex"}}>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/">
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/products">
                        <ListItemText primary="Products" />
                    </ListItemButton> 
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton component={Link} to = "/features">
                        <ListItemText primary="Features" />
                    </ListItemButton>
                </ListItem>
                    
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/profile">
                        <ListItemText primary="Profile" />
                    </ListItemButton>
                </ListItem>


                    
                <ListItem disablePadding>
                    {
                        isLogin ? (
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
            }

            <NavIcons>
            {
            !isMatch && (
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <img src={userData.imgSrc || "imgs/userIcon.png" } alt="user profile" 
                            sx={{objectFit:"contain"}}/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText sx={{color: "primary"}} primary={userData.fname || "Unknown"}  />
                </ListItem>
                )
            }

                <ListItem>
                    <IconButton component={Link} to="/favorites" size="medium" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={favorites.length} color="error">
                        <FavoriteBorder />
                    </Badge>
                    </IconButton>
                </ListItem>

                <ListItem>
                    <IconButton component={Link} to="/cart" size="medium" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={cartProducts.length} color="error">
                        <ShoppingCart />
                    </Badge>
                    </IconButton>
                </ListItem>

                <ListItem onClick={toggleMode}>
                    <IconButton size="medium" aria-label="show 4 new mails" color="inherit">
                        {
                            mode ? <Brightness7 /> : <Brightness4 />
                        }
                    </IconButton>
                </ListItem>

                {
                    isMatch &&
                        <Fragment>
                            <ListItem onClick={openDrawerMenu} sx={{marginLeft: "10px"}}>
                                <IconButton size="medium" aria-label="show 4 new mails" color="inherit">
                                    <Menu />
                                </IconButton>
                            </ListItem>

                            <SideBar open={openDrawer} closeDrawer={closeDrawer} />
                        </Fragment>
                }
            </NavIcons>
        </Toolbar>
    </AppBar>
  )
}

export default Navbar