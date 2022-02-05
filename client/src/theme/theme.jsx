import { createTheme } from '@mui/material/styles';

import LinkBehavior from './LinkBehaviour';

const preTheme = createTheme({
  palette: {
    primary: {
      main: '#5ea170',
    },
    secondary: {
      main: '#ff9800',
      contrastText: '#fff',
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
      color: '#37474f',
      padding: '15px',
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
    },
  },
});

export default theme;
