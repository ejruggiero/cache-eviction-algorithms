import React from 'react'
import Table from 'react-bootstrap/Table';

export default function Counts({className, dataElemsAndCounts}) {
  const rows = [];
  for (let i = 0; i < dataElemsAndCounts.length; i++) {
      rows.push(<tr><td>{dataElemsAndCounts[i].char}</td><td>{dataElemsAndCounts[i].count}</td></tr>);
  }
  // let char1, char2, char3, char4, char5;
  // let count1, count2, count3, count4, count5;
  // if (dataElemsAndCounts.length >= 1) {
  //   char1 = dataElemsAndCounts[0].char;
  //   count1 = dataElemsAndCounts[0].count;
  // }
  // if (dataElemsAndCounts.length >= 2) {
  //   char2 = dataElemsAndCounts[1].char;
  //   count2 = dataElemsAndCounts[1].count;
  // }
  // if (dataElemsAndCounts.length >= 3) {
  //   char3 = dataElemsAndCounts[2].char;
  //   count3 = dataElemsAndCounts[2].count;
  // }
  // if (dataElemsAndCounts.length >= 4) {
  //   char4 = dataElemsAndCounts[3].char;
  //   count4 = dataElemsAndCounts[3].count;
  // }
  // if (dataElemsAndCounts.length >= 5) {
  //   char5 = dataElemsAndCounts[4].char;
  //   count5 = dataElemsAndCounts[4].count;
  // }
  return (
    <Table striped bordered hover style={{fontSize: "35px"}} className={className}>
      <thead>
        <tr>
          <th>Data</th>
          <th>Hits</th>
        </tr>
      </thead>
      <tbody>
        {rows}
        {/* <tr><td>{char1}</td><td>{count1}</td></tr>
        <tr><td>{char2}</td><td>{count2}</td></tr>
        <tr><td>{char3}</td><td>{count3}</td></tr>
        <tr><td>{char4}</td><td>{count4}</td></tr>
        <tr><td>{char5}</td><td>{count5}</td></tr> */}
      </tbody>
    </Table>
  )
}