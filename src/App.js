import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EvictionAlg from './EvictionAlg';
import Score from './Score';
import DataElement from './DataElement';
import Cache from './Cache';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from 'uuid';

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
  integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
  crossorigin="anonymous"
/>

// sources:
//https://stackoverflow.com/questions/373157/how-can-i-pass-a-reference-to-a-function-with-parameters
// https://stackoverflow.com/questions/321113/how-can-i-pre-set-arguments-in-javascript-function-call-partial-function-appli
function partial(func /*, 0..n args */) {
  var args = Array.prototype.slice.call(arguments, 1);
  return function() {
    var allArguments = args.concat(Array.prototype.slice.call(arguments));
    return func.apply(this, allArguments);
  };
}

function App() {
  const capacity = 5;
  let chars = ['🦊', '🐉', '🐴', '🐷', '😜', '🍀', '😎', '🙈', '❤', '🧠', '🐢', '🕺', '🌺', '🦖']
  let [dataElemsInCache, setDataElemsInCache] = useState([]);
  let [availableChars, setAvailableChars] = useState(chars);
  let [score, setScore] = useState(0);

  // initially filling the cache
  if (dataElemsInCache.length < capacity) {
    console.log("INIT TRIGGERED")
    //document.getElementById("cacheInitialHeight").style.display = "none";
    setTimeout(() => {
      setDataElemsInCache([...dataElemsInCache, {id: uuidv4(), char: availableChars[0]}]);
      setAvailableChars([...availableChars].splice(1));
      console.log(availableChars);
    }, 1000);
  }
  
  function fifoEvict(e) {
    const originalEmoji = e.target.innerHTML;
    // if elem clicked is correct
    if (dataElemsInCache.length === capacity && dataElemsInCache[0].id === e.target.id) {
      console.log("clicked")
      console.log(e)
      document.getElementById(e.target.id).disabled = "disabled";
      document.getElementById(e.target.id).textContent = '✅';
      setScore(score+1);
      setTimeout(() => {
        document.getElementById(e.target.id).style.display = "none"; // remove earliest added elem
        // update elems in cache
        let tempArr = dataElemsInCache.map((x) => x);
        tempArr.shift();
        tempArr[capacity-1] = {id: uuidv4(), char: document.getElementById("incomingElem").innerHTML};
        setDataElemsInCache(tempArr);

        document.getElementById("incomingElem").textContent = availableChars[0];

        tempArr = availableChars.map((x) => x);
        tempArr.push(originalEmoji); // adding the clicked emoji back to available chars
        tempArr.shift(); // removing the emoji that became incoming elem
        setAvailableChars(tempArr);

      }, 3000);
    // if elem clicked is incorrect
    } else if (dataElemsInCache.length === capacity) {
      console.log("incorrect");
      document.getElementById(e.target.id).textContent = '❌';
      document.getElementById(e.target.id).disabled = "disabled";
      setTimeout(() => {
        document.getElementById(e.target.id).textContent = originalEmoji;
        document.getElementById(e.target.id).disabled = "";
      }, 1000);
    }
  }

  return (
    <>
      <Container fluid className="p-4 ps-5">
        <Row>
          <Col md={{ span: 4, offset: 4 }}><EvictionAlg></EvictionAlg></Col>
          <Col md={{ span: 2, offset: 2 }}><Score score={score}></Score></Col>
        </Row>
        <Row><div style={{lineHeight: 15}} class="invisible">vertical space</div></Row>
        <Row>
          <Col md={{ span:1}}>
            {/* <div style={{lineHeight: 1}} class="invisible">vertical space</div> */}
            <DataElement id="incomingElem" char='🤷‍♂️' addBottomMargin="mb-5"></DataElement>
          </Col>
            <Col md={{span:10, offset:1}}>
              <Cache dataElems={dataElemsInCache} onClick={fifoEvict}></Cache>
            </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
