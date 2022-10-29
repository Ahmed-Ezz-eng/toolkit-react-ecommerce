import React, { useEffect } from 'react';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Stack, Typography } from '@mui/material';
import { Container } from '@mui/system';
import {useSelector, useDispatch } from 'react-redux';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import currencyFormatter from "currency-formatter";
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../redux/reducers/cartSlice';
import useNotification from '../useNotification';
import { ToastContainer } from 'react-toastify';


const FavoritesProducts = () => {
    const {favorites} = useSelector(state => state.favoriteSlice);
    const {userData} = useSelector(state => state.userSlice);
    const {isLogin} = userData
    const [notify] = useNotification();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
      if (favorites.length === 0) {
        setTimeout(() => {
          navigate("/products")
        }, 1500)
      }
    }, [navigate, favorites.length]);
    
  return (
    <Container>
    <Grid container spacing={3}>
      {
        favorites.length > 0 ? favorites.map(fav => (
          <Grid item xs={12} lg = {6} key={fav.id}>

          <Card>
              <Stack direction = {{xs: "column", sm:"row"}}>
              <CardActionArea>

                <CardMedia
                  component="img"
                  height = "200px"
                  image= {fav.image}
                  alt= {fav.title}
                  sx={{padding: "20px", width: "200px", objectFit: "contain", 
                  margin:"auto"}}
                />
                </CardActionArea>
                <Box sx={{padding: "20px"}}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" color="primary">
                      {fav.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {fav.description}
                    </Typography>
                  </CardContent>

                  <CardActions>
                  <Stack direction="row" sx={{justifyContent:"space-between", alignItems:"center", width:"100%"}}>
                  <Typography variant="h5" color="primary">{currencyFormatter.format(fav.price, { code: 'USD' })}</Typography>
                    <Button variant="contained" startIcon={<ShoppingCart />} sx={{textTransform:"capitalize"}} onClick={() => {
                      if (isLogin) {
                          dispatch(addToCart(fav));
                          notify("Your product is added to cart", "success");
                      } else {
                          notify("Please register at first", "warning");
                      }
                    }}>
                      Add to cart
                    </Button>
                    </Stack>
                    </CardActions>
                </Box>
                </Stack>
          </Card>
      </Grid>
        )) : "No data to display"
        }
      </Grid>
      <ToastContainer />
    </Container>
  )
}

export default FavoritesProducts
