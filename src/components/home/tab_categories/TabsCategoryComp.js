
import React from 'react';
import { Box } from '@mui/material';
import SectionHeader from "../../section_header/SectionHeader";
import CategoryTabs from './CategoryTabs';

const TabsCategory = () => {

  return (
    <Box sx={{padding: "50px 0px"}}>
        <SectionHeader header="Categories" />
        <CategoryTabs />
    </Box>
  )
}

export default TabsCategory;