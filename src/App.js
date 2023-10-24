import './App.css';
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
import { Popup } from "./components/Popup/Popup";
import Counts from "./components/Counts/Counts";

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
  let [open, setOpen] = useState(true); // handles popup
  let [evictionAlg, setEvictionAlg] = useState("fifo");
  let [countsVisibility, setCountsVisibility] = useState("invisible"); // "" or "invisible"

  // initially filling the cache
  if (dataElemsInCache.length < capacity) {
    console.log("INIT TRIGGERED")
    setTimeout(() => {
      setDataElemsInCache([...dataElemsInCache, {id: uuidv4(), char: availableChars[0]}]);
      setAvailableChars([...availableChars].splice(1));
      console.log(availableChars);
    }, 1000);
  }
  
  function fifo(e) {
    const originalEmoji = e.target.innerHTML;
    // if elem clicked is correct
    if (dataElemsInCache.length === capacity && dataElemsInCache[0].id === e.target.id) {
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
      var elem = document.getElementById(e.target.id);
      if (elem) {
        elem.textContent = '❌';
        elem.disabled = "disabled";
      }
      setTimeout(() => {
        if (elem) {
          elem.textContent = originalEmoji;
          elem.disabled = "";
        }
      }, 1000);
    }
  }

  function lfu(e) {
    console.log("in lfu");
  }

  function handleClick(e) {
    if(evictionAlg === "fifo") {
      fifo(e);
    }
    else if (evictionAlg === "lfu") {
      lfu(e);
    }
  }

  // set line height of invisible space based on eviction alg to make sure
  // cache is always visible
  // show counts table if eviction alg is not fifo
  useEffect(() => {
    if (evictionAlg === "fifo") {
      setCountsVisibility("invisible")
      // document.getElementById("invisibleSpace").style.lineHeight = "15";
      // console.log("line height: ", document.getElementById("invisibleSpace").style.lineHeight);
    } else {
      setCountsVisibility("");
      // document.getElementById("invisibleSpace").style.lineHeight = "5";
      // console.log("line height: ", document.getElementById("invisibleSpace").style.lineHeight);
    }
  }, [evictionAlg])

  // reset everything when evictionAlg is changed
  useEffect(() => {
    document.getElementById("incomingElem").textContent = '🤷‍♂️'
    setAvailableChars(chars);
    setScore(0);
    setDataElemsInCache([]);
    console.log("eviction alg is " + evictionAlg);
  }, [evictionAlg]);

  return (
    <>
      <Container fluid className="p-4 ps-5">
        <Row>
          <Col md={{ span:1 }}>
            <Counts className={countsVisibility}></Counts>
          </Col>
          <Col md={{ span: 1, offset: 2 }}>
          <button className="btn bg-warning text-center rounded mt-1" style={{fontSize: "30px"}} onClick={() => setOpen(true)}>Help</button>
  {open ? <Popup text="Hello!" closePopup={() => setOpen(false)} /> : null}
          </Col>
          <Col md={{ span: 4 }}><EvictionAlg setEvictionAlg={setEvictionAlg}></EvictionAlg></Col>
          <Col md={{ span: 2, offset: 2 }}><Score score={score}></Score></Col>
        </Row>
        <Row><div id="invisibleSpace" style={{lineHeight: 3}} className="invisible">vertical space</div></Row>
        <Row>
          <Col md={{ span:1 }}>
            <DataElement id="incomingElem" char='🤷‍♂️' addBottomMargin="mb-5"></DataElement>
          </Col>
            <Col md={{span:10, offset:1}}>
              <Cache id="cache" dataElems={dataElemsInCache} onClick={handleClick}></Cache>
            </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
