import React, { useContext, useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { Box, Grid, Typography, Paper, TextField } from '@mui/material'
import Context from '../Context'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
import AddIcon from '@mui/icons-material/Add';

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
  adding:{
    boxShadow: 2,
    p: 1,
    borderRadius: 2,
    textAlign: 'center',
    fontSize: '0.875rem',
    fontWeight: '700',
    width: '100%',
    border:"1px solid black"
  }

})



export default function Dashboard() {
  const theme = useTheme()
  const styles = useStyles(theme)
  const { oauth, setAuth, projects, setProjects } = useContext(Context)
  const location = useLocation()
  const current_project_id = useParams()
  const [todo, setToDo] = useState([])
  const [doing, setDoing] = useState([])
  const [done, setDone] = useState([])
  const [openTodo, setOpenTodo] = useState(false)
  const [openDoing, setOpenDoing] = useState(false)
  const [openDone, setOpenDone] = useState(false)

  const handleClickTodo = () => {
    setOpenTodo(true)
  }

  const handleClickDoing = () => {
    setOpenTodo(true)
  }

  const handleClickDone = () => {
    setOpenTodo(true)
  }

  useEffect(() => {
    const fetch_issues = async () => {
      const { data: issues } = await axios.post('http://localhost:5000/api/get_issues', current_project_id)
      setToDo(issues.Todo)
      setDoing(issues.Doing)
      setDone(issues.Done)
      console.log(issues)
    }
    fetch_issues()
  }, [oauth, projects])

  return (
    <Box>
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
                <Box
                  sx={styles.adding}
                >
                  <TextField></TextField>
                </Box>}

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
