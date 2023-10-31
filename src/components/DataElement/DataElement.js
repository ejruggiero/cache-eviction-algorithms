import React from 'react'
import './DataElement.css';

export default function DataElement({id, char, onClick, addBottomMargin="", count}) {
  return (
    // should be invisible for fifo
    <label className="countLabel mt-4 ms-5 me-3 mb-1">{count}<br/>
    {/* should have mt-5 for fifo */}
    {/* <button name={id} id={id} class={`${addBottomMargin} btn btn-warning btn-circle btn-xl mt-2 ms-5 me-4`} onClick={onClick}>{char}</button> */}
    <button name={id} id={id} class={`${addBottomMargin} btn btn-warning btn-circle btn-xl`} onClick={onClick}>{char}</button>
    </label>
    // </div>
  )
}
