import React from 'react'
import './box.css'

const Box = (props) =>{
    let color;
    switch (props.value) {
        case 1:
        color = "green"
        break;
        case 2:
        color = "red"    
        break;
        case 3:
        color = "yellow"    
        break;
        default:
        color = "gray"
    }

    return(
      <div id="box" style={{backgroundColor: color }}>
        {props.value}
      </div>  
    )
} 
export default Box