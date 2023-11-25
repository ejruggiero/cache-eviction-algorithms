/* eslint-disable react-hooks/rules-of-hooks */
import { fifo } from "../functions/fifo.js";
import assert from "assert";

// import pkg from '../functions/fifo.js';
// const { fifo } = pkg;

let dataElemsInCache = [{id: 1, char: 'a'}, {id: 2, char: 'b'}, {id: 3, char: 'c'}, {id: 4, char: 'd'}, {id: 5, char: 'e'}];
let capacity = 5;
let score = 0;
function setScore(newScore) {
    score = newScore;
}
function setDataElemsInCache(newDataElemsInCache) {
    dataElemsInCache = newDataElemsInCache;
}
let availableChars = [];
function setAvailableChars(newAvailableChars) {
    availableChars = newAvailableChars;
}
function fifoTest() {
    fifo({target: {innerHTML: 'a', id:1}}, dataElemsInCache, capacity, score, setScore, setDataElemsInCache, availableChars, setAvailableChars, true);
    //{id: uuidv4(), char: newChar}
    //let [dataElemsInCache, setDataElemsInCache] = useState([]);
    assert.ok(true);

    assert(score === 1);
    assert(capacity === 5);
    //console.log(dataElemsInCache);
    
    setTimeout(() => {
        //console.log(dataElemsInCache);
        assert(dataElemsInCache[4].id === 6);
        assert(dataElemsInCache[4].char === 'f');
    }, 2000);
}

fifoTest();