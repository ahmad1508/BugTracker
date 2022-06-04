import React, { useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { Box, Button } from '@mui/material'
import NewProjectForms from './NewProjectForms'
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

  newButton: {
    bgcolor: "#00a152",
    '&:hover': {
      bgcolor: "#00a152"
    }
  },
  buttonSurround: {
    margin: "10px 0px",
    display: 'flex',
    justifyContent: 'flex-end',
    borderRadius: '10px'
  },
  formSurround: {
    margin: "10px 0px",
  },


})
const AddProject = () => {
  const styles = useStyles(useTheme())
  const [open, setOpen] = useState(false)

  const handleClick = (e) => {
    e.preventDefault();
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }

  return (
    <Box>
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        style={styles.buttonSurround}>
        <Button variant='contained' sx={styles.newButton} onClick={handleClick}>New Project</Button>
      </motion.div>
      {open && <motion.div
        variants={dropIn}
        initial="hidden"
        style={styles.modal}
        animate="visible"
        exit="exit"
      >
        <NewProjectForms />
      </motion.div>}

    </Box>
  )
}
export default AddProject;