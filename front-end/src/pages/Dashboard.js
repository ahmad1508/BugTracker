import React, { useContext, useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { Box, Grid, Typography, Paper, Button, Link, TextField } from '@mui/material'
import Context from '../Context'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import AddIcon from '@mui/icons-material/Add';
import { useInput } from '@mui/base';
import { styled } from '@mui/system';

const useStyles = (theme) => ({
  column: {
    minHeight: "80vh",
    backgroundColor: theme.palette.grey[50],
    margin: "10px",
    borderRadius: '10px',
    padding: '20px'
  },
  boxTitle: {
    fontWeight: 600,
    display: 'flex',
  },
  todo: {
    boxShadow: 2,
    p: 1,
    marginBottom: '10px',
    borderRadius: 2,
    textAlign: 'center',
    fontSize: '0.875rem',
    fontWeight: '700',
    width: '100%',
    bgcolor: theme.palette.primary.medium
  },
  doing: {
    boxShadow: 2,
    p: 1,
    marginBottom: '10px',
    borderRadius: 2,
    textAlign: 'center',
    fontSize: '0.875rem',
    fontWeight: '700',
    width: '100%',
    bgcolor: theme.palette.secondary.medium
  },
  done: {
    boxShadow: 2,
    p: 1,
    marginBottom: '10px',
    borderRadius: 2,
    textAlign: 'center',
    fontSize: '0.875rem',
    fontWeight: '700',
    width: '100%',
    bgcolor: '#4caf50'
  },
  count: {
    border: "1px solid black",
    borderRadius: "50%",
    display: 'flex',
    justifyContent: 'center',
    alignitems: 'center',
    height: "25px",
    width: "25px",
    marginRight: "5px",
    bgcolor: theme.palette.primary.medium
  },
  add: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
  },
  adding: {
    boxShadow: 2,
    borderRadius: 2,
    fontSize: '0.8rem',
    fontWeight: '600',
    width: '100%',
    border: "1px solid black",
    height: '60px'
  },
  submitButton: {
    backgroundColor: '#4caf50',
    color: "#fff",
    borderRadius: '10px',
    width: '100%',
    marginBottom: '10px',
    '&:hover': {
      backgroundColor: '#4caf50',
    }
  },
  cancelButton: {
    backgroundColor: theme.palette.grey[200],
    border: '1px solid black',
    color: '#000',
    borderRadius: '10px',
    width: '100%',
    marginBottom: '10px'
  }

})


const StyledInputElement = styled('input')(
  ({ theme }) => `
  width: 100%;
  font-size: 0.875rem;
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  line-height: 1.5;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 8px;
  padding: 12px 12px;

  &:hover {
    background: ${theme.palette.mode === 'dark' ? null : grey[100]};
    border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:focus {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[100]};
  }
`,
);

const CustomInput = React.forwardRef(function CustomInput(props, ref) {
  const { getRootProps, getInputProps } = useInput(props, ref);

  return (
    <div {...getRootProps()}>
      <StyledInputElement {...props} {...getInputProps()} />
    </div>
  );
});




