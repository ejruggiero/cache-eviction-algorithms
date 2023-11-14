import { v4 as uuidv4 } from 'uuid';

export function lfu(e, dataElemsInCache, capacity, score, setScore, availableChars, setAvailableChars, setDataElemsInCache) {
    console.log('dataelemsincache[0]: ', dataElemsInCache[0]);
    console.log("in lfu");
    const target = findLfuTarget(dataElemsInCache);
    console.log('target: ', target);
    console.log('data elems in cache: ', dataElemsInCache);
    const incomingElemEmoji = document.getElementById("incomingElem").textContent;
    const originalEmoji = document.getElementById(e.target.id).textContent;
    if (dataElemsInCache.length === capacity && target.id === e.target.id) {

      document.getElementById(e.target.id).disabled = "disabled";
      document.getElementById(e.target.id).textContent = '✅';
      setScore(score+1);
      // if user clicks on correct elem
      if (originalEmoji === target.char) {
        let tempArr = availableChars.map((x) => x);
        tempArr.push(originalEmoji); // adding the clicked emoji back to available chars
        tempArr.shift(); // removing the emoji that became incoming elem
        setAvailableChars(tempArr);
        // if it is a hit
        if (incomingElemEmoji === target.char) {
          console.log("incomingElemEmoji === target.char");
          setTimeout(() => {
            // setDataElemsInCache(dataElemsInCache.map((x) => {return {id: x.id, char: x.char, count: x.count+1}}));
            tempArr = dataElemsInCache.map((x) => x);
            const foundIndex = tempArr.findIndex(x => x.id === target.id);
            tempArr[foundIndex] = {id: target.id, char: target.char, hits: target.hits+1};
            setDataElemsInCache(tempArr);
            var elem = document.getElementById(e.target.id);
            if (elem) {
              elem.textContent = originalEmoji;
              elem.disabled = "";
            }
              // update incoming elem
            document.getElementById("incomingElem").textContent = availableChars[0];
          }, 2000);
        } else { // if its not a hit, evict
          tempArr = dataElemsInCache.filter(function(elem) {
              return elem.id !== target.id;
          });
          tempArr[capacity-1] = {id: uuidv4(), char: document.getElementById("incomingElem").innerHTML, hits:1};
          setTimeout(() => {
            setDataElemsInCache(tempArr);
            // update incoming elem
            document.getElementById("incomingElem").textContent = availableChars[0];
          }, 2000);
        }
      }
    } else if (dataElemsInCache.length === capacity) {
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

  // for LFU. returns elem in cache that is target: either it is the incoming elem or
  // it has lowest count, tie breaking by LRU
  function findLfuTarget(dataElemsInCache) {
    // find earliest min count or return incoming elem if in cache
    let minCount = Number.MAX_SAFE_INTEGER;
    let minElem;
    const incomingEmoji = document.getElementById("incomingElem").textContent;
    for (let i = 0; i < dataElemsInCache.length; i++) {
      const elem = dataElemsInCache[i];
      if (elem.char === incomingEmoji) return elem;
      //console.log('elem.count: ', elem.count);
      if (elem.hits < minCount)  {
        minElem = elem;
        minCount = elem.hits;
      }
      console.log('minCount: ', minCount);
    }
    return minElem;
}