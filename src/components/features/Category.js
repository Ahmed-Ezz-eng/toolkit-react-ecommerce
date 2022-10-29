import React, { Fragment } from 'react';
import {Box, CardActionArea, CardActions, CardContent, CardMedia, Grid, Rating, SpeedDial,
    SpeedDialAction, SpeedDialIcon, Stack, Typography } from '@mui/material';
import {FeatureContent} from "./featuresStyle";
import currencyFormatter from "currency-formatter";
import { ShoppingCart, Visibility } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useNavigate , Link} from 'react-router-dom';
import { addToCart } from '../../redux/reducers/cartSlice';
import { handleRating } from '../../redux/reducers/featuresSlice';
import useNotification from "../useNotification";

const Category = ({categories, title, isLogin}) => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [notify] = useNotification();


return (
    <Fragment>
        {
            categories.filter((category) => {
                if(title === "") {
                    return category
                } else if(category.title.toLowerCase().includes(title.toLowerCase())){
                    return category
                } else {
                    return false
                }
            }).map(category => (
                <Grid item key={category.id} xs={12} sm={6} lg={4}>
                    <FeatureContent>
                        <CardActionArea sx={{padding: "10px"}}>
                            <Link to = {`/details/${category.id}`}>
                                <CardMedia
                                    component="img"
                                    image= {category.image}
                                    alt={category.category}
                                />
                            </Link>
                        </CardActionArea>

                        <CardContent>
                            <Typography variant="body1" color="text.secondary">
                            {category.category}
                            </Typography>

                            <Typography gutterBottom variant="h6" component="h3" color="primary">
                            {category.title.slice(0, 44)}
                            </Typography>

                            <Stack direction="row" justifyContent="space-around" alignItems="center" margin="20px 0px">
                                <Rating
                                    name="simple-controlled"
                                    value={category.rating.rate}
                                    precision={0.5}
                                    onChange={(event, newValue) => {
                                        dispatch(handleRating({category, value: newValue}))
                                    }}
                                />

                                <Typography>{category.rating.rate} Review(s)</Typography>
                            </Stack>

                            <Typography className="price" variant="h5" component="div" color="primary">
                                {currencyFormatter.format(category.price, { code: 'USD' })}
                            </Typography>
                        </CardContent>

                        <CardActions>
                            <Box sx={{ height: 100, transform: 'translateZ(0px)', flexGrow: 1 }}>
                                <SpeedDial
                                    ariaLabel="SpeedDial basic example"
                                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
                                    icon={<SpeedDialIcon />}
                                >
                                
                                <SpeedDialAction onClick={() => {
                                    if (isLogin) {
                                        dispatch(addToCart(category));
                                        notify("Your product is added to cart", "success");
                                        }
                
                                        else{
                                        notify("Please register at first", "warning");
                                        }
                                }}
                                    icon={<ShoppingCart />}
                                    tooltipTitle={"Add to cart"}
                                />

                                <SpeedDialAction onClick={() => navigate(`/details/${category.id}`)}
                                    icon={<Visibility />}
                                    tooltipTitle={"See more"}
                                />
                                
                                </SpeedDial>
                            </Box>
                        </CardActions>
                    </FeatureContent>
                </Grid>
            ))
        }
    </Fragment>
  )
}

export default React.memo(Category);

