import React from 'react'
import { useTheme } from '@mui/material/styles'
import { Box } from '@mui/material'

const useStyles = (theme) => ({
    container: {
        backgroundColor: theme.palette.primary.light,
        position: 'relative',
        minHeight: '90vh',
        margin: '10px 15px 0px 0px',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        padding: "10px",
        borderRadius: '15px',
        boxShadow: `0px 1px 2px ${theme.palette.primary.medium} inset`
    }
})


export default function Dashboard({ children }) {
    const styles = useStyles(useTheme())

    return (
        <Box className='dashboard' sx={styles.container}>
            {children}
        </Box>
    )
}