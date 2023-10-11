import React from 'react'

export default function Score({score}) {
  let suffix = "points";
  if (score === 1) {
      suffix = "point";
  }
  return (
    <>
    <label style={{fontSize: "40px"}}>{score}</label>
    <span style={{fontSize: "40px"}}> {suffix} &#11088;</span>
    </>
  )
}
