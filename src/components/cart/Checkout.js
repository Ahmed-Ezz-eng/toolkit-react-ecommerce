import React  from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { useSelector} from 'react-redux'
import { CheckoutBox } from './cartStyle';
import currencyFormatter from "currency-formatter";
import { useEffect } from 'react';


const Checkout = () => {
    const {totalPrice, totalQuantity} = useSelector(state => state.cartSlice);
    useEffect(() => {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: 1
              }
            }]
          })
        },
      
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            alert(`Thanks for paying dear ${details.payer.name.given_name}`);
          });
        }
      
      }).render("#check-container");
    }, []);


  return (
    <Grid container>
      <Grid item xs={12} md ={6} sx={{margin: "auto"}}>
        <CheckoutBox>
            <Typography variant="h5">Checkout</Typography>
            <Box>
              <Stack direction="row" justifyContent="space-between" sx={{padding: "10px"}}>
                <Typography>TotalQuantity : </Typography>
                <Typography>{totalQuantity}</Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between" sx={{padding: "10px"}}>
                <Typography>TotalPrice : </Typography>
                <Typography>{currencyFormatter.format(totalPrice, {code: "USD"})}</Typography>
              </Stack>

              <Box id="check-container"></Box>
            </Box>
          </CheckoutBox>
      </Grid>
    </Grid>
  )
}

export default Checkout
