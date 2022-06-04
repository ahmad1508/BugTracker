import React from 'react'
import NewProjectForms from './NewProjectForms';
import {
    Box, Modal, List,
    ListItem, ListItemIcon, ListItemText,
} from '@mui/material'
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { useTheme } from '@mui/styles'
import { motion } from 'framer-motion'

const dropIn = {
    hidden: {
        y: "-10vh",
        opacity: 0
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 0.2,
            type: "spring",
            damping: 15,
            stiffness: 500,
        }
    },
    exit: {
        y: "70vh",
        opacity: 0
    }
}

const useStyles = (theme) => ({
    BoxStyle: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 650,
        bgcolor: 'background.paper',
        boxShadow: 32,
        p: 4,
    },
    openButton: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: theme.palette.primary.medium,
        borderRadius: '15px',
        width: '90%',
        margin: "10px 10px",
        color: "#000",
        '&:hover': {
            backgroundColor: theme.palette.primary.main
        }
    },
    modal: {
        width: "clamp(50 %, 700px, 90 %)",
        height: "min(50 %, 300px)",
        margin: "auto",
        padding: "0 2rem",
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    }
})


export default function ProjectAddingButton() {
    const theme = useTheme();
    const styles = useStyles(theme)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box>
            <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
            >
                <List onClick={handleOpen}>
                    <ListItem button sx={styles.openButton}>
                        <ListItemIcon >
                            <AccountTreeIcon />
                        </ListItemIcon>
                        <ListItemText sx={{ fontSize: "0.8rem" }}>Add Project</ListItemText>
                    </ListItem>
                </List>
            </motion.div>
            {open && <motion.div
                drag
                style={styles.modal}
            >
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={styles.BoxStyle}>
                        <NewProjectForms />
                    </Box>
                </Modal>
            </motion.div>}
        </Box>
    )
}
