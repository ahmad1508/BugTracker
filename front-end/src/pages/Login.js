import React, { useState, useContext } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import {
  Box,
  Typography,
  Divider,
  Button,
  TextField,
  Checkbox,
  InputAdornment,
  IconButton,
  InputLabel,
  OutlinedInput,
  FormControl,
  Container
} from '@mui/material'
import {
  VisibilityOff,
  Visibility
} from '@mui/icons-material/';
import { useTheme } from '@mui/material/styles';
import GoogleLogin from 'react-google-login'
import Context from '../Context'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';



const useStyles = (theme) => ({

  container: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '50px 0px',
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
  title2: {
    margin: "1rem 0rem 1rem 0rem",
    fontWeight: 500,
    textAlign: "center",
    width: "100%",
  },
  submit: {
    backgroundColor: theme.palette.secondary.main,
    marginTop: "20px",
    width: "100%",
  },
  otherAccount: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    marginBottom: "20px"
  }
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

          <Divider sx={{ width: '85%', marginBottom: '2rem' }} >
            <Box sx={styles.or}>Or</Box>
          </Divider>
          <Form />
          <Account />
        </Container>
      </Box>
  )
}
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Form() {
  const styles = useStyles(useTheme())
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showType, setShowType] = useState('password')

  const handleChangeFirstName = async (e) => {
    setFirstName(e.target.value)
  }
  const handleChangeLastName = async (e) => {
    setLastName(e.target.value)
  }
  const handleChangeEmail = async (e) => {
    setEmail(e.target.value)
  }
  const handleChangePassword = async (e) => {
    setPassword(e.target.value)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
  }

  const handleClickShowPassword = () => {
    if (showType === '') { setShowType('password') }
    if (showType === 'password') { setShowType('') }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  return (
    <Box>
      <Box sx={styles.title2}>
        <Typography variant="" >Sign up with email address</Typography>
      </Box>
      <form style={{ padding: "20px" }}>

        <TextField
          sx={{ width: '50%', paddingRight: '5px' }}
          onChange={(e) => handleChangeFirstName(e)}
          label="First Name"
          id="outlined-size-normal"
          value={firstName}
          placeholder="Enter your first name"
          required
        />
        <TextField
          sx={{ width: '50%', paddingLeft: '5px' }}
          onChange={(e) => handleChangeLastName(e)}
          label="Last Name"
          value={lastName}
          id="outlined-size-normal"
          placeholder="Enter your Last name"
          required
        />
        <TextField
          sx={{ width: '100%', marginTop: '15px' }}
          onChange={(e) => handleChangeEmail(e)}
          label="Email"
          value={email}
          id="outlined-size-normal"
          placeholder="Enter your Email"
          required
        />
        <FormControl sx={{ width: '100%', margin: '15px 0px 20px 0px' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>

          <OutlinedInput


            label="Password"
            id="outlined-adornment-password"
            type={showType ? 'password' : 'text'}
            value={password}
            onChange={(e) => handleChangePassword(e)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showType ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            required
          />
        </FormControl>

        <Checkbox {...label} defaultChecked /> Agree with terms and conditions
        <Button variant="contained" sx={styles.submit} onClick={handleSubmit}>
          Sign Up
        </Button>

      </form>

    </Box>
  )
}




function Account() {
  const styles = useStyles(useTheme())

  return (
    <Box sx={styles.otherAccount}>
      <Divider sx={{ width: '85%', marginBottom: '1rem' }} />
      <Link to="/sign-in" style={{ textDecoration: 'none', color: useTheme().palette.secondary.main }}>Already have an account ?</Link>
    </Box>
  )
}



export default Login



function Google() {
  const location = useLocation();
  const { cookies, oauth, setAuth,profile,setProfile } = useContext(Context)
  const [loginData, setLoginData] = useState(cookies)

  /* localStorage.getItem('loginData') ?
  JSON.parse(localStorage.getItem('loginData'))
  : null */
  const handleFailure = (result) => {
    alert(result)
  }
  const handleLogin = async (googleData) => {
    console.log(googleData)
    //verify the conformity of the tokenID received by sending to backend and using veridyIdToken
    const res = await fetch('http://localhost:5000/api/google-login', {
      method: 'POST',
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const data = await res.json()
    console.log(data)
    setLoginData(data)
    await setProfile(data)

    //localStorage.setItem('loginData', JSON.stringify(data))
    //set cookies and auth
    await setAuth(googleData.wc)

  }

  const handleLogout = () => {
    setAuth("")
    /* localStorage.removeItem('loginData'); */
    setLoginData(null)
  }
  return (
    <div>
      {loginData ? (
        <Navigate
          to={{
            pathname: "/",
            state: { from: location },
          }}
        />
      ) : (

        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Log in with google"
          onSuccess={handleLogin}
          onFailure={handleFailure}
          cookiePolicy={'single_host_origin'}
        ></GoogleLogin>

      )

      }
    </div>
  )
}
