import React, { useState, useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import Context from '../../Context'
import AddParticipants from './AddParticipants'

import { Grid, Box, Container, Typography, Divider } from '@mui/material'
import { useTheme } from '@mui/styles'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { styled } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

import axios from 'axios'


const useStyles = (theme) => ({
    container: {
        marginTop: '10px',
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: 3,
        padding: '15px 40px',
    },

    gridItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    gridNameItem: {
        display: 'flex',
        alignItems: 'center',

    },
    headerItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
    },
    userTypeItem: {
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
        },
        [theme.breakpoints.down('md')]: {
            display: 'none'
        }
    },
    modalBox: {
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: '10px',
        p: 2,
        px: 4,
        pb: 3,
    }
})


const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;


export default function Settings() {
    const id = useParams().id

    const theme = useTheme()
    const styles = useStyles(theme)
    const navigate = useNavigate()
    const { oauth, profile, projects, setProjects, currentProject, currentProjectParticipants, setCurrentParticipants } = useContext(Context)
    const proj = projects.find((project) => project.projectId === id)

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const getParticipants = async () => {
            /*get participants information */
            const { data: participants } = await axios.post('http://localhost:5000/project/get_participants', { participants: proj.participants })
            setCurrentParticipants(participants)

        }
        getParticipants()
    }, [id, setProjects])


    const handleRemove = async (participantId)=>{
        const {data: response } = await axios.post('http://localhost:5000/project/remove_participant',{
            participantId,
            projectId:proj.projectId
        })
        console.log({response})
        const projects_updated = removeProject(response.project)
        console.log({projects_updated})

        setProjects(projects_updated)

    }

    const removeProject = (project_updated)=>{
        let oldProject = projects
        const index = oldProject.indexOf(proj)
        if(index!='-1')
            oldProject[index] = project_updated

        return oldProject;
    }

    return (
        <Box>
            <Box sx={styles.container}>

                <Box sx={{ width: "100%" }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant='h6' sx={{ fontWeight: '500', fontWeight: 'bold' }}> Participants </Typography>
                        <Box type="button" onClick={handleOpen} sx={{ marginLeft: '30px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <AddCircleIcon sx={{ marginRight: '5px' }} />Add

                        </Box>
                    </Box>
                    <Container maxWidth='md'>
                        <Grid container >
                            <Grid item xs={12} md={12} lg={12}>
                                <Grid container >


                                    <Grid item xs={6} md={4} lg={4} sx={styles.headerItem} >
                                        User Name
                                    </Grid>
                                    <Grid item xs={6} md={4} lg={4} sx={styles.headerItem}>
                                        Email
                                    </Grid>
                                    <Grid item xs={0} md={3} lg={3} sx={styles.userTypeItem}>
                                        Type of user
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Divider sx={{ width: '100%', m: "10px 0px" }} />
                            {currentProjectParticipants && currentProjectParticipants.map(participant => ((
                                <Grid item xs={12} md={12} lg={12} sx={{ marginBottom: "10px" }}>
                                    <Grid container >


                                        <Grid item xs={5} md={4} lg={4} sx={styles.gridNameItem} >
                                            <img src={participant.picture} alt="" style={{ height: "50px", borderRadius: '5px' }} />
                                            <Typography variant='subtitle1' sx={{ marginLeft: '20px' }}>
                                                <strong>{participant.name}</strong>
                                            </Typography>
                                        </Grid>


                                        <Grid item xs={5} md={4} lg={4} sx={styles.gridItem}>
                                            {participant.email}
                                        </Grid>


                                        <Grid item xs={0} md={3} lg={3} sx={styles.userTypeItem}>
                                            {currentProject.owner === participant.googleId ?
                                                (<Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <AdminPanelSettingsIcon />Owner
                                                </Box>) :
                                                (<Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <PersonIcon />Member
                                                </Box>)
                                            }

                                        </Grid>
                                        <Grid item xs={2} md={1} lg={1} sx={styles.userTypeItem}>
                                            {profile.googleId === currentProject.owner && profile.googleId !== participant.googleId &&
                                                <PersonRemoveIcon onClick={(e)=>handleRemove(participant.googleId)} 
                                                    sx={{cursor:'pointer'}}
                                                />
                                            }

                                        </Grid>

                                    </Grid>
                                </Grid>
                            )))}
                        </Grid>
                    </Container>
                </Box>
            </Box>
            <StyledModal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
                onClose={handleClose}
                BackdropComponent={Backdrop}
            >
                <Box sx={styles.modalBox}>
                    <AddParticipants />
                </Box>
            </StyledModal>
        </Box >
    )
}
