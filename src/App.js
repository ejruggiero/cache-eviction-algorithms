import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EvictionAlg from './EvictionAlg';
import Score from './Score';
import 'bootstrap/dist/css/bootstrap.min.css';
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
  integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
  crossorigin="anonymous"
/>

function App() {
  return (
    <>
      <Container fluid className="m-4">
        {/* <Row className="justify-content-md-end">
          <Col lg="2">
            <Score></Score>
        </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col lg="3">
            <EvictionAlg></EvictionAlg>
          </Col>
        </Row> */}
        <Row>
          <Col md={{ span: 3, offset: 4 }}><EvictionAlg></EvictionAlg></Col>
          <Col md={{ span: 2, offset: 3 }}><Score></Score></Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
