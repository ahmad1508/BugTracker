import React from "react";
import {Container} from '@mui/material'

const Login = ()=>{
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
        <Container>
            {}
        </Container>
    )
}

export default Login;