export default function Dashboard() {
  const theme = useTheme()
  const styles = useStyles(theme)
  const { oauth, profile, currentProject } = useContext(Context)
  const id = useParams()
  const navigate = useNavigate()
  const current_project_id = useParams()
  const [todo, setToDo] = useState([])
  const [doing, setDoing] = useState([])
  const [done, setDone] = useState([])
  const [openTodo, setOpenTodo] = useState(false)
  const [openDoing, setOpenDoing] = useState(false)
  const [openDone, setOpenDone] = useState(false)
  const [newTodo, setNewTodo] = useState('')
  const [newDoing, setNewDoing] = useState('')
  const [newDone, setNewDone] = useState('')

  const handleClickTodo = () => {
    openTodo ? setOpenTodo(false) : setOpenTodo(true)
  }

  const handleClickDoing = () => {
    openDoing ? setOpenDoing(false) : setOpenDoing(true)
  }

  const handleClickDone = () => {
    openDone ? setOpenDone(false) : setOpenDone(true)
  }


  useEffect(() => {
    const fetch_tasks = async () => {
      const { data: tasks } = await axios.post('http://localhost:5000/api/get_tasks', current_project_id)
      setToDo(tasks.todo)
      setDoing(tasks.doing)
      setDone(tasks.done)
    }
    fetch_tasks()
  }, [oauth, id, navigate])

  const handleAddTask = (e, type) => {
    type === 'todo' ? setNewTodo(e.target.value) : setNewTodo('')
    type === 'doing' ? setNewDoing(e.target.value) : setNewDoing('')
    type === 'done' ? setNewDone(e.target.value) : setNewDone('')
  }

  const handleSubmitTask = async (e, type) => {
    e.preventDefault()

    if (newTodo || newDone || newDoing) {
      let task = {}
      if (type === 'todo') task.title = newTodo;
      if (type === 'doing') task.title = newDoing;
      if (type === 'done') task.title = newDone;
      task.creator = 'ah420mad'
      //task.creator = profile.googleId
      task.projectId = currentProject.projectId
      task.status = type
      const { data: addedTask } = await axios.post('http://localhost:5000/api/create_task', task)


      if (type === 'todo') setToDo([...todo, addedTask])
      if (type === 'doing') setDoing([...doing, addedTask])
      if (type === 'done') setDone([...done, addedTask])

      setNewTodo('')
      setNewDoing('')
      setNewDone('')
    } else {
      alert('Please enter a title before submitting')
    }
  }

  return (
    <Box>
      <Box>
        <NavBar />
      </Box>
      <Grid container>
        <Grid item xs={12} md={4} lg={4}>
          <Paper elevation={6} sx={styles.column}>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: "10px" }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={styles.count}>{todo.length}</Box>
                <Typography variant="body1" sx={styles.boxTitle}>
                  To do
                </Typography>
              </Box>
              <Box sx={styles.add}>
                <AddIcon onClick={handleClickTodo} />
              </Box>

            </Box>
            {openTodo &&
              <Box>
                <CustomInput required sx={styles.adding} value={newTodo} onChange={(e) => handleAddTask(e, 'todo')} aria-label="Demo input" placeholder="Task Title..." />

                <Grid container>
                  <Grid item xs={12} md={6} lg={6} sx={{ padding: '5px' }}>
                    <Button sx={styles.submitButton} onClick={(e) => handleSubmitTask(e, 'todo')}>Add</Button>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6} sx={{ padding: '5px' }}>
                    <Button sx={styles.cancelButton}>Cancel</Button>
                  </Grid>
                </Grid>
              </Box>
            }

            {todo.map((task) => (
              <Box
                sx={styles.todo}
              >
                <Typography variant='subtitle1'><strong>{task.title}</strong></Typography>
                <Typography variant='caption'>Added by {task.creator}</Typography>
              </Box>
            ))}



          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Paper elevation={6} sx={styles.column}>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: "10px" }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={styles.count}>{doing.length}</Box>
                <Typography variant="body1" sx={styles.boxTitle}>
                  In Progress
                </Typography>
              </Box>
              <Box sx={styles.add}>
                <AddIcon onClick={handleClickDoing} />
              </Box>
            </Box>



            {openDoing &&
              <Box>
                <CustomInput sx={styles.adding} value={newDoing} onChange={(e) => handleAddTask(e, 'doing')} aria-label="Demo input" placeholder="Task Title..." />
                <Grid container>
                  <Grid item xs={12} md={6} lg={6} sx={{ padding: '5px' }}>
                    <Button sx={styles.submitButton} onClick={(e) => handleSubmitTask(e, 'doing')}>Add</Button>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6} sx={{ padding: '5px' }}>
                    <Button sx={styles.cancelButton}>Cancel</Button>
                  </Grid>
                </Grid>
              </Box>
            }



            {doing.map((task) => (
              <Box
                sx={styles.doing}
              >
                <Typography variant='subtitle1'><strong>{task.title}</strong></Typography>
                <Typography variant='caption'>Added by {task.creator}</Typography>
              </Box>
            ))}


          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Paper elevation={6} sx={styles.column}>


            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: "10px" }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={styles.count}>{done.length}</Box>
                <Typography variant="body1" sx={styles.boxTitle}>
                  Done
                </Typography>
              </Box>
              <Box sx={styles.add}>
                <AddIcon onClick={handleClickDone} />
              </Box>
            </Box>



            {openDone &&
              <Box>
                <CustomInput sx={styles.adding} value={newDone} onChange={(e) => handleAddTask(e, 'done')} aria-label="Demo input" placeholder="Task Title..." />
                <Grid container>
                  <Grid item xs={12} md={6} lg={6} sx={{ padding: '5px' }}>
                    <Button sx={styles.submitButton} onClick={(e) => handleSubmitTask(e, 'done')}>Add</Button>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6} sx={{ padding: '5px' }}>
                    <Button sx={styles.cancelButton}>Cancel</Button>
                  </Grid>
                </Grid>
              </Box>
            }


            {done.map((task) => (
              <Box
                sx={styles.done}
              >
                <Typography variant='subtitle1'><strong>{task.title}</strong></Typography>
                <Typography variant='caption'>Added by {task.creator}</Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box >
  )
}

const blue = {
  100: '#DAECFF',
  200: '#80BFFF',
  400: '#3399FF',
  600: '#0072E5',
};

const grey = {
  50: '#F3F6F9',
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};


const navStyles = (theme) => ({
  navBox: {
    display: 'flex',
    backgroundColor: '#fff',
    margin: "10px",
    borderRadius: '10px',

    padding: '15px 40px',
    boxShadow: 2
  },
  navigation: {
    display: 'flex',
    alignItems: 'center'
  },
  tabs: {
    marginLeft: '30px',
    textDecoration: 'none',
    color: "#000",
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.secondary.medium
    },
  },
  selectedWindow: {
    borderBottom: `2px solid ${theme.palette.secondary.medium}`,
    background: 'linear-gradient(to top, #EDE7F6 0%, #fff 40%)',
    padding: '0px 5px'
  },
  window: {
    borderBottom: `2px solid ${theme.palette.secondary.medium}`,
    background: 'linear-gradient(to top, #EDE7F6 0%, #fff 40%)',
    padding: '0px 5px'
  }

})

