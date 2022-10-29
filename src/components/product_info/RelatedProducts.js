import { Card, CardActionArea, CardContent, CardMedia, Grid, IconButton, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import currencyFormatter from "currency-formatter";
import { LocalMall } from '@mui/icons-material';
import { addToCart } from '../../redux/reducers/cartSlice';
import useNotification from '../useNotification';
import LoadingScreen from '../LoadingScreen';
import HandleErorr from '../HandleError';

const RelatedProducts = ({products, isLogin}) => {
  const {isLoading, isError} = useSelector(state => state.productsSlice);
  const dispatch = useDispatch();
  const [notify] = useNotification();

  return (
    <Grid container spacing={3}>

    {
      isLoading ? <LoadingScreen /> :
      isError ? <HandleErorr error={isError} /> :
      products.length && products.map(pro => (
        <Grid item xs={12} md={6} lg={3} key={pro.id}>
          <Card>
            <CardActionArea sx={{padding: "10px"}}>
            
              <CardMedia
                sx = {{objectFit: "contain"}}
                component="img"
                height="200"
                image= {pro.image}
                alt= {pro.category}
              />
            </CardActionArea>

            <CardContent sx={{textAlign: "center"}}>
              <Typography
                color="text.secondary"
                gutterBottom variant="h5" component="div">
                  {pro.category}
              </Typography>

              <Typography variant='h6' color="primary">{currencyFormatter.format(pro.price, {code: "USD"})}</Typography>
          
              <IconButton aria-label="add to cart" sx={{float: "right", marginBottom: "5px" }}
              onClick = {() => {
                if (isLogin) {
                  dispatch(addToCart(pro));
                  notify("Your product is added to cart", "success");
                } else {
                    notify("Please register at first", "warning");
                }
                }}>
                <LocalMall color="primary" />
              </IconButton>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default RelatedProducts