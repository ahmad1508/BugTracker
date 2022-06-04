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
import Context from '../../Context';

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


export default function ProjectActions({ id }) {
    const projectId = id
    const theme = useTheme()
    const styles = useStyles(theme)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { projects, setProjects, profile, setProfile } = useContext(Context)
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleDelete = async (e) => {
        e.preventDefault()
        setAnchorEl(null);

        /* DELETE PROJECT FROM DATABASE */
        await axios.post(`http://localhost:5000/project/delete_project/${projectId}`)
        const projs = projects.filter((project) => project.projectId !== projectId)
        setProjects(projs)
        /* UPDATE USER PROJECTS IN DATABASE AFTER DELETE*/
        const { data: updated_user } = axios.post('http://localhost:5000/user/delete_user_project', {
            projectId,
            profile
        })
        setProfile(profile)
    };


    const handleEdit = (e) => {

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
                <MenuItem onClick={(e) => handleEdit(e)} disableRipple>
                    <EditIcon />
                    Edit Project
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={(e) => handleDelete(e)} disableRipple>
                    <DeleteIcon />
                    Delete Project
                </MenuItem>
            </StyledMenu>
        </div >
    );
}
