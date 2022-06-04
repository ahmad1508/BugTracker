import React, { useContext, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { Typography, Grid, Button, TextField } from '@mui/material'
import Context from '../../Context'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios'



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



export default function NewProjectForms() {
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

    const { data: response  } = await axios.post('http://localhost:5000/project/create_project', project)

    setProjects([...projects, response.project])
    setProfile(response.user)
  }

  return (
    <Grid container sx={{ width: '100%' }} >
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