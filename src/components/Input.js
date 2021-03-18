import { TextField } from '@material-ui/core';
import { forwardRef } from 'react';

const Input = forwardRef((props, ref) => {
  return (
    <TextField
      variant='outlined'
      margin='normal'
      inputRef={ref}
      fullWidth
      {...props}
    />
  );
});

export default Input;
