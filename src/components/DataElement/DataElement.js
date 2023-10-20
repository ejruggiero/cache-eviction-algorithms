import React from 'react'
import './DataElement.css';

export default function DataElement({id, char, onClick, addBottomMargin=""}) {
  return (
    // <button id={id} class="btn btn-warning btn-circle btn-xl mt-3 ms-5" onClick={onClick}>{char}</button>
    <button id={id} class={`${addBottomMargin} btn btn-warning btn-circle btn-xl mt-5 ms-5 me-4`} onClick={onClick}>{char}</button>
  )
}
