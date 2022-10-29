import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import {TabContext} from "@mui/lab";
import TabsComp from './TabsComp';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../redux/reducers/featuresSlice';
import { Container } from '@mui/system';
import LoadingScreen from "../../LoadingScreen";
import RenderCategory from './RenderCategory';
import HandleErorr from "../../HandleError";


const CategoryTabs = () => {
    const [value, setValue] = useState('1');
    const {categories, isLoading, isError} = useSelector(state => state.featuresSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <Container>
    {isLoading && <LoadingScreen /> }
    {isError && <HandleErorr error={isError} />}

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabsComp categories={categories} handleChange={handleChange} />
          </Box>

          <RenderCategory value = {value} />
        </TabContext>
      </Box>
    
    </Container>
  );
}

export default CategoryTabs;
