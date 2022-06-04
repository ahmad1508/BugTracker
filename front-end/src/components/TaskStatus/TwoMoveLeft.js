import React from 'react'
import Tooltip from '@mui/material/Tooltip';

export default function TwoMoveLeft({move,taskId}) {
  return (
    <div>
      <Tooltip title={move}>
        <img src="/double-arrow-right.svg" alt="" style={{ transform: 'rotate(180deg)' }} />
      </Tooltip>
    </div>
  )
}
