import React from 'react';
import { Box } from '@mui/material';
import HeaderComp from '../header/HeaderComp';
import TabsCategory from './tab_categories/TabsCategoryComp';

const Home = () => {
  return (
    <Box>
        <HeaderComp />
        <TabsCategory />
    </Box>
  )
}

export default Home