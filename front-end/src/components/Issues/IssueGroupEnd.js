import React, { useState, useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'


import { Box, Typography, Grid, Avatar, Fade, Backdrop } from '@mui/material'
import { useTheme } from '@mui/styles'
import AddIssueForm from './AddIssueForm';
import { Add } from '@mui/icons-material';
import IssueContext from '../../IssueContext';

import axios from 'axios'
import { TextField, Button } from '@mui/material'
import Context from '../../Context'



const useStyles = (theme) => ({
    container: {
        width: '100%',
        backgroundColor: '#e0e0e0',
        borderBottom: "1px solid white",
        borderRadius: '5px',
        cursor: 'pointer'
    },
    gridItemFirst: {
        padding: '5px 0px',
        width: "100%",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "clip",
        display: 'flex',
        alignItems: 'center',
        paddingLeft: "30px"
    },

})

export default function IssueModel({ group }) {
    const id = useParams()
    const theme = useTheme()
    const styles = useStyles(theme)
    const { issues, setIssues, open, setOpen } = useContext(IssueContext)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleClick = (e) => {
        e.preventDefault();
        console.log(document.getElementById("section")[0])

    }
    return (
        <Box sx={styles.container} >
            <Grid container onClick={handleClick}>
                <Grid item md={12} lg={12}>
                    <Box sx={styles.gridItemFirst}>
                        <AddIssueForm groupId={group.groupId} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}