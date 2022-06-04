import React from 'react'
import {
  Box,
  Typography,
  Container
} from '@mui/material'
import { useTheme } from '@mui/material/styles';

/* import Account from '../../components/Login/Account'
import Form from '../../components/Login/LoginForm' */
import Google from '../../components/Login/GoogleLogin';

const useStyles = (theme) => ({

  container: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    /* margin: '50px 0px', */
  },
  login: {
    backgroundColor: '#fff',
    width: '450px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '15px',
  },
  or: {
    padding: '0.3rem 4rem',
    border: '1px solid #F5F5F5',
    borderRadius: '13px',
    fontWeight: 600,
  },
  google: {
    backgroundColor: theme.palette.grey[50],
    border: "1px solid #EEEEEE",
    marginBottom: '2rem'
  },
  title: {
    margin: "1rem 0rem 1rem 0rem",
    color: theme.palette.secondary.dark,
    fontWeight: 600
  },
})


function Login() {
  const styles = useStyles(useTheme())

  return (
    <Box sx={styles.container}>
      <Container sx={styles.login}>
        <Box sx={{ margin: "1rem 0rem 1rem 0rem" }}>
          <img src="logo_app.png" alt="" />
        </Box>

        <Typography variant="h6" sx={styles.title}> Login with google</Typography>

        <Typography variant="" sx={{ marginBottom: "1rem", color: "#9E9E9E" }}>Enter yout credentials to continue</Typography>


        <Box variant="" sx={styles.google} >
          <Google />
          {/*  <img src="Google.svg" alt="google" height="20px" />
          <Typography variant="" sx={{ marginLeft: "15px" }}>Sign Up With Google</Typography> */}
        </Box>

        {/* <Divider sx={{ width: '85%', marginBottom: '2rem' }} >
          <Box sx={styles.or}>Or</Box>
        </Divider>
        <Form />
        <Account /> */}
      </Container>
    </Box>
  )
}

export default Login

