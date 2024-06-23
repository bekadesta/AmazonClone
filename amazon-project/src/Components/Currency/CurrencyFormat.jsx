import React from 'react'
import numeral from 'numeral'

const CurencyFormat = ({amount})=>{
    const formatted = numeral(amount).format("$0,0.00")
    return <div>{formatted}</div>
    
}

export default CurencyFormat