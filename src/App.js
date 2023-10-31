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
  // let chars = ['🦊', '🐉', '🐴', '🐷', '😜', '🍀', '😎', '🙈', '❤', '🧠', '🐢', '🕺', '🌺', '🦖']
  let fifoChars = ['🦊', '🐉', '🐴', '🐷', '😜', '🍀', '😎', '🙈', '❤', '🧠', '🐢', '🕺', '🌺', '🦖'];
  let lfuChars = ['🦊', '🐉', '🐴', '🐷', '😜', '🐉', '🐷', '🐴', '🐴', '🍀', '🍀', '😎', '🍀', '🙈', '🙈', '❤', '🧠', '🐢', '🕺', '🌺', '🦖'];
  let [dataElemsInCache, setDataElemsInCache] = useState([]);
  // let [availableChars, setAvailableChars] = useState(chars);
  let [availableChars, setAvailableChars] = useState(fifoChars);
  let [score, setScore] = useState(0);
  let [open, setOpen] = useState(true); // handles popup
  let [evictionAlg, setEvictionAlg] = useState("fifo");
  let [countsVisibility, setCountsVisibility] = useState("invisible"); // "" or "invisible"
  //let [dataElemsAndCounts, setDataElemsAndCounts] = useState([]);
  let [disabledEvictionAlg, setDisabledEvictionAlg] = useState("true"); // "" or "true"

  // initially filling the cache
  if (dataElemsInCache.length < capacity) {
    console.log("INIT TRIGGERED")
    setTimeout(() => {
      const newChar = availableChars[0];
      setAvailableChars([...availableChars].splice(1));
      //console.log(availableChars);
      let newElem;
      if(evictionAlg === "fifo") {
        newElem = {id: uuidv4(), char: newChar};
      }
      else {
        newElem = {id: uuidv4(), char: newChar, count: 1};
      }
      setDataElemsInCache([...dataElemsInCache, newElem]);
      
      //setDisabledEvictionAlg("");
      if (dataElemsInCache.length === capacity-1) {
        console.log("capacity is full");
        setDisabledEvictionAlg("");
      }
    }, 1000);
  }
  
  function fifo(e) {
    const originalEmoji = e.target.innerHTML;
    //console.log("dataElemsAndCounts: ", dataElemsAndCounts);
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

      }, 2000);
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
    console.log('dataelemsincache[0]: ', dataElemsInCache[0]);
    console.log("in lfu");
    const target = findTarget();
    console.log('target: ', target);
    console.log('data elems in cache: ', dataElemsInCache);
    const incomingElemEmoji = document.getElementById("incomingElem").textContent;
    if (dataElemsInCache.length === capacity && target.id === e.target.id) {
      const clickedEmoji = document.getElementById(e.target.id).textContent;

      document.getElementById(e.target.id).disabled = "disabled";
      document.getElementById(e.target.id).textContent = '✅';
      setScore(score+1);
      // if user clicks on correct elem
      if (clickedEmoji === target.char) {
        let tempArr = availableChars.map((x) => x);
        tempArr.push(clickedEmoji); // adding the clicked emoji back to available chars
        tempArr.shift(); // removing the emoji that became incoming elem
        setAvailableChars(tempArr);
        // if it is a hit
        if (incomingElemEmoji === target.char) {
          console.log("incomingElemEmoji === target.char");
          setTimeout(() => {
            // setDataElemsInCache(dataElemsInCache.map((x) => {return {id: x.id, char: x.char, count: x.count+1}}));
            tempArr = dataElemsInCache.map((x) => x);
            const foundIndex = tempArr.findIndex(x => x.id === target.id);
            tempArr[foundIndex] = {id: target.id, char: target.char, count: target.count+1};
            setDataElemsInCache(tempArr);
            var elem = document.getElementById(e.target.id);
            if (elem) {
              elem.textContent = clickedEmoji;
              elem.disabled = "";
            }
            // update incoming elem
            document.getElementById("incomingElem").textContent = availableChars[0];
          }, 2000);
        } else { // if its not a hit, evict
          tempArr = dataElemsInCache.filter(function(elem) {
              return elem.id !== target.id;
          });
          tempArr[capacity-1] = {id: uuidv4(), char: document.getElementById("incomingElem").innerHTML, count:1};
          setTimeout(() => {
            setDataElemsInCache(tempArr);
            // update incoming elem
            document.getElementById("incomingElem").textContent = availableChars[0];
          }, 2000);
        }
      }
    }
  }

  // returns elem in cache that is target: either it is the incoming elem or
  // it has lowest count, tie breaking by LRU
  function findTarget() {
    // find earliest min count or return incoming elem if in cache
    let minCount = Number.MAX_SAFE_INTEGER;
    let minElem;
    const incomingEmoji = document.getElementById("incomingElem").textContent;
    // dataElemsInCache.forEach(function (elem) {
    //   if (elem.char === incomingEmoji) return elem;
    //   if (elem.count < minCount)  minElem = elem;
    // });
    for (let i = 0; i < dataElemsInCache.length; i++) {
      const elem = dataElemsInCache[i];
      if (elem.char === incomingEmoji) return elem;
      //console.log('elem.count: ', elem.count);
      if (elem.count < minCount)  {
        minElem = elem;
        minCount = elem.count;
      }
      console.log('minCount: ', minCount);
    }
    return minElem;
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
  // useEffect(() => {
  //   if (evictionAlg === "fifo") {
  //     setCountsVisibility("invisible")
  //     document.getElementById("invisibleSpace").style.lineHeight = "15";
  //   } else {
  //     setCountsVisibility("");
  //     document.getElementById("invisibleSpace").style.lineHeight = "5";
  //   }
  // }, [evictionAlg]);

  // reset everything when evictionAlg is changed
  useEffect(() => {
    document.getElementById("incomingElem").textContent = '🤷‍♂️'
    // setAvailableChars(chars);
    setScore(0);
    setDataElemsInCache([]);
    //setDataElemsAndCounts([]);
    setDisabledEvictionAlg("true");
    if (evictionAlg === "fifo") {
      setAvailableChars(fifoChars);
    } else if (evictionAlg === "lfu") {
      setAvailableChars(lfuChars);
    }
    console.log("eviction alg is " + evictionAlg);
  }, [evictionAlg]);

  return (
    <>
      <Container fluid className="p-4 ps-5">
        <Row>
          {/* <Col md={{ span:1 }}>
            <Counts className={countsVisibility} dataElemsAndCounts={dataElemsAndCounts}></Counts>
          </Col> */}
          <Col md={{ span: 1, offset: 3 }}>
          <button className="btn bg-warning text-center rounded mt-1" style={{fontSize: "30px"}} onClick={() => setOpen(true)}>Help</button>
  {open ? <Popup text={[<h1>Welcome!</h1>, <p>Hello! Here you will learn three important cache eviction algorithms: first in first out (FIFO),
     least recently used (LRU), and least frequently used (LFU). Change the algorithm you wish to practice by toggling the dropdown at the top of the screen.</p>,
    <p>The cache is represented by a gray rectangle near the center of the screen. Data elements are represented as yellow circles with emojis 
     representing their data. Because the cache has a capacity of 5 data elements, there will be 5 data elements added to the cache. 
     The data element to the left of the cache represents an incoming data element that is to be added to the cache. Click on the data element 
     that should be removed. 
     Your score can be found at the top right corner of the screen. If you select the correct element to remove from the cache, then you will 
     gain a point.</p>,
     <p>You can reopen this popup at any time by clicking on the Help button.</p>]} closePopup={() => setOpen(false)} /> : null}
          </Col>
          <Col md={{ span: 4 }}><EvictionAlg setEvictionAlg={setEvictionAlg} disabled={disabledEvictionAlg}></EvictionAlg></Col>
          <Col md={{ span: 2, offset: 2 }}><Score score={score}></Score></Col>
        </Row>
        <Row><div id="invisibleSpace" style={{lineHeight: 15}} className="invisible">vertical space</div></Row>
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
