import {
  Route,
  Routes,
} from "react-router-dom";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Login from './pages/Login'


const theme = createTheme({
  palette: {
    background: {
      default: '#E3F2FD'
    },
    primary: {
      main: '#2196F3',
      light: '#E3F2FD',
      medium: '#90CAF9',
      dark: '#1E88E5',
      darkest: '#1565C0'
    },
    secondary: {
      main: '#673AB7',
      light: '#EDE7F6',
      medium: '#B39DDB',
      dark: '#5E35B1',
      darkest: '#4527A0'
    },
    success: {
      main: '#69F0AE',
      light: '#B9F6CA',
      medium: '#69F0AE',
      dark: '#00C853',
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      900: '#212121',
    }
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
