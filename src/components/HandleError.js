
import React from 'react';
import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';

const ErrorScreen = styled(Box)`
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    background: #222;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;

    h2{
      color: #fff;
      font-size: 40px;
    }
`

const HandleErorr = ({error}) => {
  return (
    <ErrorScreen>
        <Typography component="h2">{error}</Typography>
    </ErrorScreen>
  )
}

export default HandleErorr;