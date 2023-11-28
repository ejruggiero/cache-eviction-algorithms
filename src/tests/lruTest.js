import { lru } from "../functions/lru.js";
import assert from "assert";

function lruTest() {
    lruCorrect();
    lruIncorrect();
}

function lruCorrect() {
    let dataElemsInCache = [{id: 1, char: 'a', time: 0}, {id: 2, char: 'b', time: 0}, {id: 3, char: 'c', time: 0}, {id: 4, char: 'd', time: 0}, {id: 5, char: 'e', time: 0}];
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
    let globalCounter = 1;
    function setGlobalCounter(newCount) {
        globalCounter = newCount;
    }

    let time = 15;
    let times = dataElemsInCache.map(elem => {
        time--;
        return [time, elem];
    })
    // signature: lru(e, clickedElem, dataElemsInCache, setDataElemsInCache, availableChars, setAvailableChars, capacity, score, setScore, globalCounter, setGlobalCounter, incomingElem, incomingElemEmoji, times)
    lru({target: {innerHTML: 'a', id:1}}, {char:'a'}, dataElemsInCache, setDataElemsInCache, availableChars, setAvailableChars, capacity, score, setScore, globalCounter, setGlobalCounter, {innerHTML:'f'}, 'f', times);

    assert(score === 1);
    assert(dataElemsInCache.length === 5);
    
    setTimeout(() => {
        assert(dataElemsInCache[0].char === 'b');
        assert(dataElemsInCache[1].char === 'c');
        assert(dataElemsInCache[2].char === 'd');
        assert(dataElemsInCache[3].char === 'e');
        assert(dataElemsInCache[4].char === 'f');
    }, 2000);
}

function lruIncorrect() {
    let dataElemsInCache = [{id: 1, char: 'a', time: 0}, {id: 2, char: 'b', time: 0}, {id: 3, char: 'c', time: 0}, {id: 4, char: 'd', time: 0}, {id: 5, char: 'e', time: 0}];
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
    let globalCounter = 1;
    function setGlobalCounter(newCount) {
        globalCounter = newCount;
    }

    let time = 15;
    let times = dataElemsInCache.map(elem => {
        time--;
        return [time, elem];
    })
    // signature: lru(e, clickedElem, dataElemsInCache, setDataElemsInCache, availableChars, setAvailableChars, capacity, score, setScore, globalCounter, setGlobalCounter, incomingElem, incomingElemEmoji, times)
    lru({target: {innerHTML: 'c', id:3}}, {char:'c'}, dataElemsInCache, setDataElemsInCache, availableChars, setAvailableChars, capacity, score, setScore, globalCounter, setGlobalCounter, {innerHTML:'f'}, 'f', times);

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

lruTest();