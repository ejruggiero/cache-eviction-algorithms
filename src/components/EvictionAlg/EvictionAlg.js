import React from 'react'
import Form from 'react-bootstrap/Form';

export default function EvictionAlg({setEvictionAlg, disabled}) {
  // if (disabled === "true") {
  //   document.getElementById("formselect").className = "bg-secondary text-center";
  // } else {
  //   document.getElementById("formselect").className = "bg-warning text-center";
  // }
  return (
    <Form.Select id="formselect" size="lg" className="bg-warning text-center" style={{fontSize: "30px"}} disabled={disabled} onChange={(e) => setEvictionAlg(e.currentTarget.value)}>
        <option value="fifo">First In First Out (FIFO)</option>
        <option value="lru">Least Recently Used (LRU)</option>
        <option value="lfu">Least Frequently Used (LFU)</option>
    </Form.Select>
  )
}
