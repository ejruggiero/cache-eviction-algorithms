import React from 'react'
import DataElement from './DataElement'
import { Row, Col } from 'react-bootstrap'

export default function Cache({dataElems}) {
    const rows = [];
    for (let i = 0; i < dataElems.length; i++) {
        // note: we are adding a key prop here to allow react to uniquely identify each
        // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
        rows.push(<DataElement key={i} char={dataElems[i].char}/>);
        rows.push(<Col md={{span:1}}></Col>);
    }
    return (
    
    <div class="p-5 bg-secondary rounded">
        <Row>
            {rows}
        </Row>
        {/* <Row>
            <DataElement></DataElement>
            <Col md={{span:1}}></Col>
            <DataElement></DataElement>
            <Col md={{span:1}}></Col>
            <DataElement></DataElement>
            <Col md={{span:1}}></Col>
            <DataElement></DataElement>
            <Col md={{span:1}}></Col>
            <DataElement></DataElement>
        </Row> */}
    </div>

  )
}
