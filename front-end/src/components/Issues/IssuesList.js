import React, { useState, useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import IssueModel from './IssueModel'
import IssueGroupHeader from './IssueGroupHeader'
import IssueGroupEnd from './IssueGroupEnd'
import GroupEnd from './GroupEnd'

import Context from '../../Context'

import { useTheme } from '@mui/styles'
import axios from 'axios'
import IssueContext from '../../IssueContext'
import AddBoxIcon from '@mui/icons-material/AddBox';

import { Box, Typography, IconButton } from '@mui/material'

import RightClickMenu from './RightClickMenu'
import { getMouseCoordinates } from '../utils';

const useStyles = (theme) => ({
    container: {
        marginTop: '10px',
        padding: "0px 30px",
        paddingTop: "20px",
        minHeight: "100vh",
        backgroundColor: "#fff",
        borderRadius: '10px',
        boxShadow: 3,

    },
    issueList: {
        padding: "0px 30px",
    },
})

export default function IssuesList() {
    const theme = useTheme()
    const styles = useStyles(theme)
    const { oauth } = useContext(Context)
    const current_project_id = useParams()
    const { groups, setGroups, issues, setIssues } = useContext(IssueContext);
    const [createGroup, setCreateGroup] = useState(false)

    useEffect(() => {
        const fetch_groups = async () => {
            const { data: group } = await axios.post('http://localhost:5000/issue/get_groups', current_project_id)
            setGroups(group)

            await fetch_issues()
        }
        const fetch_issues = async () => {
            const { data: issues } = await axios.post('http://localhost:5000/issue/get_issues', current_project_id)
            setIssues(issues)
        }
        fetch_groups()
    }, [oauth, current_project_id])

    const handleCreateGroup = () => {
        setCreateGroup(!createGroup)
    }
    return (
        <Box sx={styles.container}>
            {groups &&
                <Box>
                    {groups.map(group => (
                        <Box sx={{ marginBottom: "30px" }}>
                            <Typography variant='h6' sx={{ color: `${group.color}` }}><strong>{group.title}</strong></Typography>
                            <Box sx={styles.issueList}>
                                <IssueGroupHeader />
                                {issues &&
                                    issues.map(issue => (
                                        <Box >
                                            {issue.groupId === group.groupId && <IssueModel issue={issue} groupColor={group.color} />}
                                        </Box>
                                    ))}
                                <IssueGroupEnd group={group} />

                            </Box>
                        </Box>
                    ))}

                </Box>}
            <Box>
                <Box color="primary" sx={{ borderRadius: "15px", display: 'flex', alignItems: 'center' }}>
                    <AddBoxIcon /><Typography variant="h6">Add Group</Typography>
                </Box>
                <GroupEnd />
            </Box>
        </Box>
    )
}
