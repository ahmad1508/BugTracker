import React, { useContext, useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { Box, Grid, Typography, Paper } from '@mui/material'
import Context from '../Context'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import axios from 'axios'


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
    justifyContent: 'center',
    marginBottom: "10px"
  },
  task: {
    boxShadow: 2,
    p: 1,
    borderRadius: 2,
    textAlign: 'center',
    fontSize: '0.875rem',
    fontWeight: '700',
    width: '100%'

  }
})


export default function Dashboard() {
  const styles = useStyles(useTheme())
  const { oauth, setAuth, projects, setProjects } = useContext(Context)
  const location = useLocation()
  const current_project_id = useParams()
  const [todo, setToDo] = useState([])
  const [doing, setDoing] = useState([])
  const [done, setDone] = useState([])




  useEffect(() => {
    const fetch_issues = async () => {
      const { data: issues } = await axios.post('http://localhost:5000/api/get_issues', current_project_id)
      setToDo(issues.Todo)
      setDoing(issues.Doing)
      setDone(issues.Done)

    }
    fetch_issues()
  }, [oauth, projects])

  return (
    <Box>
      <Grid container>
        <Grid item xs={12} md={4} lg={4}>
          <Paper elevation={6} sx={styles.column}>
            <Typography variant="body1" sx={styles.boxTitle}>To do</Typography>

            {todo.map((task) => (
              <Box
                sx={styles.task}
              >
                {task.title}
              </Box>
            ))}



          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Paper elevation={6} sx={styles.column}>
            <Typography variant="body1" sx={styles.boxTitle}>In Progress</Typography>
            {doing.map((task) => (
            <Box
              sx={styles.task}
            >
              {task.title}
            </Box>
            ))}




          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Paper elevation={6} sx={styles.column}>
            <Typography variant="body1" sx={styles.boxTitle}>Done</Typography>
            {done.map((task) => (
            <Box
              sx={styles.task}
            >
              {task.title}
            </Box>
            ))}



          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
