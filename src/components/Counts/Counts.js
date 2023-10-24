import React from 'react'
import Table from 'react-bootstrap/Table';

export default function Counts({className}) {
  return (
    <Table striped bordered hover style={{fontSize: "35px"}} className={className}>
      <thead>
        <tr>
          <th>Data</th>
          <th>Hits</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>😀</td>
          <td>1</td>
        </tr>
        <tr>
          <td>🤩</td>
          <td>2</td>
        </tr>
        <tr>
          <td>🤩</td>
          <td>2</td>
        </tr>
        <tr>
          <td>🤩</td>
          <td>2</td>
        </tr>
        <tr>
          <td>🤩</td>
          <td>2</td>
        </tr>
      </tbody>
    </Table>
  )
}