import React, { useContext, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { Box, Typography, Divider, Paper, Container, Grid, Button, TextField } from '@mui/material'
import Context from '../Context'
import './css/Projects.css'
import { Navigate, useLocation, Link } from 'react-router-dom'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';

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
  const { oauth, setAuth } = useContext(Context)
  const location = useLocation()
  console.log(oauth)





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
          <ProjectList id='123' />


        </Box>
      </Container>
    </Box>
  )
}


const ProjectList = ({ id }) => {
  const styles = useStyles(useTheme())

  return (
    <Link to={`/Dashboard/${id}`} style={{ textDecoration: 'none' }}>
      <Grid container sx={styles.accordion}>
        <Grid item xs={12} md={4} lg={4} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Project Title</Typography>
        </Grid>
        <Grid item xs={8} md={6} lg={6} sx={{ maxHeight: '60px', overflow: 'auto' }}>
          <Typography variant="caption" >Peoject description</Typography>
        </Grid>
        <Grid item xs={0} md={1} lg={1} sx={{ maxHeight: '60px', overflow: 'auto' }}>
        </Grid>
        <Grid item xs={12} md={1} lg={1} sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
          <MoreHorizIcon />
        </Grid>

      </Grid>
    </Link>
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
  const [desctiption, setDescription] = useState('')

  const handleTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleStatus = (e) => {
    setStatus(e.target.value)
  }

  const handleDescription = (e) => {
    setDescription(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setTitle('')
    setStatus('Public')
    setDescription('')
    //add code here

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
          value={desctiption}
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