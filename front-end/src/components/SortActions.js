import React, { useContext } from 'react';
import { useTheme } from '@mui/styles'
import {useNavigate} from 'react-router-dom'
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'
import Context from '../Context';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SortIcon from '@mui/icons-material/Sort';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { bottomNavigationClasses } from '@mui/material';

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
        color: "#000",
        width: "5px"
    }
})


export default function SortActions() {
    const theme = useTheme()
    const styles = useStyles(theme)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { projects, setProjects, profile, setProfile } = useContext(Context)
    const open = Boolean(anchorEl);
    const navigate = useNavigate()
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleSortTime = (e) => {
        let allprojects = projects
        allprojects.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : ((b.createdAt < a.createdAt) ? -1 : 0))
        setProjects(allprojects)
        navigate('/')
    }
    const handleSortOldest = (e) => {
        let allprojects = projects
        allprojects.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : ((b.createdAt > a.createdAt) ? -1 : 0))
        setProjects(allprojects)
        navigate('/')
    }


    const handleClose = () => {
        setAnchorEl(null);
    }
    return (
        <div>
            <div
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                sx={styles.button}

                onClick={handleClick}
            >
                <ArrowDropDownIcon />
            </div>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={(e) => handleSortTime(e)} disableRipple>
                    <ArrowUpwardIcon />
                    Sort by newest
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={(e) => handleSortOldest(e)} disableRipple>
                    <ArrowDownwardIcon/>
                    Sort by Oldest
                </MenuItem> 
            </StyledMenu>
        </div >
    );
}
