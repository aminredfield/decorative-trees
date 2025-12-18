import { createTheme } from '@mui/material/styles';

// Custom MUI theme based on the colour palette defined in the specification.
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
    },
    secondary: {
      main: '#A8D5BA',
    },
    text: {
      primary: '#0F1F14',
    },
    divider: '#E3EDE3',
    warning: {
      main: '#C97A4A',
    },
  },
  typography: {
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 16,
  },
});

export default theme;