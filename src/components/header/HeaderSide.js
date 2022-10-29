

import { Button, Grid, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import{BannerContent} from "./headerStyle";
import currencyFormatter from "currency-formatter";


const HeaderSide = ({banners}) => {

  return (
    <Fragment>
        {
            banners.length ? 
    banners.map(banner => (
        <Grid item xs={12} md={6} lg={12} key={banner.id}>
            <BannerContent sx={{background: `#081828 url(${banner.img}) right / cover no-repeat`}}>
                {banner.sale && <Typography component="span" className="sale">{banner.sale}</Typography>}
                <Typography variant="h4" color="primary" component="h4" className="title">{banner.title}</Typography>
                {banner.price && <Typography variant="h5" className="price">{currencyFormatter.format(banner.price, { locale: 'en-US' })}</Typography>}
                {banner.description && <Typography className="desc">{banner.description}</Typography>}
                <Button variant="contained">read more</Button>
            </BannerContent>
        </Grid>
    )): <Typography>No data to display</Typography>
        }
    </Fragment>
  )
}

export default HeaderSide
