import React, { useEffect, useState } from 'react';
import { Box, Container, Typography} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from "react-router-dom";
import { getProductInfo, getRelatedProducts} from '../../redux/reducers/productsSlice';
import LoadingScreen from "../LoadingScreen";
import RelatedProducts from './RelatedProducts';
import { ProductDetailsBox, ProductImgBox, ProductInfoBox, RelatedBox, RelatedContainer } from './detailsStyle';
import ImgThubnails from './info_container/ImgThubnails';
import DialogComp from './DialogComp';
import ProductBox from './info_container/ProductBox';
import { ToastContainer } from 'react-toastify';
import HandleError from "../HandleError";

const ProductDetails = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {productInfo, isLoading, isError} = useSelector(state => state.productsSlice);
    const {userData} = useSelector(state => state.userSlice);
    const {isLogin} = userData
    const [open, setOpen] = useState(false);
    const {relatedProducts}  = useSelector(state => state.productsSlice);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
      console.log("close dialog");
    }

    useEffect(() => {
        dispatch(getProductInfo(id));
    }, [id, dispatch]);
    
    useEffect(() => {
      dispatch(getRelatedProducts(productInfo.category));
  }, [dispatch, productInfo.category])
  

  return (
    <Container>
    {
      isError ? <HandleError error={isError} /> :
      isLoading ? <LoadingScreen /> : (
        <ProductDetailsBox>
          <ProductImgBox>
          {/* image thubnails */}
          <Box className="small-imgs">
            <ImgThubnails productInfo={productInfo} />
            <ImgThubnails productInfo={productInfo} />
            <ImgThubnails productInfo={productInfo} />
            <ImgThubnails productInfo={productInfo} />
          </Box>

          {/* large image */}
          <img src={productInfo.image} alt={productInfo.category} />
          </ProductImgBox>

          {/* product details */}
          <ProductInfoBox>
            <ProductBox productInfo={productInfo} handleOpen={handleClickOpen} isLogin={isLogin} />
          </ProductInfoBox>

        </ProductDetailsBox>
      )
    }

    
    {/*  All Related Products */}

    <RelatedContainer>
      <Typography component="h3" color="primary">related products</Typography>
      <RelatedBox>
        <RelatedProducts products = {relatedProducts} isLogin={isLogin} />
      </RelatedBox>
    </RelatedContainer>

    <Box>
      <DialogComp open={open} handleClose={handleClose} />
    </Box>

    <ToastContainer />
    </Container>
  )
}

export default ProductDetails;
