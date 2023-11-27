import { lfu } from "../functions/lfu.js";
import assert from "assert";

let dataElemsInCache = [{id: 1, char: 'a', hits: 1}, {id: 2, char: 'b', hits: 1}, {id: 3, char: 'c', hits: 1}, {id: 4, char: 'd', hits: 1}, {id: 5, char: 'e', hits: 1}];
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
function lfuTest() {
    // signature: lfu(e, clickedElem, dataElemsInCache, capacity, score, setScore, availableChars, setAvailableChars, setDataElemsInCache, incomingElem, incomingElemEmoji)
    lfu({target: {innerHTML: 'a', id:1}}, {}, dataElemsInCache, capacity, score, setScore, availableChars, setAvailableChars, setDataElemsInCache, {innerHTML:'f'}, 'f');

    assert(score === 1);
    assert(capacity === 5);
    
    setTimeout(() => {
        //console.log(dataElemsInCache);
        //assert(dataElemsInCache[4].id === 6);
        assert(dataElemsInCache[4].char === 'f');
    }, 2000);
}

lfuTest();