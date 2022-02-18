import React, { useContext } from 'react'
import { useTheme } from '@mui/material/styles'
import { Box, Grid, Typography } from '@mui/material'
import Context from '../Context'
import { Navigate, useLocation } from 'react-router-dom'


const useStyles = (theme) => ({
  column: {
    minHeight: "80vh",
    backgroundColor: theme.palette.grey[50],
    margin: "10px",
    borderRadius: '10px',
    padding:'20px'
  },
  boxTitle: {
    fontWeight: 600,
    display: 'flex',
    justifyContent: 'center',
    marginBottom:"10px"
  },
  task: {
    boxShadow: 3,
 
    p: 1,
    borderRadius: 2,
    textAlign: 'center',
    fontSize: '0.875rem',
    fontWeight: '700',
    width:'100%'

  }
})


export default function Dashboard() {
  const styles = useStyles(useTheme())
  const { oauth, setAuth } = useContext(Context)
  const location = useLocation()
  console.log(oauth)




  return (
    <Box>
      <Grid container>
        <Grid item xs={12} md={4} lg={4}>
          <Box sx={styles.column}>
            <Typography variant="body1" sx={styles.boxTitle}>To do</Typography>
            <Box
              sx={styles.task}
            >
              boxShadow: 0
            </Box>


          </Box>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Box sx={styles.column}>
            <Typography variant="body1" sx={styles.boxTitle}>In Progress</Typography>
            <Box
              sx={styles.task}
            >
              boxShadow: 0
            </Box>




          </Box>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Box sx={styles.column}>
            <Typography variant="body1" sx={styles.boxTitle}>Done</Typography>
            <Box
              sx={styles.task}
            >
              boxShadow: 0
            </Box>



          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
