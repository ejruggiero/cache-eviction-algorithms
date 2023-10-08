import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EvictionAlg from './EvictionAlg';
import Score from './Score';
import DataElement from './DataElement';
import Cache from './Cache';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
  integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
  crossorigin="anonymous"
/>


function App() {
  let chars = [{char: '🦊'}, {char: '🐴'}, {char: '🐷'}, {char:'😜'}, {char:'😎'}, {char:'🙈'}, {char:'❤'}, {char:'🧠'}]
  let availableChars = chars
  let dataElems = availableChars.slice(0, 5)

  useEffect(() => {

  })
  return (
    <>
      <Container fluid className="p-4 ps-5">
        <Row>
          <Col md={{ span: 3, offset: 4 }}><EvictionAlg></EvictionAlg></Col>
          <Col md={{ span: 2, offset: 3 }}><Score></Score></Col>
        </Row>
        <Row><div style={{lineHeight: 15}} class="invisible">vertical space</div></Row>
        <Row>
          <Col md={{ span:2, offset:1}}>
            <div style={{lineHeight: 3}} class="invisible">vertical space</div>
            <DataElement char='🤷‍♂️'></DataElement>
          </Col>
          <Col md={{span:8, offset:1}}>
            <Cache dataElems={dataElems}></Cache>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
