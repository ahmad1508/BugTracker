import React from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Divider,

} from '@mui/material'
import { useTheme } from '@mui/material/styles';

const useStyles = (theme) => ({
  otherAccount: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    marginBottom: "20px"
  }
})

export default function Account() {
  const styles = useStyles(useTheme())

  return (
    <Box sx={styles.otherAccount}>
      <Divider sx={{ width: '85%', marginBottom: '1rem' }} />
      <Link to="/sign-in" style={{ textDecoration: 'none', color: useTheme().palette.secondary.main }}>Already have an account ?</Link>
    </Box>
  )
}