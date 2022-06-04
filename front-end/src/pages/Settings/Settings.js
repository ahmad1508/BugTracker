import React from 'react'
import NavBar from '../../components/Container/NavBar'
import Participants from '../../components/Settings/Participants'
import { Box } from '@mui/material'

export default function Settings() {
    return (
        <Box>
            <NavBar />
            <Participants />
        </Box>
    )
}
