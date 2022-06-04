import React, { useContext, useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { Box, Grid, Typography, Paper, Button, Avatar, TextField } from '@mui/material'
import Context from '../../Context'
import TaskContext from '../../TaskContext'
import { resolvePath, useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import AddIcon from '@mui/icons-material/Add';
import { useInput } from '@mui/base';
import { styled } from '@mui/system';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TaskActions from '../../components/Task/TaskActions'
import OneMoveLeft from '../../components/TaskStatus/OneMoveLeft'
import OneMoveRight from '../../components/TaskStatus/OneMoveRight'
import TwoMoveLeft from '../../components/TaskStatus/TwoMoveLeft'
import TwoMoveRight from '../../components/TaskStatus/TwoMoveRight'
import NavBar from '../../components/Container/NavBar'

const useStyles = (theme) => ({
  column: {
    minHeight: "80vh",
    backgroundColor: theme.palette.grey[50],
    margin: "10px",
    borderRadius: '10px',
    padding: '20px'
  },
  boxTitle: {
    display: 'flex',
  },
  BoxContainer: {
    marginBottom: '10px',
    borderRadius: '7px',
    fontSize: '0.875rem',
    fontWeight: '700',
    width: '100%',
  },
  todoGridContainer: {
    p: 1.5,
    bgcolor: theme.palette.primary.medium,
    boxShadow: 2,
    borderRadius: '7px',
  },
  todoGridContainerImportant: {
    p: 1.5,
    bgcolor: theme.palette.primary.medium,
    boxShadow: 2,
    borderBottomLeftRadius: '7px',
    borderBottomRightRadius: '7px',
  },
  todoEdit: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  doingGridContainer: {
    p: 1.5,
    bgcolor: theme.palette.secondary.medium,
    boxShadow: 2,
    borderRadius: '7px',
  },
  doingGridContainerImportant: {
    p: 1.5,
    bgcolor: theme.palette.secondary.medium,
    boxShadow: 2,
    borderBottomLeftRadius: '7px',
    borderBottomRightRadius: '7px',
  },
  doingEdit: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  doneGridContainer: {
    p: 1.5,
    bgcolor: theme.palette.green[500],
    boxShadow: 2,
    borderRadius: '7px',
  },
  doneGridContainerImportant: {
    p: 1.5,
    bgcolor: theme.palette.green[500],
    boxShadow: 2,
    borderBottomLeftRadius: '7px',
    borderBottomRightRadius: '7px',
  },
  doneEdit: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  normalTask: {

  },
  importantTask: {
    position: 'relative',
    borderTopLeftRadius: '7px',
    borderTopRightRadius: '7px',
    top: 0,
    left: 0,
    right: 0,
    height: '5px',
    width: '100%',
    bgcolor: theme.palette.orange[700]
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
  },

})


const StyledInputElement = styled('textarea')(
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
  const { oauth, profile, currentProject, setCurrentPaticipants } = useContext(Context)
  const id = useParams()
  const navigate = useNavigate()
  const current_project_id = useParams()
  const {
    todo, doing, done, setToDo, setDoing, setDone,
    openTodo, openDoing, openDone, setOpenTodo, setOpenDoing, setOpenDone,
    newTodo, newDoing, newDone, setNewTodo, setNewDoing, setNewDone,
    editTodo, editDoing, editDone, setEditTodo, setEditDoing, setEditDone,
    openEditTodo, openEditDoing, openEditDone, setOpenEditTodo, setOpenEditDoing, setOpenEditDone,
    editedTodoID, editedDoingID, editedDoneID, setEditTodoID, setEditDoingID, setEditDoneID,
    sortType, setSortType
  } = useContext(TaskContext)



  const handleClickTodo = () => {
    openTodo ? setOpenTodo(false) : setOpenTodo(true); setOpenEditTodo(false)
  }

  const handleClickDoing = () => {
    openDoing ? setOpenDoing(false) : setOpenDoing(true); setOpenEditDoing(false)
  }

  const handleClickDone = () => {
    openDone ? setOpenDone(false) : setOpenDone(true); setOpenEditDone(false)
  }


  useEffect(() => {
    const fetch_tasks = async () => {
      const { data: tasks } = await axios.post('http://localhost:5000/task/get_tasks', current_project_id)
      switch (sortType) {
        case 'time':
          setToDo(tasks.todo.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : ((b.createdAt < a.createdAt) ? -1 : 0)))
          setDoing(tasks.doing.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : ((b.createdAt < a.createdAt) ? -1 : 0)))
          setDone(tasks.done.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : ((b.createdAt < a.createdAt) ? -1 : 0)))
          break;
        case 'none':
          setToDo(tasks.todo)
          setDoing(tasks.doing)
          setDone(tasks.done)
          break;
        default:
          break;
      }

      console.log(tasks)
    }
    fetch_tasks()
  }, [oauth, id])

  const handleAddTask = (e, type, action) => {
    if (action === 'add') {
      type === 'todo' ? setNewTodo(e.target.value) : setNewTodo('')
      type === 'doing' ? setNewDoing(e.target.value) : setNewDoing('')
      type === 'done' ? setNewDone(e.target.value) : setNewDone('')
    }
    if (action === 'edit') {
      type === 'todo' ? setEditTodo(e.target.value) : setEditTodo('')
      type === 'doing' ? setEditDoing(e.target.value) : setEditDoing('')
      type === 'done' ? setEditDone(e.target.value) : setEditDone('')
    }
  }

  const handleSubmitTask = async (e, type, action) => {
    e.preventDefault()

    if (newTodo || newDone || newDoing && action === 'add') {
      let task = {}
      if (type === 'todo') task.title = newTodo;
      if (type === 'doing') task.title = newDoing;
      if (type === 'done') task.title = newDone;
      task.creator = 'ah420mad'
      //task.creator = profile.googleId
      task.projectId = currentProject.projectId
      task.status = type
      task.creatorPicture = profile.picture
      const { data: addedTask } = await axios.post('http://localhost:5000/task/create_task', task)

      if (type === 'todo') setToDo([...todo, addedTask])
      if (type === 'doing') setDoing([...doing, addedTask])
      if (type === 'done') setDone([...done, addedTask])

      setNewTodo('')
      setNewDoing('')
      setNewDone('')
    } else if (editTodo || editDone || editDoing && action === 'edit') {
      let task = {}
      if (type === 'todo') { task.title = editTodo; task.taskId = editedTodoID }
      if (type === 'doing') { task.title = editDoing; task.taskId = editedDoingID }
      if (type === 'done') { task.title = editDone; task.taskId = editedDoneID }

      const { data: editedTask } = await axios.post('http://localhost:5000/task/edit_task', task)
      if (type === 'todo') {
        const tasks = todo.filter(taskItem => taskItem.taskId !== editedTodoID)
        setToDo([...tasks, editedTask])
      }
      if (type === 'doing') {
        const tasks = doing.filter(taskItem => taskItem.taskId !== editedDoingID)
        setDoing([...tasks, editedTask])
      }
      if (type === 'done') {
        const tasks = done.filter(taskItem => taskItem.taskId !== editedDoneID)
        setDone([...tasks, editedTask])
      }
      setEditTodo(''); setOpenEditTodo(false)
      setEditDoing(''); setOpenEditDoing(false)
      setEditDone(''); setOpenEditDone(false)
    } else {
      alert('Please enter a title before submitting')
    }
  }




  const moveToDo = async (from, move, taskId) => {
    const { data: response } = await axios.post('http://localhost:5000/task/move_task', {
      taskId,
      status: move
    })
    setToDo([...todo, response])
    if (from === 'doing') setDoing(doing.filter(task => task.taskId !== taskId))
    if (from === 'done') setDone(done.filter(task => task.taskId !== taskId))
  }

  const moveToDoing = async (from, move, taskId) => {
    const { data: response } = await axios.post('http://localhost:5000/task/move_task', {
      taskId,
      status: move
    })
    setDoing([...doing, response])
    if (from === 'todo') setToDo(todo.filter(task => task.taskId !== taskId))
    if (from === 'done') setDone(done.filter(task => task.taskId !== taskId))
  }

  const moveToDone = async (from, move, taskId) => {
    const { data: response } = await axios.post('http://localhost:5000/task/move_task', {
      taskId,
      status: move
    })
    setDone([...done, response])
    if (from === 'todo') setToDo(todo.filter(task => task.taskId !== taskId))
    if (from === 'doing') setDoing(doing.filter(task => task.taskId !== taskId))
  }

  const handleSubmit = (from, move, taskId) => {
    if (move === 'todo') moveToDo(from, move, taskId)
    if (move === 'doing') moveToDoing(from, move, taskId)
    if (move === 'done') moveToDone(from, move, taskId)

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
                <CustomInput required sx={styles.adding} value={newTodo} onChange={(e) => handleAddTask(e, 'todo', 'add')} onKeyPress={(ev) => {
                  if (ev.key === "Enter" && !ev.shiftKey) {
                    handleSubmitTask(ev, 'todo', 'add')
                  }
                }}
                  aria-label="Demo input" placeholder="Task Title..."
                />

                <Grid container>
                  <Grid item xs={12} md={6} lg={6} sx={{ padding: '5px' }}>
                    <Button sx={styles.submitButton} onClick={(e) => handleSubmitTask(e, 'todo', 'add')}>Add</Button>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6} sx={{ padding: '5px' }}>
                    <Button sx={styles.cancelButton} onClick={() => setOpenTodo(false)}>Cancel</Button>
                  </Grid>
                </Grid>
              </Box>
            }
            {openEditTodo &&
              <Box>
                <CustomInput required sx={styles.adding} value={editTodo} onChange={(e) => handleAddTask(e, 'todo', 'edit')} onKeyPress={(ev) => {
                  if (ev.key === "Enter" && !ev.shiftKey) {
                    handleSubmitTask(ev, 'todo', 'edit')
                  }
                }}
                  aria-label="Demo input" placeholder="Task Title..." />

                <Grid container>
                  <Grid item xs={12} md={6} lg={6} sx={{ padding: '5px' }}>
                    <Button sx={styles.submitButton} onClick={(e) => handleSubmitTask(e, 'todo', 'edit')}>Edit</Button>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6} sx={{ padding: '5px' }}>
                    <Button sx={styles.cancelButton} onClick={() => setOpenEditTodo(false)}>Cancel</Button>
                  </Grid>
                </Grid>
              </Box>
            }
            <Box sx={{
              maxHeight: '70vh',
              overflowY: 'auto',
            }}>
              {todo.map((task) => (
                <Box sx={styles.BoxContainer}>
                  <Box sx={task.priority === 'important' ? styles.importantTask : styles.normalTask}>
                  </Box>
                  <Grid container sx={task.priority === 'important' ? styles.todoGridContainerImportant : styles.todoGridContainer}>
                    <Grid item xs={10} md={10} lg={10} sx={styles.todoInfo}>
                      <Typography variant='subtitle2' sx={{ whiteSpace: 'pre-wrap' }}><strong>{task.title}</strong><br /></Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar alt="" src={task.creatorPicture} sx={{ height: "20px", width: "20px", marginRight: "10px" }} />
                        <Typography variant='caption'>Added by <strong>{task.creator}</strong></Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={2} md={2} lg={2} sx={styles.todoEdit}>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box >
                          <TaskActions task={task} />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                          <Box onClick={(e) => handleSubmit(task.status, 'doing', task.taskId)}>
                            <OneMoveRight sx={{ marginRight: "25px" }} move="Doing" />
                          </Box>
                          <Box onClick={(e) => handleSubmit(task.status, 'done', task.taskId)}>
                            <TwoMoveRight move="Done" />
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Box>



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
                <CustomInput sx={styles.adding} value={newDoing} onChange={(e) => handleAddTask(e, 'doing', 'add')} onKeyPress={(ev) => {
                  if (ev.key === "Enter" && !ev.shiftKey) {
                    handleSubmitTask(ev, 'doing', 'add')
                  }
                }}
                  aria-label="Demo input" placeholder="Task Title..." />
                <Grid container>
                  <Grid item xs={12} md={6} lg={6} sx={{ padding: '5px' }}>
                    <Button sx={styles.submitButton} onClick={(e) => handleSubmitTask(e, 'doing', 'add')}>Add</Button>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6} sx={{ padding: '5px' }}>
                    <Button sx={styles.cancelButton} onClick={() => setOpenDoing(false)}>Cancel</Button>
                  </Grid>
                </Grid>
              </Box>
            }
            {openEditDoing &&
              <Box>
                <CustomInput sx={styles.adding} value={editDoing} onChange={(e) => handleAddTask(e, 'doing', 'edit')} onKeyPress={(ev) => {
                  if (ev.key === "Enter" && !ev.shiftKey) {
                    handleSubmitTask(ev, 'doing', 'adit')
                  }
                }}
                  aria-label="Demo input" placeholder="Task Title..." />
                <Grid container>
                  <Grid item xs={12} md={6} lg={6} sx={{ padding: '5px' }}>
                    <Button sx={styles.submitButton} onClick={(e) => handleSubmitTask(e, 'doing', 'edit')}>Edit</Button>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6} sx={{ padding: '5px' }}>
                    <Button sx={styles.cancelButton} onClick={() => setOpenEditDoing(false)}>Cancel</Button>
                  </Grid>
                </Grid>
              </Box>
            }


            <Box sx={{
              maxHeight: '70vh',
              overflowY: 'auto',
            }}>
              {doing.map((task) => (
                <Box sx={styles.BoxContainer}>
                  <Box sx={task.priority === 'important' ? styles.importantTask : styles.normalTask}>
                  </Box>
                  <Grid container sx={task.priority === 'important' ? styles.doingGridContainerImportant : styles.doingGridContainer}>
                    <Grid item xs={10} md={10} lg={10} sx={styles.doingInfo}>
                      <Typography variant='subtitle2' sx={{ whiteSpace: 'pre-wrap' }}><strong>{task.title}</strong><br /></Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar alt="" src={task.creatorPicture} sx={{ height: "20px", width: "20px", marginRight: "10px" }} />
                        <Typography variant='caption'>Added by <strong>{task.creator}</strong></Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={2} md={2} lg={2} sx={styles.doingEdit}>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box>
                          <TaskActions task={task} />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                          <Box onClick={(e) => handleSubmit(task.status, 'todo', task.taskId)}>
                            <OneMoveLeft sx={{ marginRight: "25px" }} move="Todo" />
                          </Box>
                          <Box onClick={(e) => handleSubmit(task.status, 'done', task.taskId)}>
                            <OneMoveRight move="Done" />
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Box>
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
                <CustomInput sx={styles.adding} value={newDone} onChange={(e) => handleAddTask(e, 'done', 'add')} onKeyPress={(ev) => {
                  if (ev.key === "Enter" && !ev.shiftKey) {
                    handleSubmitTask(ev, 'done', 'add')
                  }
                }}
                  aria-label="Demo input" placeholder="Task Title..." />
                <Grid container>
                  <Grid item xs={12} md={6} lg={6} sx={{ padding: '5px' }}>
                    <Button sx={styles.submitButton} onClick={(e) => handleSubmitTask(e, 'done', 'add')}>Add</Button>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6} sx={{ padding: '5px' }}>
                    <Button sx={styles.cancelButton} onClick={() => setOpenDone(false)}>Cancel</Button>
                  </Grid>
                </Grid>
              </Box>
            }
            {openEditDone &&
              <Box>
                <CustomInput sx={styles.adding} value={editDone} onChange={(e) => handleAddTask(e, 'done', 'edit')} onKeyPress={(ev) => {
                  if (ev.key === "Enter" && !ev.shiftKey) {
                    handleSubmitTask(ev, 'done', 'edit')
                  }
                }}
                  aria-label="Demo input" placeholder="Task Title..." />
                <Grid container>
                  <Grid item xs={12} md={6} lg={6} sx={{ padding: '5px' }}>
                    <Button sx={styles.submitButton} onClick={(e) => handleSubmitTask(e, 'done', 'edit')}>Edit</Button>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6} sx={{ padding: '5px' }}>
                    <Button sx={styles.cancelButton} onClick={() => setOpenEditDone(false)}>Cancel</Button>
                  </Grid>
                </Grid>
              </Box>
            }

            <Box sx={{
              maxHeight: '70vh',
              overflowY: 'auto',
            }}>
              {done.map((task) => (
                <Box sx={styles.BoxContainer}>
                  <Box sx={task.priority === 'important' ? styles.importantTask : styles.normalTask}>
                  </Box>
                  <Grid container sx={task.priority === 'important' ? styles.doneGridContainerImportant : styles.doneGridContainer}>
                    <Grid item xs={10} md={10} lg={10} sx={styles.doneInfo}>
                      <Typography variant='subtitle2' sx={{ whiteSpace: 'pre-wrap' }}><strong>{task.title}</strong><br /></Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar alt="" src={task.creatorPicture} sx={{ height: "20px", width: "20px", marginRight: "10px" }} />
                        <Typography variant='caption'>Added by <strong>{task.creator}</strong></Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={2} md={2} lg={2} sx={styles.doneEdit}>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box>
                          <TaskActions task={task} />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                          <Box onClick={(e) => handleSubmit(task.status, 'doing', task.taskId)}>
                            <OneMoveLeft sx={{ marginRight: "25px" }} move="Doing" />
                          </Box>
                          <Box onClick={(e) => handleSubmit(task.status, 'todo', task.taskId)}>
                            <TwoMoveLeft move="ToDo" />
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Box>
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


