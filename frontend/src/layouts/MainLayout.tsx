import React, { ReactNode } from 'react';
import { Box, Container, CssBaseline } from '@mui/material';
import Navbar from '../components/Navbar';

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, title }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <Navbar title={title} />
      <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
        {children}
      </Container>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) => theme.palette.grey[200],
        }}
      >
        <Container maxWidth="lg">
          <Box textAlign="center">
            © {new Date().getFullYear()} Sistema de Gestión Universitaria
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;