import React from 'react'
import { useState, useEffect, useRef } from 'react';
import './DataElement.css';

export default function DataElement({id, char, onClick, addBottomMargin="", hits, time, evictionAlg}) {

  const [currTime, setCurrTime] = useState(time);
  const timerIdRef = useRef(null);

  useEffect(() => {
    timerIdRef.current = setTimeout(() => {
      setCurrTime(currTime + 1);
    }, 1000);
  }, [evictionAlg, currTime]);

  if (evictionAlg === "lru") {
    return (
      <label className="countLabel mt-4 ms-5 me-3 mb-1">{currTime}<br/>
      <button name={id} id={id} class={`${addBottomMargin} btn btn-warning btn-circle btn-xl`} onClick={onClick}>{char}</button>
      </label>
    )
  }
  else {
    return (
      <label className="countLabel mt-4 ms-5 me-3 mb-1">{hits}<br/>
      <button name={id} id={id} class={`${addBottomMargin} btn btn-warning btn-circle btn-xl`} onClick={onClick}>{char}</button>
      </label>
    )
  }
  
}
