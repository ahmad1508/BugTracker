import React, { useContext, useEffect, useState } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import Link from '@mui/material/Link'
import MuiDrawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SearchIcon from '@mui/icons-material/Search';
import InputUnstyled from '@mui/base/InputUnstyled';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import axios from 'axios'
import Context from './Context'

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  border: 'none',

  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  border: 'none',
  marginRight: '10px',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  /* ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`, 

    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }), */
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);




const useStyles = (theme) => ({
  logo: {
    display: 'flex',
    justifyContent: 'center'
  },
  bar: {
    width: "100%",
    position: "fixed",
    backgroundColor: "#fff",
    display: "flex",
  },
  marg: {
    ...theme.mixins.toolbar,
  },
  drawer: {
    position: "relative",
    marginLeft: "auto",

  },
  menuIcon: {
    marginLeft: "25px",
    borderRadius: "10px",
    width: "35px",
    height: "35px",
    backgroundColor: theme.palette.secondary.light,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: 'inherit'
    },
    marginRight: "15px"
  },
  info: {
    width: "100%",
    display: 'flex',
    justifyContent: 'right',
  },
  listItemSelected: {
    display: 'flex',
    borderRadius: '15px',
    margin: '3px 10px',
    background: theme.palette.secondary.light,
    '&:hover': {
      background: theme.palette.secondary.light
    }
  },
  listItem: {
    display: 'flex',
    borderRadius: '15px',
    margin: '3px 10px',
    '&:hover': {
      background: theme.palette.secondary.light
    }
  },
  label: {
    marginLeft: "10px",
    fontWeight: "700"
  },
  settings: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifContainer: {
    height: '35px',
    width: '35px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.palette.secondary.light,
    borderRadius: "10px",
    marginRight: '20px',
    cursor: 'pointer'
  },
  notifications: {
    color: theme.palette.secondary.main,
  },
  avatar: {
    bgcolor: theme.palette.secondary.main,
    width: '30px',
    height: '30px',
    fontSize: "0.9rem"
  }
})


export default function Header({ children }) {

  const theme = useTheme();
  const styles = useStyles(theme)
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = useState('')
  const { setCurrentProject } = useContext(Context)
  const navigate = useNavigate()

  const { oauth, setAuth, projects, setProjects, profile } = useContext(Context)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setSearch(e.target.value)
  }



  return (
    <Box>
      <Box sx={{ display: 'flex', position: 'relative' }}>
        <CssBaseline />
        <AppBar sx={styles.bar} elevation={0}>
          <Toolbar>
            <Link to="/" sx={{ cursor: 'pointer' }} onClick={(e) => {
              e.preventDefault()
              setCurrentProject(null)
              navigate('/')
            }}>
              <img src="/logo_app.png" alt="Logo" height='50px' />
            </Link>
            <IconButton
              aria-label="open drawer"
              onClick={open ? handleDrawerClose : handleDrawerOpen}
              edge="start"
              sx={styles.menuIcon}
            >
              <MenuIcon />
            </IconButton>
            <CustomInput aria-label="Demo input" placeholder="Search..." />

            <Box sx={styles.info}>
              <Box sx={styles.settings}>
                <Box button sx={styles.notifContainer}>
                  <NotificationsNoneIcon sx={styles.notifications} />
                </Box>
                <Control />
              </Box>
            </Box>
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open} >
          <DrawerHeader>

          </DrawerHeader>

          <List sx={{ marginRight: "10px" }}>

            {open ?
              <Typography sx={styles.label} variant="subtitle1" display="block" >
                Projects
              </Typography> :
              <Typography sx={styles.label} variant="subtitle1" display="block" >
                Projects
              </Typography>
            }

            {projects && projects.map(project => (
              <DrawerProject project={project} key={project.projectId} />
            ))}


          </List>

        </Drawer>

        <Box component="main" sx={{ flexGrow: 1 }}>
          <DrawerHeader />
          {children}
        </Box>
      </Box>
    </Box >
  )
}

const DrawerProject = ({ project }) => {
  const theme = useTheme();
  const styles = useStyles(theme)
  const navigate = useNavigate()
  const [pathname, setPathname] = useState('')
  const location = useLocation()
  useEffect(() => {
    setPathname(location.pathname)
  }, [location.pathname])


  return (
    <Link
      to={`/Dashboard/${project.projectId}`}
      style={{
        display: 'flex',
        textDecoration: 'none',
        color: `${theme.palette.secondary.main}`
      }}
      onClick={(e) => {
        e.preventDefault()
        navigate(`/Dashboard/${project.projectId}`)
      }}
    >
      <ListItem button sx={pathname === `/Dashboard/${project.projectId}` ? styles.listItemSelected : styles.listItem}>
        <ListItemIcon >
          <Avatar sx={styles.avatar}>{project.title[0].toUpperCase()}{project.title[1].toUpperCase()}</Avatar>
        </ListItemIcon>
        <Box sx={{ overflow: 'hidden' }}><ListItemText primary={`${project.title}`} /></Box>
      </ListItem>
    </Link>
  )
}

/*************************************
 *           Search Bar
 **************************************/
const blue = {
  100: '#DAECFF',
  200: '#80BFFF',
  400: '#3399FF',
  600: '#0072E5',
};

const grey = {
  50: '#F3F6F9',
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};

const StyledInputElement = styled('input')(
  ({ theme }) => `
      width: 320px;
      height:48px;

      font-size: 0.875rem;
      font-family: IBM Plex Sans, sans-serif;
      font-weight: 400;
      line-height: 1.5;
      color: ${theme.palette.grey[900]};
      background: ${theme.palette.grey[50]};
      border: 1px solid ${theme.palette.secondary.main};
      border-radius: 8px;
      padding: 12px 12px;

      &:hover {
        background: #fff;

      border: 2px solid ${theme.palette.secondary.main};
  }

      &:focus {
        outline: 3px solid ${theme.palette.secondary.light};
  }
      `,
);

const CustomInput = React.forwardRef(function CustomInput(props, ref) {
  const [search, setSearch] = useState('')

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  return (
    <InputUnstyled
      components={{ Input: StyledInputElement }} {...props}
      ref={ref}
      onChange={handleChange}

    ><SearchIcon /></InputUnstyled>

  );
});



/*************************************
 *           logout Button
 **************************************/

const logoutStyles = (theme) => ({
  info: {
    display: 'flex',
    borderRadius: "50px",
    backgroundColor: theme.palette.primary.light
  },
  logout: {
    height: "40px",
    width: "40px",
    background: 'none',
    position: 'relative',
    margin: 'auto',
    fontSize: '0.7rem',
    borderRadius: "50px",
    color: theme.palette.primary.main,
    '&:hover': {
      background: 'none',
      transform: 'scale(1.1)',
      transition: 'all 200ms ease-in-out;'
    }
  },
  photo: {
    position: 'relative',
    margin: 'auto',
    margin: "5px",
    '&:hover': {
      background: 'none',
      transform: 'scale(1.1)',
      transition: 'all 200ms ease-in-out',
      cursor: 'pointer'
    }
  }
})

const Control = () => {
  const styles = logoutStyles(useTheme())
  const { profile, cookies, setAuth } = useContext(Context)

  const handleLogout = () => {
    setAuth(null)
  }


  return (
    <Box sx={styles.info}>
      <Avatar sx={styles.photo} alt="Remy Sharp" src={profile.picture} />

      <Button sx={styles.logout} variant="contained" disableElevation onClick={handleLogout}><LogoutIcon /></Button>
    </Box>
  )
}