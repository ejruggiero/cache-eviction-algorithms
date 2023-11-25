import { v4 as uuidv4 } from 'uuid';

export function fifo(e, dataElemsInCache, capacity, score, setScore, setDataElemsInCache, availableChars, setAvailableChars, test) {
    const originalEmoji = e.target.innerHTML;
    //console.log("dataElemsAndCounts: ", dataElemsAndCounts);
    // if elem clicked is correct
    if (dataElemsInCache.length === capacity && dataElemsInCache[0].id === e.target.id) {
        if (!test) {
            document.getElementById(e.target.id).disabled = "disabled";
            document.getElementById(e.target.id).textContent = '✅';
        }

        setScore(score+1);
        setTimeout(() => {
            // update elems in cache
            let tempArr = dataElemsInCache.map((x) => x);
            tempArr.shift();
            if (!test) {
                tempArr[capacity-1] = {id: uuidv4(), char: document.getElementById("incomingElem").innerHTML};
                document.getElementById(e.target.id).style.display = "none"; // remove earliest added elem
                document.getElementById("incomingElem").textContent = availableChars[0];
            } else tempArr[capacity-1] = {id: tempArr[3].id+1, char: String.fromCharCode(tempArr[3].char.charCodeAt(0) + 1)};
            setDataElemsInCache(tempArr);

            tempArr = availableChars.map((x) => x);
            tempArr.push(originalEmoji); // adding the clicked emoji back to available chars
            tempArr.shift(); // removing the emoji that became incoming elem
            setAvailableChars(tempArr);
      }, 2000);
    // if elem clicked is incorrect
    } else if (dataElemsInCache.length === capacity) {
        if (!test) {
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
}

// import { v4 as uuidv4 } from 'uuid';

// export function fifo(e, dataElemsInCache, capacity, score, setScore, setDataElemsInCache, availableChars, setAvailableChars, test) {
//     const originalEmoji = e.target.innerHTML;
//     console.log("dataElemsInCache: ", dataElemsInCache);
//     // if elem clicked is correct
//     const clickedIndex = dataElemsInCache.findIndex(elem => elem.id === e.target.id);
//     console.log("clickedIndex: ", clickedIndex);
//     if (dataElemsInCache.length === capacity && dataElemsInCache[0].id === e.target.id) {
//       //document.getElementById(e.target.id).disabled = "disabled";
//       dataElemsInCache[clickedIndex].disabled = true;
//       if (!test) {
//         document.getElementById(e.target.id).textContent = '✅';
//       }
//       setScore(score+1);
//       setTimeout(() => {

//         if (!test) document.getElementById(e.target.id).style.display = "none"; // remove earliest added elem
//         // update elems in cache
//         let tempArr = dataElemsInCache.map((x) => x);
//         tempArr.shift();
//         if (!test) tempArr[capacity-1] = {id: uuidv4(), char: document.getElementById("incomingElem").innerHTML};
//         else tempArr[capacity-1] = {id: 6, char: 'f'};
//         setDataElemsInCache(tempArr);

//         if (!test) document.getElementById("incomingElem").textContent = availableChars[0];

//         tempArr = availableChars.map((x) => x);
//         tempArr.push(originalEmoji); // adding the clicked emoji back to available chars
//         tempArr.shift(); // removing the emoji that became incoming elem
//         setAvailableChars(tempArr);
//         //dataElemsInCache[clickedIndex].disabled = false;
//       }, 2000);
//     // if elem clicked is incorrect
//     } else if (dataElemsInCache.length === capacity) {
//       //console.log("incorrect");
//       var elem = document.getElementById(e.target.id);
//       if (elem) {
//         elem.textContent = '❌';
//         elem.disabled = "disabled";
//         // console.log("dataElemsInCache[clickedIndex].disabled = ", dataElemsInCache[clickedIndex].disabled);
//         // dataElemsInCache[clickedIndex].disabled = true;
//         // let tempArr = dataElemsInCache.map((x) => x);
//         // setDataElemsInCache(tempArr);
//       }
//       setTimeout(() => {
//         if (elem) {
//           elem.textContent = originalEmoji;
//           elem.disabled = "";
//         //   dataElemsInCache[clickedIndex].disabled = false;
//         //   let tempArr = dataElemsInCache.map((x) => x);
//         //   setDataElemsInCache(tempArr);
//         }
//       }, 1000);
//     }
// }