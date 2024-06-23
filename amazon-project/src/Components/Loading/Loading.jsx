import React from 'react'
import {RingLoader} from 'react-spinners'

function Loading() {
  return (
    <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
        paddingLeft: "100px",
        color: "#d49644",
       }}>
    <RingLoader color="#d49644"/>
    </div>
  )
}

export default Loading
