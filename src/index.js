import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { AppRouter } from './routes/AppRouter';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#7d5cc6',
    },
    secondary: {
      main: '#333333',
    },
    surface: {
      main: '#d2d2d2',
    },
    text: {
      primary: '#ffffff',
      secondary: '#464646',
      contrast: '#f3cf45',
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <AppRouter />
  </ThemeProvider>,
  document.getElementById('root'),
);
