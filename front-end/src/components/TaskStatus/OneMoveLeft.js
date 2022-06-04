import React from 'react'
import Tooltip from '@mui/material/Tooltip';

export default function OneMoveLeft({move,taskId}) {


    
  return (
    <div>
      <Tooltip title={move}>
        <img src="/arrow-left.svg" alt="" style={{ marginRight: "10px", cursor: 'pointer' }} />
      </Tooltip>
    </div>
  )
}
