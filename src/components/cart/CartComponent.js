
import {Box, Button, Container, Divider, FormControl, InputLabel, MenuItem, Paper, Select, Stack, Typography} from '@mui/material';
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import currencyFormatter from "currency-formatter";
import { CartImg, CartInfo, NoData } from './cartStyle';
import { deleteProduct, handleCartQuantity, handleCartSize } from '../../redux/reducers/cartSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkout from './Checkout';
import PageHeaderLink from "../breadcrumbs/PageHeaderLink";
import { useNavigate } from 'react-router-dom';


const CartComponent = () => {
  const {cartProducts} = useSelector(state => state.cartSlice);
  const dispatch = useDispatch();
  const selectContent = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const productSize = ["sm", "md", "lg", "xl", "xxl"];
  const navigate = useNavigate();

  useEffect(() => {
    if (cartProducts.length < 1) {
      setTimeout(() => {
        navigate("/");
      }, 2000)
    }
  }, [cartProducts.length, navigate])

  return (
    <Container>
      <PageHeaderLink activeLink="cart" />
      {
        cartProducts.length === 0 ? <NoData className="no-data">No data to dispaly</NoData>
        : 
        ( 
          <Fragment>
            {
              cartProducts.map((product) => (
            <Paper key={product.id}>
                <Stack direction="row" sx={{marginBottom: "30px", padding: "20px",flexWrap:"wrap"}}>

                  <CartImg>
                    <img src={product.image} alt= {product.category} />
                  </CartImg>

                  <CartInfo>
                    <Typography color="primary" variant="h5">{product.title}</Typography>

                    <Box sx={{margin:"20px 0px", display:"flex", flexFlow:"wrap", justifyContent:"space-between"}}>
                        <Typography>category: {product.category}</Typography>
                        <Typography variant="h6" color="primary">price: {currencyFormatter.format(product.price, {code: "USD"})}</Typography>
                    </Box>

                    <Typography variant="body1" color="text.secondary">{product.description}</Typography>
                    <Divider sx={{margin: "20px 0px"}} />

                    <Typography sx={{margin: "10px 0px 20px"}} color="primary" variant="h5">
                        Total price : {currencyFormatter.format(product.quantity * product.price, {code: "USD"})}
                    </Typography>

                    <Stack direction="row" justifyContent="space-between" sx={{flexWrap:"wrap"}}>
                    <Box sx={{ minWidth: 200 }}>
                    <FormControl fullWidth sx={{marginBottom: "20px"}}>
                      <InputLabel id="demo-simple-select-label">Quantity: </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={product.quantity}
                        label="quantity"
                        onChange={(e) => {
                          dispatch(handleCartQuantity({product, among: e.target.value}));
                        }}
                      >
                        {
                          selectContent.map(item => (
                            <MenuItem value={item} key={item}>{item}</MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                  </Box>

                  <Box sx={{ minWidth: 200 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Size: </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={product.size}
                        label="Size"
                        onChange={(e) => {
                          dispatch(handleCartSize({product, size: e.target.value}));
                        }}
                      >
                        {
                          productSize.map(item => (
                            <MenuItem value={item} key={item}>{item}</MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                  </Box>

                  </Stack>

                    <Button color="error" variant="outlined" startIcon={<DeleteIcon />} sx={{marginTop: "20px", float: "right"}} onClick={() => dispatch(deleteProduct(product.id))}>
                      remove
                    </Button>
                    </CartInfo>
                  </Stack>

            </Paper>

            )
            )
            }

              {/* payment component */}
              <Checkout />
              </Fragment>
        )

          }
    </Container>
  )
}

export default CartComponent