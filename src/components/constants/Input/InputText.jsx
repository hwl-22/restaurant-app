import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Controller } from 'react-hook-form';

/**
 *
 * @param name  Input Name
 * @param control Registering Components
 * @param defaultValue Input Defaultvalue
 * @param icon Input Start Icon
 * @param placeholder Input Placeholder
 * @param fullWidth Boolean Value
 * @param error Form Validation
 */

const InputText = React.forwardRef((props, ref) => {
  return (
    <Controller
      render={({ field }) => (
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {props.icon || ''}
              </InputAdornment>
            ),
          }}
          value={field.value}
          onChange={field.onChange}
          placeholder={props.placeholder}
          fullWidth={props.fullWidth}
          error={props.error && props.error}
          helperText={props.error && props.error}
          variant="standard"
          id="input-with-icon-textfield"
        />
      )}
      name={props.name}
      control={props.control}
      defaultValue={props.defaultValue || ''}
    />
  );
});

export default InputText;
