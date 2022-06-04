import React from 'react'
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';

export default function OneMoveRight({move,taskId}) {

  return (
    <div>
      <Tooltip title={move}>
        <img src="/arrow-right.svg" alt="" style={{ marginRight: "10px", cursor: 'pointer' }} />
      </Tooltip>
    </div>
  )
}
