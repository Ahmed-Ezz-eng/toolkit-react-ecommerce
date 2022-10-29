
import React from 'react';
import {Typography } from '@mui/material';
import Slider from 'react-slick';
import { settings, SliderContent } from './headerStyle';
import currencyFormatter from "currency-formatter";
import { Box } from '@mui/system';

const HeaderSlider = ({sliders}) => {

  return (
    <Slider {...settings}>
    {
        sliders.map(s => (
            <SliderContent key={s.id} sx={{background: `url(${s.img}) right / cover`}}>
                <Box>
                    <Typography component="span">{s.sale}</Typography>
                    <Typography component="h2" color="primary">{s.title}</Typography>
                    <Typography className="desc">{s.description}</Typography>
                    <Typography className="price" color="primary">{currencyFormatter.format(s.price, { locale: 'en-US' })}</Typography>
                </Box>
            </SliderContent>
        ))
    }
    </Slider>

  )
}

export default HeaderSlider;