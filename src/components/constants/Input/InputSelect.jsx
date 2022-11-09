import React from 'react';
import { FormControl, Select, MenuItem } from '@mui/material';
import { Controller } from 'react-hook-form';

/**
 * @param name Input Select Name
 * @param control Registering Components
 * @param defaultValue Input Select Defaultvalue
 * @param options Object Array [{value : "", label : "" }]
 * @param initial Boolean Value Show initial Value
 * @param size small ?? ''
 */

const InputSelect = React.forwardRef((props, ref) => {
  return (
    <Controller
      render={({ field }) => (
        <FormControl sx={{ minWidth: ' fit-content' }} size={props.size || ''}>
          <Select
            value={field.value}
            onChange={field.onChange}
            displayEmpty={props.initial}
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="">Select Category</MenuItem>
            {props.options?.map((option, i) => (
              <MenuItem key={i} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      name={props.name}
      control={props.control}
      defaultValue={props.defaultValue || ''}
    />
  );
});

export default InputSelect;
