// File: src/Components/SpeedDial/SpeedDiall.jsx

import * as React from 'react';
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import Box from '@mui/material/Box';

const actions = [
  {
    icon: <CallIcon sx={{ color: '#1976d2' }} />,
    name: 'Call',
    onClick: () => {
      window.open('tel:9355647906', '_self'); // Opens phone dialer
    },
  },
  {
    icon: <EmailIcon sx={{ color: '#d44638' }} />,
    name: 'Email',
    onClick: () => {
      window.open('mailto:rajeshmanigkp@gmail.com', '_self'); // Opens default email app
    },
  },
  {
    icon: <WhatsAppIcon sx={{ color: '#25D366' }} />,
    name: 'Whatsapp',
    onClick: () => {
      window.open('https://wa.me/9355647906', '_blank'); // Opens WhatsApp chat in browser/app
    },
  },
];

export default function SpeedDiall() {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 1300,
      }}
    >
      <SpeedDial
        ariaLabel="Contact SpeedDial"
        icon={<SpeedDialIcon />}
        sx={{
          '& .MuiFab-primary': {
            backgroundColor: '#4d0707',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#5e35b1',
            },
          },
        }}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
