import React from 'react'

export default function Score({score}) {
  let suffix = "points";
  if (score === 1) {
      suffix = "point";
  }
  return (
    <>
    <label class="h2">{score}</label>
    <span class="h2"> {suffix} &#11088;</span>
    </>
  )
}
