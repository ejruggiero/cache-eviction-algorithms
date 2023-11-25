import { v4 as uuidv4 } from 'uuid';

export function lru(e, dataElemsInCache, setDataElemsInCache, availableChars, setAvailableChars, capacity, score, setScore, globalCounter, setGlobalCounter) {
    const target = findLruTarget(dataElemsInCache);
    console.log("target: ", target);
    const incomingElemEmoji = document.getElementById("incomingElem").textContent;
    const originalEmoji = document.getElementById(e.target.id).textContent;
    console.log("availablechars: ", availableChars);
    var elem = document.getElementById(e.target.id);

    if (dataElemsInCache.length === capacity && target.id === e.target.id) {
      console.log("correct")
      document.getElementById(e.target.id).disabled = "disabled";
      document.getElementById(e.target.id).textContent = '✅';
      setScore(score+1);
      setGlobalCounter(globalCounter+1);
      console.log("globalCounter: ", globalCounter);

      let tempArr = availableChars.map((x) => x);
      tempArr.push(originalEmoji); // adding the clicked emoji back to available chars
      tempArr.shift(); // removing the emoji that became incoming elem
      setAvailableChars(tempArr);

      // if it is a hit
      if (incomingElemEmoji === target.char) {
        setTimeout(() => {
          tempArr = dataElemsInCache.map((x) => x);
          const foundIndex = tempArr.findIndex(x => x.id === target.id);
          tempArr[foundIndex] = {id: target.id, char: target.char, time: globalCounter};
          setDataElemsInCache(tempArr);
          if (elem) {
            elem.textContent = originalEmoji;
            elem.disabled = "";
          }
          // update incoming elem
          document.getElementById("incomingElem").textContent = availableChars[0];
        }, 2000);
      } else { // if not a hit
        tempArr = dataElemsInCache.filter(function(elem) {
          return elem.id !== target.id;
        });
        tempArr[capacity-1] = {id: uuidv4(), char: incomingElemEmoji, time:0};
        setTimeout(() => {
          setDataElemsInCache(tempArr);
          // update incoming elem
          document.getElementById("incomingElem").textContent = availableChars[0];
        }, 2000);
      }
      // incorrect answer
    } else if (dataElemsInCache.length === capacity) {
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

function findLruTarget(dataElemsInCache) {
    let maxTime = Number.MIN_SAFE_INTEGER;
    let maxElem;
    const incomingEmoji = document.getElementById("incomingElem").textContent;
    const times = dataElemsInCache.map(elem => {
      return [parseInt(document.getElementById("countLabel"+elem.id).textContent.replace(document.getElementById(elem.id).textContent, '')), elem];
    })
    //console.log("times: ", times);
    for (let i = 0; i < times.length; i++) {
      let elem = times[i][1];
      let time = times[i][0];
      //console.log("times[",i,"][0] = ", time, ", maxTime = ", maxTime);
      if (elem.char === incomingEmoji) {
        //console.log("elem == incomingElem")
        return elem;
      }
      if (time > maxTime)  {
        //console.log(time, " > ", maxTime);
        maxElem = elem;
        maxTime = time;
      }
    }
    //console.log('maxTime: ', maxTime);
    return maxElem;
}