import React from 'react'
import { useState, useEffect, useRef } from 'react';
import './DataElement.css';

export default function DataElement({id, char, onClick, addBottomMargin="", hits, time, evictionAlg, disabled=false}) {

  const [currTime, setCurrTime] = useState(time);
  const timerIdRef = useRef(null);

  useEffect(() => {
    timerIdRef.current = setTimeout(() => {
      setCurrTime(currTime + 1);
    }, 1000);
  }, [evictionAlg, currTime]);

  useEffect(() => {
    if (time >= 1) {
      window.clearInterval(timerIdRef.current);
      setCurrTime(0);
    }
  }, [time]);

  useEffect(() => {
    console.log("in disabled useEffect");
    if (disabled) {
      console.log("disabled");
      document.getElementById(id).disabled = "disabled";
    }
    else {
      console.log("not disabled");
      document.getElementById(id).disabled = "";
    }
  }, [disabled])

  if (evictionAlg === "lru") {
    return (
      <label id={`countLabel${id}`} className="countLabel mt-4 ms-5 me-3 mb-1">{currTime}<br/>
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
