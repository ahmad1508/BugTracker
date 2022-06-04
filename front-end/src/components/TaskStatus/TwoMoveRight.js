import React from 'react'
import Tooltip from '@mui/material/Tooltip';

export default function TwoMoveRight({move,taskId}) {
  return (
    <div>
      <Tooltip title={move}>
        <img src="/double-arrow-right.svg" alt="" style={{cursor:'pointer'}}/>
      </Tooltip>
    </div>
  )
}
