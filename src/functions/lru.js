import { v4 as uuidv4 } from 'uuid';

export function lru(e, clickedElem, dataElemsInCache, setDataElemsInCache, availableChars, setAvailableChars, capacity, score, setScore, lruChangeCounter, setlruChangeCounter, incomingElem, incomingElemEmoji, times) {
    const target = findLruTarget(incomingElemEmoji, times);
    const originalEmoji = clickedElem.textContent;
    
    if (dataElemsInCache.length === capacity && target.id === e.target.id) {
      clickedElem.disabled = "disabled";
      clickedElem.textContent = '✅';
      setScore(score+1);
      setlruChangeCounter(lruChangeCounter+1);

      let tempArr = availableChars.map((x) => x);
      tempArr.push(originalEmoji); // adding the clicked emoji back to available chars
      tempArr.shift(); // removing the emoji that became incoming elem
      setAvailableChars(tempArr);

      // if it is a hit
      if (incomingElemEmoji === target.char) {
        setTimeout(() => {
          tempArr = dataElemsInCache.map((x) => x);
          const foundIndex = tempArr.findIndex(x => x.id === target.id);
          tempArr[foundIndex] = {id: target.id, char: target.char, lruChange: lruChangeCounter};
          setDataElemsInCache(tempArr);

          clickedElem.textContent = originalEmoji;
          clickedElem.disabled = "";

          // update incoming elem
          incomingElem.textContent = availableChars[0];
        }, 2000);
      } else { // if not a hit
        tempArr = dataElemsInCache.filter(function(elem) {
          return elem.id !== target.id;
        });
        tempArr[capacity-1] = {id: uuidv4(), char: incomingElemEmoji, lruChange:0};
        setTimeout(() => {
          setDataElemsInCache(tempArr);
          // update incoming elem
          incomingElem.textContent = availableChars[0];
        }, 2000);
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

function findLruTarget(incomingElemEmoji, times) {
    let maxTime = Number.MIN_SAFE_INTEGER;
    let maxElem;

    for (let i = 0; i < times.length; i++) {
      let elem = times[i][1];
      let time = times[i][0];
      if (elem.char === incomingElemEmoji) {
        return elem;
      }
      if (time > maxTime)  {
        maxElem = elem;
        maxTime = time;
      }
    }
    return maxElem;
}