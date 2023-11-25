import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EvictionAlg from './components/EvictionAlg/EvictionAlg';
import Score from './components/Score/Score';
import DataElement from './components/DataElement/DataElement';
import Cache from './components/Cache/Cache';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from 'uuid';
import { Help } from "./components/Help/Help";
import { fifo } from "./functions/fifo.js";
import { lfu } from "./functions/lfu.js";
import { lru } from "./functions/lru.js";

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
  integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
  crossorigin="anonymous"
/>

function App() {
  let [globalCounter, setGlobalCounter] = useState(1); // for time in lru to trigger resets of time to 0
  const capacity = 5;
  let fifoChars = ['🦊', '🐉', '🐴', '🐷', '😜', '🍀', '😎', '🙈', '❤', '🧠', '🐢', '🕺', '🌺', '🦖'];
  let lfuChars = ['🦊', '🐉', '🐴', '🐷', '😜', '🐉', '🐷', '🐴', '🐴', '🍀', '🍀', '😎', '🍀', '🙈', '🙈', '❤', '🧠', '🐢', '🕺', '🌺', '🦖'];
  let [dataElemsInCache, setDataElemsInCache] = useState([]);
  let [availableChars, setAvailableChars] = useState(fifoChars);
  let [score, setScore] = useState(0);
  let [evictionAlg, setEvictionAlg] = useState("fifo");

  // initially filling the cache
  if (dataElemsInCache.length < capacity) {
    setTimeout(() => {
      const newChar = availableChars[0];
      setAvailableChars([...availableChars].splice(1));
      let newElem;
      if(evictionAlg === "fifo") {
        newElem = {id: uuidv4(), char: newChar, disabled: false};
      }
      else if (evictionAlg === "lfu") {
        newElem = {id: uuidv4(), char: newChar, hits: 1};
      } else {
        newElem = {id: uuidv4(), char: newChar, time: 0};
      }
      setDataElemsInCache([...dataElemsInCache, newElem]);
    }, 1000);
  }

  // handleClick takes an event and calls fifo, lfu, or lru depending on the eviction algorithm chosen in the EvictionAlg component
  function handleClick(e) {
    if(evictionAlg === "fifo") {
      fifo(e, dataElemsInCache, capacity, score, setScore, setDataElemsInCache, availableChars, setAvailableChars);
    }
    else if (evictionAlg === "lfu") {
      lfu(e, dataElemsInCache, capacity, score, setScore, availableChars, setAvailableChars, setDataElemsInCache);
    }
    else if (evictionAlg === "lru") {
      lru(e, dataElemsInCache, setDataElemsInCache, availableChars, setAvailableChars, capacity, score, setScore, globalCounter, setGlobalCounter);
    }
  }

  // reset everything when evictionAlg is changed
  useEffect(() => {
    // clearing timeouts to avoid flickering issue of data elems
    // source: https://stackoverflow.com/questions/8860188/javascript-clear-all-timeouts
    const highestId = window.setTimeout(() => {
      for (let i = highestId; i >= 0; i--) {
        window.clearInterval(i);
      }
    }, 0);

    document.getElementById("incomingElem").textContent = '🤷‍♂️'
    setScore(0);
    setDataElemsInCache([]);
    if (evictionAlg === "fifo") {
      setAvailableChars(fifoChars);
    } else if (evictionAlg === "lfu" || evictionAlg === "lru") {
      setAvailableChars(lfuChars);
    }
    console.log("eviction alg is " + evictionAlg);
  }, [evictionAlg]);


  return (
    <>
      <Container fluid className="p-4 ps-5">
        <Row>
          <Col md={{ span: 1, offset: 3 }}>
            <Help />
          </Col>
          <Col md={{ span: 4 }}><EvictionAlg setEvictionAlg={setEvictionAlg}></EvictionAlg></Col>
          <Col md={{ span: 2, offset: 2 }}><Score score={score}></Score></Col>
        </Row>
        <Row><div id="invisibleSpace" style={{lineHeight: 15}} className="invisible">vertical space</div></Row>
        <Row>
          <Col md={{ span:1 }}>
            <DataElement id="incomingElem" char='🤷‍♂️' addBottomMargin="mb-1 mt-5"></DataElement>
          </Col>
            <Col md={{span:10, offset:1}}>
              <Cache id="cache" dataElems={dataElemsInCache} onClick={handleClick} evictionAlg={evictionAlg}></Cache>
            </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
