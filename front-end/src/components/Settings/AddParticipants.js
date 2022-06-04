import React, { useState, useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import Context from '../../Context'

import { Box, Typography, TextField, Button } from '@mui/material'
import { useTheme } from '@mui/styles'


import axios from 'axios'


const useStyles = (theme) => ({
    title: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
    }
})


export default function AddParticipants() {
    const id = useParams().id

    const theme = useTheme()
    const styles = useStyles(theme)
    const navigate = useNavigate()
    const { oauth, projects,setProjects, currentProject, currentProjectParticipants, setCurrentParticipants } = useContext(Context)
    const proj = projects.find((project) => project.projectId === id)

    const [usersToAdd, setUsers] = useState('')
    const [count, setCount] = useState(0)
    const handleChange = (e) => {
        setUsers(e.target.value)
    }

    const handleSubmit = async (e) => {
        const usersArray = usersToAdd.split(',')
        setCount(usersArray.length)

        const { data: response } = await axios.post('http://localhost:5000/project/add_participants', {
            users: usersArray,
            projectId: id
        })
        console.log({response})
        
        const updated_projects = replaceProject(response.project)
        
        setProjects(updated_projects)
        setUsers('')
    }


    const replaceProject = (project_updated)=>{
        let oldProject = projects
        const index = oldProject.indexOf(proj)
        if(index!='-1')
            oldProject[index] = project_updated

        return oldProject;
    }

    return (
        <Box sx={styles.container}>
            <Box sx={{ marginBottom: '10px' }}>
                <Typography variant='h6'><strong>Add Members to the project</strong></Typography>
            </Box>
            <Box>
                <TextField
                    id="outlined-basic"
                    label="add by emails"
                    value={usersToAdd}
                    variant="outlined"
                    sx={{ width: '100%', marginBottom: '10px' }}
                    onChange={(e) => handleChange(e)}
                />
                <Button sx={{ width: '100%' }} variant='contained' onClick={handleSubmit}>
                    Add
                </Button>
            </Box>

        </Box>
    )
}
