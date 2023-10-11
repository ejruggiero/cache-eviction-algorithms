import React from 'react'
import DataElement from './DataElement'
import { Row, Col } from 'react-bootstrap'

export default function Cache({dataElems, onClick}) {
    const rows = [];
    for (let i = 0; i < dataElems.length; i++) {
        // note: we are adding a key prop here to allow react to uniquely identify each
        // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
        //rows.push(<Col><DataElement key={dataElems[i].id} id={dataElems[i].id} char={dataElems[i].char} onClick={onClick} dataElems={dataElems}/></Col>);
        rows.push(<DataElement key={dataElems[i].id} id={dataElems[i].id} char={dataElems[i].char} onClick={onClick} dataElems={dataElems}/>);
        //rows.push(<Col md={{span:1}}></Col>);
    }
    return (
    
    <div class="bg-secondary rounded" style={{"height" : "100%"}}>
        <Row>
            {/* <button id="cacheInitialHeight" class="btn btn-xl btn-circle invisible"></button>
            <Col md={{span:1}}></Col> */}
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
