import React from 'react'
import NavBar from '../../components/Container/NavBar'
import IssuesList from '../../components/Issues/IssuesList'
import { Box } from '@mui/material'

export default function Settings() {

    return (
        <Box >
            <NavBar />
            <IssuesList />
        </Box>
    )
}