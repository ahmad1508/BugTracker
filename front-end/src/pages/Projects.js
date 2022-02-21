import React, { useContext, useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { Box, Typography, Divider, Paper, Container, Grid, Button, TextField } from '@mui/material'
import Context from '../Context'
import { Navigate, useLocation, Link } from 'react-router-dom'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios'
import ProjectActions from '../components/ProjectActions'

const useStyles = (theme) => ({
  container: {
    backgroundColor: "#fff",
    minHeight: '90vh',

    margin: '10px',
    padding: "10px",
    borderRadius: '10px',
    border: `1px solid ${theme.palette.primary.medium}`,
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50px'
  },
  title: {
    fontWeight: 700,

  },
  scrollable: {
    maxHeight: 200,
    overflow: 'auto',
    border: `1px solid ${theme.palette.primary.light}`,
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: theme.palette.grey[50]
  },
  accordion: {
    color: '#000000',
    width: '100%',
    borderRadius: "10px",
    height: "70px",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0px 20px'


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
  newButton: {
    bgcolor: "#00a152",
    '&:hover': {
      bgcolor: "#00a152"
    }
  },
  buttonSurround: {
    margin: "10px 0px",
    display: 'flex',
    justifyContent: 'flex-end',
    borderRadius: '10px'
  },
  formSurround: {
    margin: "10px 0px",
  }
})


export default function Projects() {
  const styles = useStyles(useTheme())
  const { oauth, setAuth, projects, setProjects, profile } = useContext(Context)



  return (
    <Box sx={styles.container}>
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
              <ArrowDropDownIcon />
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


const ProjectList = ({ project }) => {
  const theme = useTheme()
  const styles = useStyles(theme)
  const id = project.projectId

  return (

    <Grid container sx={styles.accordion}>

      <Grid item xs={12} md={3} lg={3} sx={{ display: 'flex', alignItems: 'center' }}>
        <Link to={`/Dashboard/${project.projectId}`} style={{ textDecoration: 'none' }}>
          <Typography variant="h6" sx={{ fontWeight: 600,color:`${theme.palette.secondary.main}` }}>{project.title}</Typography>
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


const AddProject = () => {
  const styles = useStyles(useTheme())
  const [open, setOpen] = useState(false)

  const handleClick = (e) => {
    e.preventDefault();
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }

  return (
    <Box>
      <Box sx={styles.buttonSurround}>
        <Button variant='contained' sx={styles.newButton} onClick={handleClick}>New Project</Button>
      </Box>
      {open && <Box style={styles.formSurround}>
        <NewProjectForms />
      </Box>}

    </Box>
  )
}

const NewProjectForms = ({ open }) => {
  const styles = useStyles(useTheme())
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState('Public')
  const [description, setDescription] = useState('')
  const { oauth, profile, setProjects, projects, setProfile } = useContext(Context)

  const handleTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleStatus = (e) => {
    setStatus(e.target.value)
  }

  const handleDescription = (e) => {
    setDescription(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setTitle('')
    setStatus('Public')
    setDescription('')
    
    const project = {
      title,
      status,
      description,
      owner: profile.googleId,
      participants: [profile.googleId]
    }
    //add code here
    
    const { data: res } = await axios.post('http://localhost:5000/api/project', project)
    setProjects([...projects, res])

    const {data:updated_user} = await axios.post('http://localhost:5000/api/getUser',{
      googleId:profile.googleId
    })

    setProfile(updated_user)

  }

  return (
    <Grid container sx={{ width: '100%' }} open={open}>
      <Grid item xs={12} md={12} lg={12}>
        <Typography variant="h6">Add New Project</Typography>
      </Grid>
      <Grid item xs={12} md={6} lg={6} sx={{ padding: '5px' }}>
        <TextField
          id="outlined-basic"
          label="Project Title"
          variant="outlined"
          type='text'
          value={title}
          onChange={handleTitle}
          sx={{ width: '100%' }} />
      </Grid>
      <Grid item xs={12} md={6} lg={6} sx={{ padding: '5px' }}>
        <FormControl sx={{ width: '100%' }}>
          <InputLabel id="Project Status">Status</InputLabel>
          <Select
            labelId="Project Status"
            id="demo-simple-select"
            value={status}
            label="Status"
            onChange={handleStatus}
          >
            <MenuItem value={'Private'}>Private</MenuItem>
            <MenuItem value={'Public'}>Public</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={12} lg={12} sx={{ padding: '5px' }}>
        <TextField
          id="outlined-basic"
          label="Project description"
          variant="outlined"
          type='text'
          onChange={handleDescription}
          value={description}
          multiline
          rows={2}
          sx={{ width: '100%' }} />
      </Grid>
      <Button
        variant='contained'
        sx={{ position: 'relative', margin: 'auto', marginBottom: "20px" }}
        onClick={handleSubmit}
      ><AddIcon />Add Project</Button>
    </Grid>
  )
}