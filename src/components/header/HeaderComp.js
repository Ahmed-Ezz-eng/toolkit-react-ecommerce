import React, { useEffect, useState } from 'react';
import {Grid} from '@mui/material';
import axios from 'axios';
import {GridContainer} from "./headerStyle";
import HeaderSlider from './HeaderSlider';
import HeaderSide from './HeaderSide';


const HeaderComp = () => {
    const [sliders, setSliders] = useState([]);
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        axios.get("data.json").then(res => {
            setSliders(res.data.slider)
            setBanners(res.data.banners)
        })
    }, []);

return (
    <GridContainer>
        <Grid container spacing={3} sx={{marginTop: "0px"}}>
            <Grid container item xs={12} lg={8} spacing={3}>
                <Grid item xs={12}>
                    <HeaderSlider sliders={sliders} />
                </Grid>
            </Grid>
            <Grid container item xs={12} lg={4} spacing={3}>
                <HeaderSide banners={banners} />
            </Grid>
        </Grid>
    </GridContainer>
)
}

export default HeaderComp;
