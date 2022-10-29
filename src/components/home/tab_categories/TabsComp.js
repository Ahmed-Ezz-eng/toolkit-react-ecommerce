import React from 'react';
import { Tab } from '@mui/material';
import {TabList} from "@mui/lab";
const TabsComp = ({categories, handleChange}) => {

  return (
    <TabList variant= "scrollable"
    allowScrollButtonsMobile onChange={handleChange} aria-label="lab API tabs example">
    {
      categories.map((c, index) => (
          <Tab label={c} value= {`${index+1}`} key={index} />
      ))
    }
    </TabList>
  )
}

export default TabsComp