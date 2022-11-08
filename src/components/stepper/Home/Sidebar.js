import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';

import { teal } from '@mui/material/colors';
const packages = [
    {name: 'React 17.02', link: 'https://reactjs.org/'},  
    {name: 'React Router', link: 'https://reactrouter.com/'},   
    {name: 'React Hooks Form', link: 'https://react-hook-form.com/'},
    {name: 'Yup Schema Builder', link: 'https://github.com/jquense/yup/'},
    {name: 'Material-UI', link: 'https://mui.com/'},

];

const social =  [
    { name: 'GitHub', icon: GitHubIcon, link: 'https://github.com/full-stack-concepts/' }
];

function Sidebar() {

    const title='Full Stack Concept Tutorials';
    const description='We provide tutorials and training for beginning and intermediate code developers with examples and articles.'
    const color = teal[800];

    return (
        <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: color }}>
                <Typography variant="h6" gutterBottom color="gold">
                    {title}
                </Typography>
                <Typography color="white">{description}</Typography>
                <Divider color="white" sx={{m: 2}}/>
                <Typography variant="h6" gutterBottom color="gold">
                    Packages used in this repo:
                </Typography>
                {packages.map((p,i) => (
                    <Link
                        display="block"
                        variant="body1"
                        color="#fff"
                        href="{p.link}"                      
                        sx={{ mb: 0.5 }}
                        key={i}
                    >
                        <Stack direction="row" spacing={1} alignItems="center">                   
                            <span>{p.name}</span>
                        </Stack>
                    </Link>
                ))}               
                <Box sx={{ mt: 2 }}>
                    <Typography variant="h6" gutterBottom color="gold">
                        Social
                    </Typography>
                    {social.map((network, i) => (<>
                        <a key={i} rel="noopener noreferrer" target="_blank" href={network.link}>
                            <Stack direction="row" spacing={1} alignItems="center" color="white">   
                                <network.icon />               
                                <span>{network.name}</span>
                            </Stack>
                        </a>                   
                    </>))} 
                </Box>
            </Paper>           
        </Grid>
    );
}

Sidebar.propTypes = {  
};

export default Sidebar;
