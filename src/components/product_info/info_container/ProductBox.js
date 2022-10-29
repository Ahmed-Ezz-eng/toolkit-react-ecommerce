import React, {Fragment, useState} from 'react';
import {Divider, FormControl, Box, InputLabel, MenuItem, Select, Typography, Button, Grid} from '@mui/material';
import currencyFormatter from "currency-formatter";
import { handleQuantity, handleSize } from '../../../redux/reducers/productsSlice';
import { addToCart } from '../../../redux/reducers/cartSlice';
import {useDispatch} from "react-redux";
import useNotification from '../../useNotification';


const ProductBox = ({productInfo, handleOpen, isLogin}) => {

    const dispatch = useDispatch();
    const selectContent = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const productSize = ["sm", "md", "lg", "xl", "xxl"];
    const [quanValue, setQantity] = useState(selectContent[0]);
    const [size, setSize] = useState(productSize[0]);
    const [notify] = useNotification();

return (
    <Fragment>
        <Typography variant="h5" color="primary" component="h2">{productInfo.title}</Typography>
        <Typography variant="h6" sx={{padding: "10px 0px 20px"}}>{currencyFormatter.format(productInfo.price, { code: 'USD' })}</Typography>
        
        <Box>
            <Typography variant="body1" sx={{paddingBottom: "7px"}}>Description :</Typography> 
            <Typography color="#757575">{productInfo.description}</Typography>
        </Box>

        <Typography sx={{margin: "20px 0px"}}>Category: {productInfo.category}</Typography>
        {/* line */}
        <Divider />

        <Grid container sx={{marginTop: "10px"}} spacing={2}>
            <Grid item xs={12} sm={6}>
                <Box>
                    <Typography>Quantity: </Typography>
                    <FormControl sx={{mr: 1, my:2, minWidth: "100%"}}>
                        <InputLabel id="demo-controlled-open-select-label">Quantity</InputLabel>
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            value={quanValue}
                            onChange={(e) => {
                            setQantity(e.target.value);
                            dispatch(handleQuantity({among: e.target.value}))
                            }}
                            label="Quantity"

                        >
                        
                            {
                                selectContent.map(ele => (
                                <MenuItem key={ele} value={ele}>{ele}</MenuItem>
                                ))
                            }
                        
                        
                        </Select>
                    </FormControl>
                </Box>
            </Grid>
        
            <Grid item xs={12} sm={6}>
                <Box>
                    <Typography>Size: </Typography>
                    <FormControl sx={{mr: 1, my:2, minWidth: "100%"}}>
                        <InputLabel id="demo-controlled-open-select-label">Size</InputLabel>
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            value={size}
                            label="size"
                            onChange={(e) => {
                            setSize(e.target.value);
                            dispatch(handleSize({productSize: e.target.value}))
                            }}
                        >
                            
                            {
                                productSize.map(ele => (
                                <MenuItem key={ele} value={ele}>{ele}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Box>
            </Grid>
        <Box>
    </Box>
</Grid>

    <Box sx={{textAlign: "right"}}>
        <Button variant="contained" onClick={() => {
        if (productInfo.quantity === 0) {
            handleOpen();
        } else {
            if (isLogin) {
                    dispatch(addToCart(productInfo));
                    notify("Your product is added to cart", "success");
                } else {
                    notify("Please register at first", "warning");
                }
        }
        }}>Add to cart</Button>
    </Box>
</Fragment>
)
}

export default ProductBox;

