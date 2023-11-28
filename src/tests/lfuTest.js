import { lfu } from "../functions/lfu.js";
import assert from "assert";

function lfuTest() {
    lfuCorrect();
}

// tests behavior of lfu when user is correct
function lfuCorrect() {
    let dataElemsInCache = [{id: 1, char: 'a', hits: 2}, {id: 2, char: 'b', hits: 2}, {id: 3, char: 'c', hits: 1}, {id: 4, char: 'd', hits: 4}, {id: 5, char: 'e', hits: 4}];
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

    // signature: lfu(e, clickedElem, dataElemsInCache, capacity, score, setScore, availableChars, setAvailableChars, setDataElemsInCache, incomingElem, incomingElemEmoji)
    lfu({target: {innerHTML: 'c', id:3}}, {}, dataElemsInCache, capacity, score, setScore, availableChars, setAvailableChars, setDataElemsInCache, {innerHTML:'f'}, 'f');

    assert(score === 1);
    assert(dataElemsInCache.length === 5);
    
    setTimeout(() => {
        assert(dataElemsInCache[0].char === 'a');
        assert(dataElemsInCache[1].char === 'b');
        assert(dataElemsInCache[2].char === 'd');
        assert(dataElemsInCache[3].char === 'e');
        assert(dataElemsInCache[4].char === 'f');
    }, 2000);
}

// tests behavior of lfu when user is incorrect
function lfuIncorrect() {
    let dataElemsInCache = [{id: 1, char: 'a', hits: 2}, {id: 2, char: 'b', hits: 2}, {id: 3, char: 'c', hits: 1}, {id: 4, char: 'd', hits: 4}, {id: 5, char: 'e', hits: 4}];
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

    lfu({target: {innerHTML: 'e', id:3}}, {}, dataElemsInCache, capacity, score, setScore, availableChars, setAvailableChars, setDataElemsInCache, {innerHTML:'f'}, 'f');

    assert(score === 0);
    assert(dataElemsInCache.length === 5);
    
    setTimeout(() => {
        assert(dataElemsInCache[0].char === 'a');
        assert(dataElemsInCache[1].char === 'b');
        assert(dataElemsInCache[2].char === 'c');
        assert(dataElemsInCache[3].char === 'd');
        assert(dataElemsInCache[4].char === 'e');
    }, 2000);
}
lfuTest();