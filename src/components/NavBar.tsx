import * as React from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

interface NavBarProps {
  title: string,
  tagline?: string
}

export default function NavBar(props: NavBarProps) {
  const { title, tagline } = props;

  return (
    <Box>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='div'>
            {title}
          </Typography>
          <Typography variant='caption' component='div'>
            {tagline}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
