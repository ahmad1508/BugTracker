import React, { useContext } from 'react'
import { useTheme } from '@mui/material/styles'
import { Box } from '@mui/material'
import Context from '../Context'
import { Navigate, useLocation } from 'react-router-dom'


const useStyles = (theme) => ({

})


export default function Dashboard() {
    const styles = useStyles(useTheme())
    const { oauth, setAuth } = useContext(Context)
    const location = useLocation()
    console.log(oauth)




    return (
        <Box >
            DashList
        </Box>
    )
}