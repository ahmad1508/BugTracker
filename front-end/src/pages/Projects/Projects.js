import React from 'react'
import { useTheme } from '@mui/material/styles'
import { Box } from '@mui/material'

import ProjectDisplay from '../../components/Projects/ProjectDisplay'

const useStyles = (theme) => ({
  container: {
    backgroundColor: "#fff",
    minHeight: '90vh',
    margin: '10px',
    padding: "10px",
    borderRadius: '10px',
    border: `1px solid ${theme.palette.primary.medium}`,
  },
})


export default function Projects() {
  const styles = useStyles(useTheme())

  return (
    <Box sx={styles.container}>
      <ProjectDisplay />
    </Box>
  )
}