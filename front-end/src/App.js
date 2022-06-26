import React, { useContext } from 'react'
import {
  Route,
  Routes,
  Navigate, useLocation
} from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import Issues from './pages/Issues/Issues'
import Settings from './pages/Settings/Settings'

import Context from "./Context";
//import DashList from './pages/DashList'
import Projects from './pages/Projects/Projects'

import Header from './Header'
import Footer from './Footer'


const theme = createTheme({

  palette: {
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
      main: '#00C853',
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
    },
    orange: {
      50: '#fff3e0',
      100: '#ffe0b2',
      200: '#ffcc80',
      300: '#ffb74d',
      400: '#ffa726',
      500: '#ff9800',
      600: '#fb8c00',
      700: '#f57c00',
      800: '#ef6c00',
      900: '#e65100',
    },
    green: {
      500: '#4caf50'
    }

  },
});
const background = createTheme({
  palette: {
    background: {
      default: "#E3F2FD",
    }
  }
})

function App() {
  const { oauth, setAuth, projects, setProjects, profile } = useContext(Context)
  const location = useLocation()




  const goHome = (
    <Navigate
      to={{
        pathname: "/Login",
        state: { from: location },
      }}
    />
  )
  const goDash = (
    <Navigate
      to={{
        pathname: "/",
        state: { from: location },
      }}
    />
  )
  return (
    <ThemeProvider theme={oauth ? theme : background}>
      <CssBaseline />
      <Routes>
        <Route path="/Login" element={oauth ? goDash : <Login />} />
        <Route path="/" element={oauth ? <Header ><Projects /></Header> : goHome} />
        <Route path="/Dashboard/:id/" element={oauth ? <Header ><Dashboard /></Header> : goHome} />
        <Route path="/Issues/:id/" element={oauth ? <Header ><Issues /></Header> : goHome} />
        <Route path="/Settings/:id/" element={oauth ? <Header ><Settings /></Header> : goHome} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
