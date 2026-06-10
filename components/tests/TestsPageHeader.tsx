"use client";

import { signOut } from 'next-auth/react';

import {Box, Typography, Button} from '@mui/material';
import { FaSignOutAlt } from 'react-icons/fa';

export default function TestsPageHeader(){

    return (
      <Box
        sx={{
          position: "relative",
          mb: 8,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: 20, sm: 40, md: 60 },
            fontWeight: 800,
            color: "#2d3748",
            textAlign: "center",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
        >
          Available Tests
        </Typography>

        <Button
          onClick={() => signOut()}
          sx={{
            position: "absolute",
            right: { md: 60, sm: 50, xs: 0 },
            top: "50%",
            transform: "translateY(-50%)",
            minWidth: 0,
            p: 0,
            fontSize: { xs: 20, sm: 30, md: 40 },
          }}
        >
          <FaSignOutAlt color="#F54927" />
        </Button>
      </Box>
    );
}