import React from 'react'
import './DataElement.css';

export default function DataElement({id, char, onClick}) {
  return (
    <button id={id} class="btn btn-warning btn-circle btn-xl" style={{fontSize: "50px"}} onClick={onClick}>{char}</button>
  )
}
