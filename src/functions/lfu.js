import { v4 as uuidv4 } from 'uuid';

export function lfu(e, clickedElem, dataElemsInCache, capacity, score, setScore, availableChars, setAvailableChars, setDataElemsInCache, incomingElem, incomingElemEmoji) {
    const target = findLfuTarget(dataElemsInCache, incomingElemEmoji);
    const originalEmoji = e.target.innerHTML;
    if (dataElemsInCache.length === capacity && target.id === e.target.id) {
      clickedElem.disabled = "disabled";
      clickedElem.textContent = '✅';
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
            tempArr = dataElemsInCache.map((x) => x);
            const foundIndex = tempArr.findIndex(x => x.id === target.id);
            tempArr[foundIndex] = {id: target.id, char: target.char, hits: target.hits+1};
            setDataElemsInCache(tempArr);
              clickedElem.textContent = originalEmoji;
              clickedElem.disabled = "";
                // update incoming elem
              incomingElem.textContent = availableChars[0];
          }, 2000);
        } else { // if its not a hit, evict
          tempArr = dataElemsInCache.filter(function(elem) {
              return elem.id !== target.id;
          });
          tempArr[capacity-1] = {id: uuidv4(), char: incomingElemEmoji, hits:1};
          setTimeout(() => {
            setDataElemsInCache(tempArr);
            // update incoming elem
            incomingElem.textContent = availableChars[0];
          }, 2000);
        }
      }
    // if elem clicked is incorrect
    } else if (dataElemsInCache.length === capacity) {
      clickedElem.textContent = '❌';
      clickedElem.disabled = "disabled";
      setTimeout(() => {
        clickedElem.textContent = originalEmoji;
        clickedElem.disabled = "";
      }, 1000);
    }
  }

  // for LFU. returns elem in cache that is target: either it is the incoming elem or
  // it has lowest count, tie breaking by LRU
  function findLfuTarget(dataElemsInCache, incomingElemEmoji) {
    // find earliest min count or return incoming elem if in cache
    let minCount = Number.MAX_SAFE_INTEGER;
    let minElem;
    for (let i = 0; i < dataElemsInCache.length; i++) {
      const elem = dataElemsInCache[i];
      if (elem.char === incomingElemEmoji) return elem;
      //console.log('elem.count: ', elem.count);
      if (elem.hits < minCount)  {
        minElem = elem;
        minCount = elem.hits;
      }
      //console.log('minCount: ', minCount);
    }
    return minElem;
}