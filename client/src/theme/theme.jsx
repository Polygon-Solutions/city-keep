import { createTheme } from '@mui/material/styles';

import LinkBehavior from './LinkBehaviour';

/** 
 * *
 * Theme File
 * @description 
    - Used to configure custom default theme properties
    - Configures a pre-theme object and then a theme 
      object, which is exported to the ThemeProvider 
      ContextAPI component.
 */

/** 
 * *
 * Pre-Theme
 * @description 
    - Used to configure theme variables that are used by other theme variables.
    - For example, using custom color properties in style overrides
    - Refer to: https://mui.com/material-ui/customization/theming/
 * @example color: preTheme.palette.error.main,
 * @listens createTheme() theme
 */
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
      fontFamily: 'Clarity City',
      fontSize: '40px',
      fontWeight: 400,
      color: '#474d5a',
    },
    h2: {
      fontFamily: 'Clarity City',
      fontSize: '30px',
      fontWeight: 300,
      color: '#37474f',
      padding: 0,
      marginBottom: '16px',
    },
    h3: {
      fontFamily: 'Clarity City',
      fontSize: '24px',
      fontWeight: 400,
      color: '#3a3a3a',
      marginBottom: '15px',
    },
    h4: {
      fontFamily: 'Clarity City',
      fontSize: '18px',
      fontWeight: 500,
      color: '#3a3a3a',
      marginTop: '16px',
      marginBottom: '8px',
    },
    body1: {
      fontFamily: 'Clarity City',
    },
    button: {
      fontFamily: 'Clarity City',
    },
    title: {
      fontFamily: 'Clarity City',
      fontSize: '20px',
      fontWeight: 500,
      color: '#ffffff',
      lineHeight: 1.6,
      margin: 0,
    },
    dev: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: '16px',
      fontWeight: 400,
      color: '#858f97',
      fontStyle: 'italic',
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

/** 
 * *
 * Theme
 * @description 
    - Uses preTheme to configure the theme variables based 
      on previously configured theme variables.
    - NOTE: Currently, the theme variables from the 
      preTheme are not being used (29-05-2023)
 * @param {Object} preTheme
 * @listens ThemeProvider (but imported into App.jsx)
 */
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
    MuiButton: {
      styleOverrides: {
        contained: {
          paddingBottom: '4px',
        },
        outlined: {
          paddingBottom: '2px',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          '&[type="password"]': {
            fontFamily:
              '"Roboto", "Helvetica", "Arial", sans-serif',
          }, // Smaller password dots
        },
      },
    },
  },
});

export default theme;
