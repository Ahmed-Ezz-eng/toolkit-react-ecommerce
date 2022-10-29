import React from 'react';
import { useField } from 'formik';
import { TextField } from '@mui/material';


const CreateTextField = ({name, ...otherProps}) => {

  const [field, meta] = useField(name);
  const textFieldProps = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "outlined",
  }

  if (meta.touched && meta.error) {
    textFieldProps.error = true;
    textFieldProps.helperText = meta.error;
  }

  return <TextField {...textFieldProps} />
}

export default CreateTextField