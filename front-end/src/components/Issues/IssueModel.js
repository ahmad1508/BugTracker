import React, { useRef, useState, useContext, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'


import { Box, Typography, Grid, Avatar } from '@mui/material'
import { useTheme } from '@mui/styles'
import RightClickMenu from './RightClickMenu'
import { getMouseCoordinates } from '../utils';

const useStyles = (theme) => ({
    container: {
        width: '100%',
        backgroundColor: '#e0e0e0',
        borderBottom: "1px solid white",
        borderRadius: '5px'
    },
    gridBox: {
        width: "100%",
        display: 'flex',
        borderRight: "1px solid white",
    },
    gridBoxLast: {
        display: 'flex',
    },
    gridItemFirst: {
        padding: '5px 0px',
        width: "100%",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "clip",
        display: 'flex',
        alignItems: 'center',
        paddingLeft: "30px"
    },
    gridItem: {
        padding: '5px 0px',
        width: "100%",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "clip",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    marker: {

    },
    link: {
        textDecoration: 'none',
        color: 'black',
        width: '100%',
        cursor: 'pointer'
    },
    delete: {
        '&:hover': {
            transform: "scale(1.2)",
        }
    }
})

export default function IssueModel({ issue, groupColor }) {
    const id = useParams()
    const theme = useTheme()
    const styles = useStyles(theme)
    const [showMenu, setShowMenu] = useState(false)

    const [posX, setPosX] = React.useState()
    const [posY, setPosY] = React.useState()

    useEffect(() => {
        document.addEventListener('contextMenu', handleContextMenu)
        return () => {
            document.removeEventListener('contextMenu', handleContextMenu)
        }
    })


    const handleContextMenu = (e) => {
        e.preventDefault()
        setPosX(e.pageX)
        setPosY(e.pageY)
        setShowMenu(!showMenu);
    }

    const handleAddRespo = () => {

    }

    const handleStatus = () => {

    }


    return (
        <Box sx={styles.container}>
            <Grid container onContextMenu={(e) => handleContextMenu(e)}>

                <Grid item md={6} lg={6} sx={styles.gridBox}>
                    <Box
                        sx={{
                            width: "5px",
                            background: `${groupColor}`,
                            position: 'relative',
                            top: 0,
                            bottom: 0,
                            left: 0
                        }}
                        className={styles.delete}
                    ></Box>
                    <Link to={`/Issues/${id.projectId}/Discussion`} style={styles.link}>
                        <Box sx={styles.gridItemFirst}>
                            <strong>{issue.title}</strong>
                        </Box>
                    </Link>
                </Grid>
                <Grid item md={1} lg={1} sx={styles.gridBox}>
                    <Box sx={styles.gridItem} onClick={handleAddRespo}>
                        <Avatar alt="" src="/hello" sx={{ height: '30px', width: '30px' }} />
                    </Box>
                </Grid>
                <Grid item md={3} lg={3}
                    sx={{
                        display: 'flex',
                        borderRight: "1px solid white",
                        backgroundColor: `${issue.status === 'open' ? '#00c853' : '#dd2c00'}`,
                        cursor: "pointer"
                    }}
                    onClick={handleStatus}>
                    <Box sx={styles.gridItem}>
                        {issue.status}
                    </Box>
                </Grid>
                <Grid item md={2} lg={2} sx={styles.gridBoxLast}>
                    <Box sx={styles.gridItem}>
                        {(new Date(parseInt(issue.createdAt))).toLocaleString()}
                    </Box>
                </Grid>
            </Grid>
            {/* {showMenu && <RightClickMenu posX={posX} posY={posY} showMenu={showMenu} />} */}
        </Box>
    )
}