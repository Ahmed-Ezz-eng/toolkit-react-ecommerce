import React, { Fragment, useEffect, useState, useCallback } from 'react';
import { Grid, Container } from '@mui/material';
import SectionHeader from "../section_header/SectionHeader";
import SelectCategory from './features_Filters/SelectCategory';
import SearchFeatures from './features_Filters/SearchFeatures';
import { useDispatch, useSelector } from 'react-redux';
import LoadingScreen from "../LoadingScreen";
import HandleError from "../HandleError";
import { getCategories, getCateoryProducts } from '../../redux/reducers/featuresSlice';
import Category from './Category';
import PageHeaderLink from "../breadcrumbs/PageHeaderLink";
import { ToastContainer } from 'react-toastify';



const Features = () => {

  const dispatch = useDispatch();
  const {categories, categoriesData, isLoading, isError} = useSelector(state => state.featuresSlice);;
  const {userData} = useSelector(state => state.userSlice);
  const {isLogin} = userData;
  const [proName, setProName] = useState('');
  const [category, setCategory] = useState(categories[0]);

  useEffect(() => {
    dispatch(getCateoryProducts(category));
    dispatch(getCategories());
  }, [dispatch, category])

  // change category
  const handleCategory = useCallback((event) => {
    setCategory(event.target.value);
  }, []);
  
  const handleProName = useCallback((event) => {
    setProName(event.target.value);
}, []);



  return (
    <Fragment>

    {
      isLoading && <LoadingScreen />
    }
    {
    isError && <HandleError error={isError} /> 
    }
    {
      categoriesData.length > 1 && (
          <Container>
              <SectionHeader header="Features" />
              <PageHeaderLink activeLink="features" />
                <Grid container spacing={3}>
                    <Grid container item xs={12} sm={6}>
                        <SelectCategory category={category} categories = {categories} handleCategory={handleCategory} />
                    </Grid>

                    <Grid container item xs={12} sm={6}>
                        <SearchFeatures proName={proName} handleProName={handleProName} />
                    </Grid>
                </Grid>

                <Grid container spacing={3}>
                    <Category categories={categoriesData} title={proName} isLogin={isLogin} />
                </Grid>
                <ToastContainer />
      </Container>
      )
    }
    </Fragment>
  )
}

export default Features