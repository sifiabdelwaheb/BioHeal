import React from 'react';
//import { Controller } from 'react-hook-form';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

function SelectBox({      
	fieldName,
	label,
	startItemText,
	value,
	options,
    control, 
    register,  
    onChange,
    ...props
}) {	 

	return(<>
		<Box sx={{ minWidth: 120 }}>
      		<FormControl fullWidth>        		
                <InputLabel id={`${fieldName}-select`}>{label}</InputLabel>
	                            
        	</FormControl>
        </Box>
	</>);
}

export default SelectBox;
