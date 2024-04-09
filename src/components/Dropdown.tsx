import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface SelectProps {
  label: string;
  options: { value: any | any; label: string }[];
  value: any;
  onChange: (value: any | any) => void;
}

const CustomSelect = ({ label, options, value, onChange }: SelectProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as string | number);
  };

  return (
    <Box sx={{ minWidth: 150 }}>
      <FormControl variant='standard'>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          onChange={handleChange}
          style={{ width: '15rem' }}
        >
          {options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CustomSelect;
