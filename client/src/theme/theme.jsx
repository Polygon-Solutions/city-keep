import { createTheme } from '@mui/material/styles';

import LinkBehavior from './LinkBehaviour';

const preTheme = createTheme({
  palette: {
    primary: {
      main: '#5ea170',
    },
    secondary: {
      main: '#ff9800',
      light: '#ffc947',
      dark: '#c66900',
      contrastText: '#fff',
    },
    error: {
      main: '#ef5350',
      contrastText: '#fff',
    },
    neutral: {
      main: '#e2ffe2',
    },
    construction: {
      main: '#00838f',
      light: '#4fb3bf',
      dark: '#005662',
      constrastText: '#fff',
    },
  },
  typography: {
    h1: {
      fontSize: '40px',
      color: '#3b3b3b',
    },
    h2: {
      fontSize: '30px',
      color: '#37474f',
      padding: '15px',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 450,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

const theme = createTheme(preTheme, {
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
    MuiSwitch: {
      defaultProps: {
        color: 'construction',
      },
      styleOverrides: {
        track: {
          backgroundColor: preTheme.palette.construction.dark,
          opacity: 0.6,
        },
      },
    },
  },
});

export default theme;
