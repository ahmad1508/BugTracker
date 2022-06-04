import React, { useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import axios from 'axios'
import { TextField, Box, Typography, Button, Grid } from '@mui/material'
import IssueContext from '../../IssueContext'
import Context from '../../Context'
import InputBase from '@mui/material/InputBase';
import IssuesList from './IssuesList'
import { SketchPicker } from 'react-color'


const useStyles = (theme) => ({
    textfield: {
        width: "100%",
        backgroundColor: "#eeeeee",

        flex: 1,
        borderRadius: "5px",
        paddingLeft: "10px",

    },
    container: {
        width: '30%',
        backgroundColor: '#e0e0e0',
        borderRadius: '5px',
        padding: '5px',
        cursor: 'pointer'
    },
    gridItem: {
        width: "100%",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "clip",
        display: 'flex',
        alignItems: 'center',
    },
    popover: {
        position: 'absolute',
        transform: "translateY(175px)",
        zIndex: '3',
    },
    cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
    },

})

export default function GroupEnd() {
    const theme = useTheme()
    const styles = useStyles()
    const [title, setTitle] = useState('')
    const current_project_id = useParams()
    const { groups, setGroups } = useContext(IssueContext)
    const { profile } = useContext(Context)
    const [color, setColor] = useState("green")
    const [openPicker, setOpenPicker] = useState(false)


    const handleTitle = (e) => { setTitle(e.target.value) }


    const handleSubmit = async (e) => {
        e.preventDefault()
        //add to database
        if (title) {
            const group_to_add = {
                projectId: current_project_id.id,
                title: title,
                color: color,
            }
            const { data: group } = await axios.post('http://localhost:5000/issue/add-group', group_to_add)

            setTitle("")

            setGroups([...groups, group])
            setTitle("")
        }
    }

    const onChange = (e) => {
        setColor(e.hex)
    }
    const onClick = () => {
        setOpenPicker(!openPicker)
    }


    return (
        <Box sx={styles.container}>
            <Grid container >
                <Grid item md={9} lg={9} sx={{ paddingRight: "5px" }}>
                    <Box sx={styles.gridItem}>
                        <Box sx={{ width: "100%" }}>

                            <InputBase
                                sx={styles.textfield}
                                placeholder="Group title"
                                inputProps={{ 'aria-label': 'Title' }}
                                onChange={handleTitle}
                                value={title}
                            />
                        </Box>
                    </Box>
                </Grid>
                <Grid item md={1} lg={1}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <Box sx={{
                        borderRadius: "50%",
                        background: `${color}`,
                        height: "25px",
                        width: "25px",
                    }}
                        onClick={() => onClick()}>
                    </Box>
                    {openPicker &&
                        <Box sx={styles.popover}>
                            <Box sx={styles.cover} onClick={() => setOpenPicker(false)} />
                            <SketchPicker color={color} onChange={onChange} />
                        </Box>
                    }
                </Grid>

                <Grid item md={2} lg={2}>
                    <Box sx={styles.gridItem}>
                        <Button variant="contained"
                            style={{
                                width: "100%",
                                height: "33px",
                            }}
                            color="secondary"
                            onClick={(e) => handleSubmit(e)}>Add</Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

