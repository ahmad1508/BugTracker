import React, { useState, useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'


import { Box, Typography, Grid, Avatar } from '@mui/material'
import { useTheme } from '@mui/styles'


const useStyles = (theme) => ({
    container: {
        width: '100%',
        borderBottom: "2px solid white",
        borderRadius: '5px',
        color:"e0e0e0"
    },
    gridBox: {
        display: 'flex',
    },
    gridBoxLast: {
        display: 'flex',
    },
    gridItem: {
        padding: '5px 0px',
        width: "100%",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "clip",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default function IssueGroupHeader() {
    const id = useParams()
    const theme = useTheme()
    const styles = useStyles(theme)

    return (
        <Box sx={styles.container}>
            <Grid container>
                <Grid item md={6} lg={6} sx={styles.gridBox} >
                    <Box sx={styles.gridItem}>
                        
                    </Box>
                </Grid>
                <Grid item md={1} lg={1} sx={styles.gridBox}>
                    <Box sx={styles.gridItem}>
                        Respo
                    </Box>
                </Grid>
                <Grid item md={3} lg={3} sx={styles.gridBox}>
                    <Box sx={styles.gridItem}>
                        Status
                    </Box>
                </Grid>
                <Grid item md={2} lg={2} sx={styles.gridBoxLast}>
                    <Box sx={styles.gridItem}>
                        Creation date
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}