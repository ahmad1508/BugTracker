import React, { useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import axios from 'axios'
import { TextField, Box, Typography, Button, Grid } from '@mui/material'
import IssueContext from '../../IssueContext'
import Context from '../../Context'
import InputBase from '@mui/material/InputBase';
import IssuesList from './IssuesList'



const useStyles = (theme) => ({
    textfield: {
        width: "100%",
        backgroundColor: "#eeeeee",

        flex: 1,
        borderRadius: "5px",
        paddingLeft: "10px",

    },
    container: {
        width: '100%',
        backgroundColor: '#e0e0e0',
        borderRadius: '5px',
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

})

export default function AddIssueForm({ groupId }) {
    const theme = useTheme()
    const styles = useStyles()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const current_project_id = useParams()
    const { issues, setIssues, open, setOpen } = useContext(IssueContext)
    const { profile } = useContext(Context)

    const handleTitle = (e) => { setTitle(e.target.value) }
    const handleDescription = (e) => { setDescription(e.target.value) }
    const handleSubmit = async (e) => {
        e.preventDefault()
        //add to database
        if (title) {
            const issue_to_add = {
                projectId: current_project_id.id,
                groupId: groupId,
                title: title,
                status: "open",
                creator: profile.email
            }
            const { data: issue } = await axios.post('http://localhost:5000/issue/add-issue', issue_to_add)

            console.log(issue)
            setTitle("")

            setIssues([...issues, issue])
        }
    }
    return (
        <Box sx={styles.container}>
            <Grid container>
                <Grid item md={11} lg={11} sx={{ paddingRight: "5px" }}>
                    <Box sx={styles.gridItem}>
                        <Box sx={{ width: "100%" }}>

                            <InputBase
                                sx={styles.textfield}
                                placeholder="Title"
                                inputProps={{ 'aria-label': 'Title' }}
                                onChange={handleTitle}
                                value={title}
                            />
                        </Box>
                    </Box>
                </Grid>
                {/* <Grid item md={5} lg={5}>
                    <Box sx={styles.gridItem}>
                        <Box sx={{ padding: "0px 15px", width: "100%" }}>
                            <TextField
                                id="outlined-basic"
                                label="Description"
                                variant="standard"
                                sx={styles.textField}
                                onChange={handleDescription}
                                size="small"
                            />
                        </Box>
                    </Box>
                </Grid> */}
                <Grid item md={1} lg={1}>
                    <Box sx={styles.gridItem}>
                        <Button variant="contained"
                            style={{
                                width: "100%",
                                height: "33px",
                                marginRight: "10px"
                            }}
                            color="secondary"
                            onClick={(e) => handleSubmit(e)}>Add</Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

