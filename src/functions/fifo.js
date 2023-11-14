import { v4 as uuidv4 } from 'uuid';

export function fifo(e, dataElemsInCache, capacity, score, setScore, setDataElemsInCache, availableChars, setAvailableChars) {
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
      //console.log("incorrect");
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