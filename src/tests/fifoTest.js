import { fifo } from "../functions/fifo.js";
import assert from "assert";

function fifoTest() {
    fifoCorrect();
    fifoWrong();
}

function fifoCorrect() {
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
    
    fifo({target: {innerHTML: 'a', id:1}}, {style: {display: ""}}, dataElemsInCache, capacity, score, setScore, setDataElemsInCache, availableChars, setAvailableChars, {innerHTML:'f'}, 'f');

    assert(score === 1);
    assert(capacity === 5);
    
    setTimeout(() => {
        assert(dataElemsInCache[0].char === 'b');
        assert(dataElemsInCache[1].char === 'c');
        assert(dataElemsInCache[2].char === 'd');
        assert(dataElemsInCache[3].char === 'e');
        assert(dataElemsInCache[4].char === 'f');
    }, 2000);
}

// tests behavior when user is incorrect
function fifoWrong() {
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
    
    fifo({target: {innerHTML: 'b', id: 2}}, {style: {display: ""}}, dataElemsInCache, capacity, score, setScore, setDataElemsInCache, availableChars, setAvailableChars, {innerHTML:'f'}, 'f');

    assert(score === 0);
    assert(capacity === 5);
    
    setTimeout(() => {
        assert(dataElemsInCache[0].char === 'a');
        assert(dataElemsInCache[1].char === 'b');
        assert(dataElemsInCache[2].char === 'c');
        assert(dataElemsInCache[3].char === 'd');
        assert(dataElemsInCache[4].char === 'e');
    }, 2000);
}

fifoTest();