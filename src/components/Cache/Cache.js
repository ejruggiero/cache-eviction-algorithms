import React from 'react'
import DataElement from '../DataElement/DataElement'
import "./Cache.css"

export default function Cache({dataElems, onClick, evictionAlg}) {
    const rows = [];
    for (let i = 0; i < dataElems.length; i++) {
        rows.push(<DataElement key={dataElems[i].id} id={dataElems[i].id} char={dataElems[i].char} onClick={onClick} dataElems={dataElems} hits={dataElems[i].hits} lruChange={dataElems[i].lruChange} evictionAlg={evictionAlg} disabled={dataElems[i].disabled}/>);
    }

    const fifoText = "The leftmost item was added first and the rightmost item was added last.";
    const lruText = "The numbers represent the seconds since the item was added to or accessed in the cache.";
    const lfuText = "The numbers are consecutive adds to or accesses in the cache. Tie break by leftmost item."
    let details = "";
    if (evictionAlg === "lfu") details = lfuText;
    else if (evictionAlg === "lru") details = lruText;
    else details = fifoText;
    return (
    <>
    <div class="evictionAlgInfo">{details}</div>
    <div class="bg-secondary rounded" style={{"height" : "100%"}}>
        <div>
            {rows}
        </div>
    </div>
    </>
  )
}
