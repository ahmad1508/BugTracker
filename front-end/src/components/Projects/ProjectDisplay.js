import React, { useContext } from 'react'
import { useTheme } from '@mui/material/styles'
import { Box, Typography, Divider, Container } from '@mui/material'
import Context from '../../Context'
import SortActions from '../SortActions'

import ProjectList from './ProjectList'
import AddProject from './AddProject'

const useStyles = (theme) => ({

  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50px'
  },
  title: {
    fontWeight: 700,

  },

  projects: {
    borderRadius: '10px',
    border: `1px solid ${theme.palette.grey[300]}`
  },
  header: {
    padding: '15px',
    display: 'flex',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.grey[200]
  },

})
export default function ProjectDisplay() {
  const styles = useStyles(useTheme())
  const { projects } = useContext(Context)

  return (
    <Box>
      <Box sx={styles.titleContainer}>
        <Typography variant="h6" sx={styles.title}>Projects</Typography>
      </Box>
      <Divider />

      <Container maxWidth="md" >
        <Box>
          <AddProject />
        </Box>

        <Box sx={styles.projects}>

          <Box sx={styles.header}>
            <Box>
              <Typography>Number of projects</Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Typography>sort</Typography>
              <SortActions />
            </Box>
          </Box>
          <Divider sx={{ width: "100%" }} />
          {projects && projects.map((project) => (
            <Box>
              <ProjectList project={project} key={project.projectId} />

              {(projects.length - 1) !== projects.indexOf(project) && <Divider />}

            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
