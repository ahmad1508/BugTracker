import React, { useContext } from 'react';
import { useTheme } from '@mui/styles'
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'
import TaskContext from '../../TaskContext'
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 140,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

const useStyles = (theme) => ({
    button: {
        color: "#000"
    }
})


export default function ProjectActions({ task }) {
    const taskId = task.taskId
    const theme = useTheme()
    const styles = useStyles(theme)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const {
        todo, doing, done, setToDo, setDoing, setDone,
        setOpenTodo, setOpenDoing, setOpenDone,
        setEditTodo, setEditDoing, setEditDone,
        setOpenEditTodo, setOpenEditDoing, setOpenEditDone,
        setEditTodoID, setEditDoingID, setEditDoneID,
    } = useContext(TaskContext)
    /* openTodo, openDoing, openDone, newTodo, newDoing, newDone, setNewTodo, setNewDoing, setNewDone,
        editTodo, editDoing, editDone, openEditTodo, openEditDoing, openEditDone, editedTodoID, editedDoingID, editedDoneID,  */
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleDelete = async (e) => {
        e.preventDefault()
        setAnchorEl(null);
        await axios.post('http://localhost:5000/task/delete_task', {
            taskId
        })
        switch (task.status) {
            case 'todo':
                setToDo(todo.filter(task => task.taskId !== taskId))
                break;
            case 'doing':
                setDoing(doing.filter(task => task.taskId !== taskId))
                break;
            case 'done':
                setDone(done.filter(task => task.taskId !== taskId))
                break;
            default:
                break;
        }

        handleClose()
    }



    const handleEdit = (e) => {
        switch (task.status) {
            case 'todo':
                setOpenTodo(false)
                setOpenEditTodo(true)
                setEditTodo(task.title)
                setEditTodoID(task.taskId)
                break;
            case 'doing':
                setOpenDoing(false)
                setOpenEditDoing(true)
                setEditDoing(task.title)
                setEditDoingID(task.taskId)
                break;
            case 'done':
                setOpenDone(false)
                setOpenEditDone(true)
                setEditDone(task.title)
                setEditDoneID(task.taskId)
                break;
            default:
                break;
        }
    }


    const handleImportant = async (e) => {
        task.priority = 'important'
        switch (task.status) {
            case 'todo':
                let todotasks = todo.filter((task_saved) => task_saved.taskId !== task.taskId)
                todotasks.unshift(task)
                setToDo(todotasks)
                break;
            case 'doing':
                let doingtasks = doing.filter((task_saved) => task_saved.taskId !== task.taskId)
                doingtasks.unshift(task)
                setDoing(doingtasks)
                break;
            case 'done':
                let donetasks = done.filter((task_saved) => task_saved.taskId !== task.taskId)
                donetasks.unshift(task)
                setDone(donetasks)
                break;
            default:
                break;
        }
        await axios.post('http://localhost:5000/task/priority-change', task)
        handleClose()
    }

    const handleNormal = async (e) => {
        task.priority = 'normal'
        switch (task.status) {
            case 'todo':
                let todotasks = todo.filter((task_saved) => task_saved.taskId !== task.taskId)
                todotasks.push(task)
                setToDo(todotasks)
                break;
            case 'doing':
                let doingtasks = doing.filter((task_saved) => task_saved.taskId !== task.taskId)
                doingtasks.push(task)
                setDoing(doingtasks)
                break;
            case 'done':
                let donetasks = done.filter((task_saved) => task_saved.taskId !== task.taskId)
                donetasks.push(task)
                setDone(donetasks)
                break;
            default:
                break;
        }
        await axios.post('http://localhost:5000/task/priority-change', task)
        handleClose()
    }

    const handleClose = () => {
        setAnchorEl(null);
    }
    return (
        <div>
            <Button
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                sx={styles.button}
                disableElevation
                onClick={handleClick}
            >
                <MoreHorizIcon />
            </Button>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {task.priority === 'normal' && <MenuItem onClick={(e) => handleImportant(e)} disableRipple>
                    <ReportGmailerrorredIcon />
                    Set Important
                </MenuItem>}
                {task.priority === 'important' && <MenuItem onClick={(e) => handleNormal(e)} disableRipple>
                    <ReportGmailerrorredIcon />
                    Set Normal
                </MenuItem>}
                <MenuItem onClick={(e) => handleEdit(e)} disableRipple>
                    <EditIcon />
                    Edit Task
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={(e) => handleDelete(e)} disableRipple>
                    <DeleteIcon />
                    Delete Task
                </MenuItem>
            </StyledMenu>
        </div >
    );
}
