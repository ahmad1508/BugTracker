import React from 'react'
import { useTheme } from '@mui/material/styles'
import { Typography, Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import ProjectActions from './ProjectActions'

const useStyles = (theme) => ({
  accordion: {
    color: '#000000',
    width: '100%',
    borderRadius: "10px",
    height: "70px",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0px 20px'
  }
})

const ProjectList = ({ project }) => {
  const theme = useTheme()
  const styles = useStyles(theme)
  const id = project.projectId

  return (

    <Grid container sx={styles.accordion}>
      <Grid item xs={12} md={3} lg={3} sx={{ display: 'flex', alignItems: 'center' }}>
        <Link to={`/Dashboard/${project.projectId}`} style={{ textDecoration: 'none' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: `${theme.palette.secondary.main}` }}>{project.title}</Typography>
        </Link>
      </Grid>
      <Grid item xs={12} md={2} lg={2} sx={{ maxHeight: '60px', overflow: 'auto' }}>
        <Typography variant="caption">&lt; {project.status} /&gt;</Typography>
      </Grid>
      <Grid item xs={8} md={6} lg={6} sx={{ maxHeight: '60px', overflow: 'auto' }}>
        <Typography variant="caption" >{project.description}</Typography>
      </Grid>
      <Grid item xs={12} md={1} lg={1} sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
        <ProjectActions id={id} />
      </Grid>


    </Grid >
  )
}

export default ProjectList;