"use client";
import { useState } from "react";
import axios from "axios";
import CodeEditor from "@/components/CodeEditor";
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Snackbar,
  Alert,
  CircularProgress,
  createTheme,
  ThemeProvider,
  GlobalStyles,
  Tooltip,
  Zoom,
  Link
} from "@mui/material";
import {
  Code as CodeIcon,
  AutoFixHigh as RefactorIcon,
  ContentCopy as CopyIcon,
  AutoAwesome as MagicIcon,
  Psychology as BrainIcon,
} from "@mui/icons-material";

// Custom scrollbar and animation styles
const globalStyles = (
  <GlobalStyles
    styles={{
      '@keyframes float': {
        '0%': {
          transform: 'translateY(0px)',
        },
        '50%': {
          transform: 'translateY(-10px)',
        },
        '100%': {
          transform: 'translateY(0px)',
        },
      },
      '@keyframes pulse': {
        '0%': {
          transform: 'scale(1)',
        },
        '50%': {
          transform: 'scale(1.05)',
        },
        '100%': {
          transform: 'scale(1)',
        },
      },
      '@keyframes gradientBorder': {
        '0%': {
          borderColor: '#BD93F9',
        },
        '50%': {
          borderColor: '#FF79C6',
        },
        '100%': {
          borderColor: '#BD93F9',
        },
      },
      '*::-webkit-scrollbar': {
        width: '8px',
        height: '8px',
      },
      '*::-webkit-scrollbar-track': {
        background: '#282A36',
      },
      '*::-webkit-scrollbar-thumb': {
        background: '#6272A4',
        borderRadius: '4px',
      },
      '*::-webkit-scrollbar-thumb:hover': {
        background: '#BD93F9',
      },
      'html, body': {
        margin: 0,
        padding: 0,
        overflowX: 'hidden',
      },
      '#root': {
        height: '100vh',
        overflowX: 'hidden',
      },
    }}
  />
);

// Enhanced Dracula theme
const draculaTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#BD93F9',
    },
    secondary: {
      main: '#50FA7B',
    },
    background: {
      default: '#282A36',
      paper: '#44475A',
    },
    text: {
      primary: '#F8F8F2',
      secondary: '#6272A4',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          background: 'linear-gradient(45deg, #BD93F9 30%, #FF79C6 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #FF79C6 30%, #BD93F9 90%)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#282A36',
          borderColor: '#6272A4',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 0 15px rgba(189, 147, 249, 0.3)',
          },
        },
      },
    },
  },
});

