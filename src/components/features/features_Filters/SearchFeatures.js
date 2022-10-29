import React from 'react';
import { Box, TextField } from '@mui/material';

const SearchFeatures = ({proName, handleProName}) => {


  return (
    <Box 
      sx={{width: "100%"}}
      component="form"
      noValidate
      autoComplete="off"
    >
      <TextField
        fullWidth
        id="outlined-name"
        label="Name"
        value={proName}
        onChange={handleProName}
      />

      </Box>
  )
}

export default React.memo(SearchFeatures);