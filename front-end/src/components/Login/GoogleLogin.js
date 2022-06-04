import React, { useState, useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import GoogleLogin from 'react-google-login'
import Context from '../../Context'
import axios from "axios"

export default function Google() {
  const location = useLocation();
  const { cookies, setAuth, setProfile, setProjects } = useContext(Context)
  const [loginData, setLoginData] = useState(cookies)

  const handleFailure = (result) => {
    alert(result)
  }
  const handleLogin = async (googleData) => {
    //verify the conformity of the tokenID received by sending to backend and using veridyIdToken
    const res = await fetch('http://localhost:5000/login/google-login', {
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
    /*set the profile*/
    setProfile(data)

    /*get the users projects*/
    let { data: all_projects } = await axios.post('http://localhost:5000/project/get_projects',
      {
        projectsId: data.projects
      }
    )

    setProjects(all_projects)
    console.log(googleData.xc)
    /*set the oauth variable*/
    await setAuth(googleData.xc)

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

      )}
    </div>
  )
}