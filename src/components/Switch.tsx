import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import React, { useState } from 'react';

interface SwitchProps {
    label: string;
    onChange: (value: boolean) => void;
}

const CustomSwitch = ({ label, onChange }: SwitchProps) => {
    const [checked, setChecked] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        onChange(event.target.checked);
        console.log(event.target.checked);
    };

    return (
        <FormGroup>
            <FormControlLabel control={<Switch 
                checked={checked}
                onChange={handleChange}    
            />} label={label} />
        </FormGroup>
    );
}

export default CustomSwitch;