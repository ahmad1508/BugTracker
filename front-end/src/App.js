import React, { useContext } from 'react'
import {
  Route,
  Routes,
  Navigate, useLocation
} from "react-router-dom";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Background from './components/Background'
import './App.css'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Context from "./Context";
//import DashList from './pages/DashList'
import Projects from './pages/Projects'

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
    },

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
        <Route path="/" element={oauth ? <Header ><Background><Projects /></Background></Header> : goHome} />
        <Route path="/Dashboard/:id/" element={oauth ? <Header ><Background><Dashboard /></Background></Header> : goHome} />
      </Routes>



    </ThemeProvider >
  );
}

export default App;