const App = () => {
  const [code, setCode] = useState("// Masukkan kode di sini...");
  const [refactoredCode, setRefactoredCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  const handleRefactor = async () => {
    setLoading(true);
    setIsThinking(true);
    setError("");
    try {
        const response = await fetch("/api/refactor", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ code }),
        });

        const data = await response.json();
        setRefactoredCode(data.refactoredCode);
    } catch (error) {
        console.error("Error:", error);
        setError("Gagal melakukan refactoring kode. Silakan coba lagi.");
    }
    setLoading(false);
    setTimeout(() => setIsThinking(false), 500);
};


  const handleCopyCode = () => {
    navigator.clipboard.writeText(refactoredCode);
    setShowCopySuccess(true);
  };

  return (
    <ThemeProvider theme={draculaTheme}>
      {globalStyles}
      <Box sx={{ 
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.default',
        background: 'linear-gradient(135deg, #282A36 0%, #44475A 100%)',
      }}>
        <Container 
          maxWidth={false} 
          sx={{ 
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            py: 2,
            px: { xs: 2, sm: 3 },
            overflowX: 'hidden',
          }}
        >
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
              color: 'primary.main',
              mb: 3,
              fontSize: { xs: '1.5rem', sm: '2rem' },
              animation: 'float 3s ease-in-out infinite',
            }}
          >
            <MagicIcon fontSize="large" sx={{ animation: 'pulse 2s ease-in-out infinite' }} />
            RefactoMate
            {isThinking && (
              <BrainIcon 
                sx={{ 
                  ml: 2,
                  color: '#FF79C6',
                  animation: 'pulse 1s ease-in-out infinite',
                }} 
              />
            )}
          </Typography>

          <Box sx={{ 
            display: 'flex', 
            gap: 3,
            flexDirection: { xs: 'column', md: 'row' },
            flex: 1,
            minHeight: 0,
          }}>
            {/* Input Section */}
            <Tooltip 
              title="Paste your code here" 
              placement="top" 
              TransitionComponent={Zoom}
              arrow
            >
              <Paper 
                variant="outlined" 
                sx={{ 
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  p: { xs: 2, sm: 3 },
                  borderRadius: 2,
                  borderWidth: 2,
                  animation: loading ? 'gradientBorder 2s ease-in-out infinite' : 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.01)',
                  },
                }}
              >
                <Typography 
                  variant="h6" 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1,
                    color: 'primary.main',
                    mb: 2,
                    fontSize: { xs: '1.1rem', sm: '1.25rem' },
                  }}
                >
                  <CodeIcon fontSize="small" />
                  Input Code
                </Typography>
                <Box sx={{ 
                  flex: 1,
                  minHeight: 0,
                  '& > div': {
                    height: '100%',
                  },
                }}>
                  <CodeEditor code={code} setCode={setCode} />
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleRefactor}
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : <RefactorIcon />}
                  sx={{ 
                    mt: 2,
                    height: 48,
                    fontSize: '1.1rem',
                    transform: 'translateY(10px)'
                  }}
                >
                  {loading ? "Refactoring..." : "Refactor"}
                </Button>
              </Paper>
            </Tooltip>

            {/* Output Section */}
            <Tooltip 
              title="Your refactored code will appear here" 
              placement="top" 
              TransitionComponent={Zoom}
              arrow
            >
              <Paper 
                variant="outlined" 
                sx={{ 
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  p: { xs: 2, sm: 3 },
                  borderRadius: 2,
                  borderWidth: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.01)',
                  },
                }}
              >
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1,
                      color: 'primary.main',
                      fontSize: { xs: '1.1rem', sm: '1.25rem' },
                    }}
                  >
                    <MagicIcon fontSize="small" />
                    Refactored Code
                  </Typography>
                  <Tooltip title="Copy to clipboard" placement="left" arrow>
                    <span>
                      <Button
                        size="small"
                        startIcon={<CopyIcon />}
                        onClick={handleCopyCode}
                        disabled={!refactoredCode}
                        sx={{ 
                          color: 'secondary.main',
                          borderColor: 'secondary.main',
                          '&:hover': {
                            borderColor: 'secondary.light',
                            transform: 'scale(1.05)',
                          }
                        }}
                        variant="outlined"
                      >
                        Copy
                      </Button>
                    </span>
                  </Tooltip>
                </Box>
                <Box sx={{ 
                  flex: 1,
                  minHeight: 0,
                  '& > div': {
                    height: '100%',
                  },
                }}>
                  <CodeEditor 
                    code={refactoredCode || "// ✨ Hasil Refactore Code Bakal Muncul Disini... ✨"} 
                    readOnly 
                  />
                </Box>
              </Paper>
            </Tooltip>
          </Box>
        </Container>

        <Box
          sx={{
            p: 2,
            textAlign: 'center',
            borderTop: '1px solid',
            borderColor: 'rgba(98, 114, 164, 0.2)',
            backgroundColor: 'background.paper',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontSize: '0.9rem',
              '& a': {
                color: 'primary.main',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              },
            }}
          >
            Crafted with ✨ by{' '}
            <Link
              href="https://github.com/HanNajib"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                background: 'linear-gradient(45deg, #BD93F9, #FF79C6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 500,
              }}
            >
              @HanNajib
            </Link>
          </Typography>
        </Box>

        <Snackbar 
          open={showCopySuccess} 
          autoHideDuration={3000} 
          onClose={() => setShowCopySuccess(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          TransitionComponent={Zoom}
        >
          <Alert 
            severity="success" 
            variant="filled"
            sx={{ 
              backgroundColor: 'secondary.main',
              color: 'background.default',
              animation: 'float 1s ease-in-out',
            }}
            icon={<MagicIcon />}
          >
            ✨ Kode berhasil disalin! ✨
          </Alert>
        </Snackbar>

        <Snackbar
          open={!!error}
          autoHideDuration={5000}
          onClose={() => setError("")}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          TransitionComponent={Zoom}
        >
          <Alert 
            severity="error" 
            variant="filled"
            sx={{ 
              backgroundColor: '#FF5555',
              animation: 'float 1s ease-in-out',
            }}
          >
            {error}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default App;