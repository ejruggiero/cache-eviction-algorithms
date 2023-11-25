import { v4 as uuidv4 } from 'uuid';

export function fifo(e, clickedElem, dataElemsInCache, capacity, score, setScore, setDataElemsInCache, availableChars, setAvailableChars, incomingElem, incomingElemEmoji) {
    const originalEmoji = e.target.innerHTML;
    //console.log("dataElemsAndCounts: ", dataElemsAndCounts);
    // if elem clicked is correct
    if (dataElemsInCache.length === capacity && dataElemsInCache[0].id === e.target.id) {
        clickedElem.disabled = "disabled";
        clickedElem.textContent = '✅';

        setScore(score+1);
        setTimeout(() => {
            // update elems in cache
            let tempArr = dataElemsInCache.map((x) => x);
            tempArr.shift();
            tempArr[capacity-1] = {id: uuidv4(), char: incomingElemEmoji};
            clickedElem.style.display = "none"; // remove earliest added elem
            incomingElem.textContent = availableChars[0];
            //} else tempArr[capacity-1] = {id: tempArr[3].id+1, char: String.fromCharCode(tempArr[3].char.charCodeAt(0) + 1)};
            setDataElemsInCache(tempArr);

            tempArr = availableChars.map((x) => x);
            tempArr.push(originalEmoji); // adding the clicked emoji back to available chars
            tempArr.shift(); // removing the emoji that became incoming elem
            setAvailableChars(tempArr);
      }, 2000);
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