const NavBar = () => {
  const id = useParams()
  const theme = useTheme()
  const styles = navStyles(theme)
  const navigate = useNavigate()
  const { oauth, projects, setCurrentProject, currentProject } = useContext(Context)
  const proj = projects.find((project) => project.projectId === id.id)
  setCurrentProject(id.id)
  const location = useLocation()
  const regexDahsboard = /Dashboard/; const isDashboard = regexDahsboard.test(regexDahsboard)
  const regexIssues = /Dashboard/; const isIssues = regexIssues.test(regexIssues)
  const regexSettings = /Settings/; const isSettings = regexSettings.test(regexSettings)


  if (!proj) {
    return <div>Loading</div>
  }
  return (
    <Box sx={styles.navBox}>
      <Box>
        <Typography variant='h6'
          sx={{
            fontWeight: '600',
            borderRight: `3px solid ${theme.palette.grey[700]}`,
            paddingRight: "40px",

          }}>
          {proj && proj.title}
        </Typography>
      </Box>
      <Box sx={styles.navigation}>
        <Link
          to={`/Dashboard/${proj.projectId}`}
          sx={styles.tabs}
          onClick={(e) => {
            e.preventDefault()
            navigate(`/Dashboard/${proj.projectId}`)
          }}
        >
          <Typography
            variant='body1'
            sx={isDashboard ? styles.selectedWindow : styles.window}
          >Dashboard</Typography>
        </Link>
        <Link
          to={`/Dashboard/${proj.projectId}`}
          sx={styles.tabs}
          onClick={(e) => {
            e.preventDefault()
            navigate(`/Issues`)
          }}
        >
          <Typography variant='body1'>Issues</Typography>
        </Link>
        <Link
          to={`/Dashboard/${proj.projectId}`}
          sx={styles.tabs}
          onClick={(e) => {
            e.preventDefault()
            navigate(`/settings`)
          }}
        >
          <Typography variant='body1'>Settings</Typography>
        </Link>
      </Box>


    </Box>
  )
}