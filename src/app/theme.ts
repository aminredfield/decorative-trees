import { createTheme } from '@mui/material/styles';

// Enhanced MUI theme with modern design tokens
const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#F7FAF7',
      paper: '#FFFFFF',
    },
    primary: {
      main: '#1F6B3B',
      dark: '#16502C',
      light: '#3E8B57',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#A8D5BA',
      dark: '#8BC4A6',
      light: '#C2E5CE',
      contrastText: '#0F1F14',
    },
    text: {
      primary: '#0F1F14',
      secondary: '#5A6B5E',
      disabled: '#A0ADA3',
    },
    divider: '#E3EDE3',
    warning: {
      main: '#C97A4A',
      light: '#D99873',
      dark: '#B86A3D',
    },
    success: {
      main: '#3E8B57',
      light: '#68A378',
      dark: '#2D6842',
    },
    error: {
      main: '#D32F2F',
      light: '#EF5350',
      dark: '#C62828',
    },
    info: {
      main: '#0288D1',
      light: '#03A9F4',
      dark: '#01579B',
    },
  },
  typography: {
    fontFamily: ['Montserrat', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'].join(','),
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      lineHeight: 1.15,
      letterSpacing: '-0.02em',
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
      '@media (max-width:600px)': {
        fontSize: '1.75rem',
      },
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.25,
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
      '@media (max-width:600px)': {
        fontSize: '1.25rem',
      },
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.35,
      '@media (max-width:600px)': {
        fontSize: '1.125rem',
      },
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
      '@media (max-width:600px)': {
        fontSize: '1rem',
      },
    },
    subtitle1: {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      letterSpacing: '0.00938em',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      letterSpacing: '0.01071em',
    },
    button: {
      fontSize: '0.9375rem',
      fontWeight: 600,
      lineHeight: 1.75,
      letterSpacing: '0.02857em',
      textTransform: 'none',
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.66,
      letterSpacing: '0.03333em',
    },
  },
  shape: {
    borderRadius: 16,
  },
  spacing: 8,
  shadows: [
    'none',
    '0px 2px 4px rgba(15, 31, 20, 0.04)',
    '0px 4px 8px rgba(15, 31, 20, 0.06)',
    '0px 8px 16px rgba(15, 31, 20, 0.08)',
    '0px 12px 24px rgba(15, 31, 20, 0.1)',
    '0px 16px 32px rgba(15, 31, 20, 0.12)',
    '0px 20px 40px rgba(15, 31, 20, 0.14)',
    '0px 2px 4px rgba(15, 31, 20, 0.04)',
    '0px 2px 4px rgba(15, 31, 20, 0.04)',
    '0px 2px 4px rgba(15, 31, 20, 0.04)',
    '0px 2px 4px rgba(15, 31, 20, 0.04)',
    '0px 2px 4px rgba(15, 31, 20, 0.04)',
    '0px 2px 4px rgba(15, 31, 20, 0.04)',
    '0px 2px 4px rgba(15, 31, 20, 0.04)',
    '0px 2px 4px rgba(15, 31, 20, 0.04)',
    '0px 2px 4px rgba(15, 31, 20, 0.04)',
    '0px 2px 4px rgba(15, 31, 20, 0.04)',
    '0px 2px 4px rgba(15, 31, 20, 0.04)',
    '0px 2px 4px rgba(15, 31, 20, 0.04)',
    '0px 2px 4px rgba(15, 31, 20, 0.04)',
    '0px 2px 4px rgba(15, 31, 20, 0.04)',
    '0px 2px 4px rgba(15, 31, 20, 0.04)',
    '0px 2px 4px rgba(15, 31, 20, 0.04)',
    '0px 2px 4px rgba(15, 31, 20, 0.04)',
    '0px 2px 4px rgba(15, 31, 20, 0.04)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        sizeLarge: {
          padding: '12px 32px',
          fontSize: '1rem',
        },
        sizeSmall: {
          padding: '6px 16px',
          fontSize: '0.8125rem',
        },
        contained: {
          '&:hover': {
            transform: 'translateY(-1px)',
            transition: 'transform 0.2s ease',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 2px 8px rgba(15, 31, 20, 0.06)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0px 8px 24px rgba(15, 31, 20, 0.12)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
        elevation1: {
          boxShadow: '0px 2px 4px rgba(15, 31, 20, 0.04)',
        },
        elevation2: {
          boxShadow: '0px 4px 8px rgba(15, 31, 20, 0.06)',
        },
        elevation3: {
          boxShadow: '0px 8px 16px rgba(15, 31, 20, 0.08)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
  },
});

export default theme;