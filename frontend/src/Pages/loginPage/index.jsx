import React from 'react'
import { Box, Typography,useTheme } from '@mui/material';
import Form from "./Form"

export default function LoginPage() {
  const theme=useTheme();
  return (
    <Box width="100%" 
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
    >
      <Box>
        <Typography 
                  fontWeight="bold" 
                  fontSize="32px" 
                  color="primary" 
                  >
                      Konnect.
          </Typography>
      </Box>
      <Box
        width="50%"
        p="2rem"
        m="2rem auto"
        borderRadius="2rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant='h5' sx={{marginBottom:"1.4rem"}}>
          Connect with a 'K'. &#128153;
        </Typography>
        <Form/>
      </Box>
    </Box>
  )
}
