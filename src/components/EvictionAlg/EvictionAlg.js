import React from 'react'
import Form from 'react-bootstrap/Form';

export default function EvictionAlg() {
  return (
    <Form.Select size="lg" className="bg-warning text-center" style={{fontSize: "30px"}}>
        <option value="fifo">First In First Out (FIFO)</option>
        <option value="lru">Least Recently Used (LRU)</option>
        <option value="lfu">Least Frequently Used (LFU)</option>
    </Form.Select>
  )
}