import React, { useState } from 'react'
import {
    Box,
    Typography,
    Button,
    TextField,
    Checkbox,
    InputAdornment,
    IconButton,
    InputLabel,
    OutlinedInput,
    FormControl,

} from '@mui/material'
import {
    VisibilityOff,
    Visibility
} from '@mui/icons-material/';
import { useTheme } from '@mui/material/styles';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const useStyles = (theme) => ({

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
    /* otherAccount: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: "100%",
      marginBottom: "20px"
    } */
})


export default function Form() {
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