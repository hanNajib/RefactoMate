"use client";
import Link from 'next/link';
import { Box, Typography, Button, Container } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const draculaTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#BD93F9' },
    background: { default: '#282A36' },
    text: { primary: '#F8F8F2' },
  },
});

export default function NotFound() {
  return (
    <ThemeProvider theme={draculaTheme}>
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #282A36 0%, #44475A 100%)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            width: '200%',
            height: '200%',
            background: 'repeating-linear-gradient(45deg, #44475A 0%, #44475A 10%, transparent 10%, transparent 20%)',
            opacity: 0.1,
            animation: 'slide 20s linear infinite',
          },
          '@keyframes slide': {
            '0%': { transform: 'translateX(-50%) translateY(-50%)' },
            '100%': { transform: 'translateX(0%) translateY(0%)' },
          }
        }}
      >
        <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '8rem', sm: '15rem' }, // Responsive font size
              fontWeight: 900,
              textAlign: 'center',
              background: 'linear-gradient(45deg, #BD93F9, #FF79C6)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 30px rgba(189, 147, 249, 0.3)',
              animation: 'float 4s ease-in-out infinite',
              '@keyframes float': {
                '0%, 100%': { transform: 'translateY(0)' },
                '50%': { transform: 'translateY(-20px)' },
              }
            }}
          >
            404
          </Typography>
          <Typography
            variant="h4"
            sx={{
              textAlign: 'center',
              mb: 4,
              color: '#FF79C6',
              textShadow: '0 0 10px rgba(255, 121, 198, 0.5)',
            }}
          >
            Lost in the void?
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            <Link href="/" passHref style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                startIcon={<HomeIcon />}
                sx={{
                  background: 'linear-gradient(45deg, #BD93F9 30%, #FF79C6 90%)',
                  borderRadius: '25px',
                  padding: '12px 35px',
                  fontSize: '1.2rem',
                  boxShadow: '0 3px 15px rgba(189, 147, 249, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-3px) scale(1.05)',
                    boxShadow: '0 5px 25px rgba(189, 147, 249, 0.5)',
                    background: 'linear-gradient(45deg, #FF79C6 30%, #BD93F9 90%)',
                  }
                }}
              >
                Take Me Home
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
