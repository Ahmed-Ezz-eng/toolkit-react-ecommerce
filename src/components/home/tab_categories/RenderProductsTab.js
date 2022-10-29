import React, { useEffect } from 'react';
import { Button, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getTabsProducts } from '../../../redux/reducers/productsSlice';
import { CardContainer } from './TabsStyle';
import currencyFormatter from "currency-formatter";
import { LocalMall } from '@mui/icons-material';
import LoadingScreen from "../../LoadingScreen";
import {Link} from "react-router-dom";
import { addToCart } from "../../../redux/reducers/cartSlice";
import useNotification from '../../useNotification';
import { ToastContainer } from 'react-toastify';
import HandleErorr from '../../HandleError';


const RenderProductsTab = ({cat}) => {
    const dispatch = useDispatch();
    const {tabsProducts, isLoading, isError} = useSelector(state => state.productsSlice);
    const {userData} = useSelector(state => state.userSlice);
    const {isLogin} = userData;
    const [notify] = useNotification();

    useEffect(() => {
        dispatch(getTabsProducts(cat));
    }, [dispatch, cat]);

return (
    <Grid container spacing={3} sx={{marginTop: "50px"}}>
    {
        isLoading ? <LoadingScreen /> : 
        isError ? <HandleErorr error={isError} /> :
        tabsProducts.map(p => (
            <Grid item key={p.id} lg={3} md={4} sm={6} xs={12}>
                <CardContainer>
                    <CardActionArea>
                        <Link to={`/details/${p.id}`}>
                            <CardMedia
                            component="img"
                            height="240"
                            image={p.image}
                            alt={p.title}
                            loading = "lazy"
                            width="100%"
                            />
                        </Link>
                    </CardActionArea>

                <CardContent>
                <Typography gutterBottom variant="h5" component="div" color="text.secondary">
                    {p.category}
                </Typography>
                <Typography variant="h6" color="primary">
                    {currencyFormatter.format(p.price, {code: "USD"})}
                </Typography>

                <Button variant="contained" startIcon={<LocalMall />} size="small" 
                onClick={() => {
                    if (isLogin) {
                    dispatch(addToCart(p));
                    notify("Your product is added to cart", "success");
                    } else {
                    notify("Please register at first","warning");
                    }
                }}>
                    add to cart
                </Button>
                </CardContent>
            </CardContainer>
        </Grid>
        ))
    }
    <ToastContainer />
    </Grid>
  )
}

export default RenderProductsTab