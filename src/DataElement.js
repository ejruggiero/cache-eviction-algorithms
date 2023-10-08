import React from 'react'
import './DataElement.css';

export default function DataElement({char}) {
  console.log({char})
  return (
    <button class="btn btn-warning btn-circle btn-xl" style={{fontSize: "40px"}}>{char}</button>
  )
}
