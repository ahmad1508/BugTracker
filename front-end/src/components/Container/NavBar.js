import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useTheme } from '@mui/styles'
import Context from '../../Context'
import {
    Typography,
    Box,
    Link
} from '@mui/material'
import TaskSortActions from '../Task/TaskSortActions'

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
        //margin: "10px",
        borderRadius: '10px',
        width: '100%',
        padding: '15px 40px',
        boxShadow: 2,
        justifyContent: 'space-between',
        alignItems: 'center'
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
        padding: '0px 5px'
    }

})

export default function NavBar() {
    const theme = useTheme()
    const styles = navStyles(theme)
    const id = useParams()
    const pathname = useLocation().pathname
    const navigate = useNavigate()

    const { oauth, projects, setCurrentProject, currentProject } = useContext(Context)
    const proj = projects.find((project) => project.projectId === id.id)
    setCurrentProject(id.id)

    const [isDashboard, setIsDashboard] = useState(false)
    const [isIssues, setIsIssues] = useState(false)
    const [isSettings, setIsSettings] = useState(false)

    useEffect(() => {
        const shadow = () => {
            const regexDahsboard = /Dashboard/;
            const regexIssues = /Issues/;
            const regexSettings = /Settings/;

            if (regexDahsboard.test(pathname))
                setIsDashboard(true)
            if (regexIssues.test(pathname))
                setIsIssues(true)
            if (regexSettings.test(pathname))
                setIsSettings(true)
        }
        shadow()

    }, [currentProject, navigate])



    if (!proj) {
        return <div>Loading</div>
    }
    return (
        <Box sx={styles.navBox}>
            <Box sx={{ display: 'flex' }}>
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
                        >
                            Dashboard
                        </Typography>
                    </Link>
                    <Link
                        to={`/Issues/${proj.projectId}`}
                        sx={styles.tabs}
                        onClick={(e) => {
                            e.preventDefault()
                            navigate(`/Issues/${proj.projectId}`)
                        }}
                    >
                        <Typography variant='body1'
                            sx={isIssues ? styles.selectedWindow : styles.window}>
                            Issues</Typography>
                    </Link>
                    <Link
                        to={`/Settings/${proj.projectId}`}
                        sx={styles.tabs}
                        onClick={(e) => {
                            e.preventDefault()
                            navigate(`/Settings/${proj.projectId}`)
                        }}
                    >
                        <Typography variant='body1' sx={isSettings ? styles.selectedWindow : styles.window}>
                            Settings</Typography>
                    </Link>

                </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <TaskSortActions />
            </Box>


        </Box>
    )
}