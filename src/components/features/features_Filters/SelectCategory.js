import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const SelectCategory = ({category, categories, handleCategory}) => {
    
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };



return (
    <FormControl fullWidth>
        <InputLabel id="demo-controlled-open-select-label">Categories</InputLabel>
        <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={category}
            label = "Category"
            onChange={handleCategory}
        >
        {
            categories.length > 1 &&
            categories.map((category, index) => (
                <MenuItem value={category} key={index}>{category}</MenuItem>
            )
            )
        }
        </Select>
    </FormControl>
  )
}

export default React.memo(SelectCategory);