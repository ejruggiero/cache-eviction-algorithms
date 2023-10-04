import React from 'react'
import Form from 'react-bootstrap/Form';

export default function EvictionAlg() {
  return (
    <Form.Select size="lg" className="bg-warning text-center">
        <option value="fifo">First In First Out</option>
        <option value="lru">Least Recently Used</option>
        <option value="lfu">Least Frequently Used</option>
    </Form.Select>
  )
}
