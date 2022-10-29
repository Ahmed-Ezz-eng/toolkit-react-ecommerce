import React, { Fragment, useEffect } from 'react';
import { Card, CardActions, CardContent, CardMedia, Checkbox, Collapse, Container, Grid, IconButton, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, setChecked, handleExpand } from '../../redux/reducers/productsSlice';
import SectionHeader from "../section_header/SectionHeader";
import LoadingScreen from '../LoadingScreen';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {Link} from "react-router-dom";
import { addToFavorites } from '../../redux/reducers/favoriteSlice';
import {addToCart} from "../../redux/reducers/cartSlice";
import { ToastContainer } from 'react-toastify';
import useNotification from '../useNotification';
import PageHeaderLink from '../breadcrumbs/PageHeaderLink';
import HandleErorr from '../HandleError';


const Products = ({isLogin}) => {

  const {products, isLoading, isError} = useSelector(state => state.productsSlice);
  const dispatch = useDispatch();
  const [notify] = useNotification();

useEffect(() => {
  if (products.length > 1) {
    return undefined; // to  keep heart checked
  } else {
    dispatch(getProducts());
  }
}, [dispatch, products.length]);



  return (
    <Fragment>
      { isLoading && <LoadingScreen />}
      {isError && <HandleErorr error={isError} />}
      <Container>
      
          <SectionHeader header="Products" />
          
          <PageHeaderLink activeLink="products" />

          <Grid container spacing={3} sx={{alignItems: "center"}}>
          {
            products.map((product, index) => (
              <Grid item key={product.id}  xs={12} sm={6} lg={3}>
                  <Card>
                    
                  <Link to={`/details/${product.id}`}>
                      <CardMedia
                      component="img"
                      height="194"
                      width = "100%"
                      loading = "lazy"
                      image= {product.image}
                      alt= {product.title}
                      sx = {{objectFit: "contain", background: "#fff", padding: "15px"}}
                      />
                  </Link>

                    <CardContent>
                        <Typography textAlign={"center"}
                          color="primary"
                        gutterBottom variant="h5" component="div">
                            {product.category}
                        </Typography>
                    </CardContent>

                    <CardActions disableSpacing>
                      
                    <Checkbox aria-label="add to favorite"
                    checked = {product.checked}

                    onChange={(e) => {
                      let newPro = Object.assign({}, product, {checked: e.target.checked});
                      
                      dispatch(setChecked({product, check: e.target.checked}));
                      
                      dispatch(addToFavorites({newPro}))
                    }}
                      inputProps={{ 'aria-label': 'controlled' }} icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{color: "red"}} />} />


                      <IconButton aria-label="add to cart" onClick={() => {
                        if (isLogin) {
                          dispatch(addToCart(product));
                          notify("Your product is added to cart", "success");
                        }

                        else{
                          notify("Please register at first", "warning");
                        }
                      }}>

                        <ShoppingBagIcon color="primary" />
                      </IconButton>


                      <IconButton sx={{marginLeft: "auto"}} 
                        
                        onClick={() => dispatch(handleExpand({product, id: product.id}))}
                      >
                      {
                        product.expand ? <KeyboardArrowUpIcon />  : <KeyboardArrowDownIcon />
                      }
                      </IconButton>
                  </CardActions>
                  
                  <Collapse in={product.expand}>
                    <CardContent>
                      <Typography paragraph>description:</Typography>
                      <Typography paragraph>
                        {product.description}
                      </Typography>

                    </CardContent>
                  </Collapse>
                  </Card>
                  
              </Grid>
            ))
          }
          </Grid>
          <ToastContainer />
      </Container>
    </Fragment>
  )
}

export default Products;

