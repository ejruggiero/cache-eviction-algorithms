import React from 'react';
import 'react-responsive-modal/styles.css';
import './Help.css';
import { Modal } from 'react-responsive-modal';
import dropdown from '../../images/dropdown.png';
import cache from '../../images/cache.png';
import dataElem from '../../images/data_elem.png';
import incomingElem from '../../images/incoming_elem.png';
import help from '../../images/help.png';

export const Help = () => {
  const [open, setOpen] = React.useState(true);

  const text = (
    <div>
    <h1>Welcome!</h1>
    <p>Through this interactive visualization, you will learn three important cache eviction algorithms: first in first out (FIFO),
     least recently used (LRU), and least frequently used (LFU). As their names imply; the earliest element added to the cache is evicted in <b>FIFO</b>, the least recently added/accessed element is evicted in <b>LRU</b>, and the least frequently accessed element is evicted in <b>LFU</b>. It is recommended to first practice FIFO, then LRU, then LFU.</p>
    <p>Change the algorithm you wish to practice by toggling the dropdown <img src={dropdown} alt="Dropdown" width={250} height={40}/> at the top of the screen.</p>
    <p>The cache is represented by a gray rectangle <img src={cache} alt="Cache" width={100} height={25}/> near the center of the screen. It has a capacity of 5 data elements, and <b>a data element is first added to the cache before the one to its right.</b> Data elements are represented as yellow circles containing emojis 
     which represent their data. <img src={dataElem} alt="Data Element" width={50} height={50}/></p>
     <p>The data element to the left of the cache represents an incoming data element <img src={incomingElem} alt="Incoming Data Element" width={50} height={50}/> that we want to add to the cache. <b>If it matches an element in the cache,</b> then click on that matching element in the cache. This is known as a <b>hit</b> -- the data is successfully retrieved from the cache. <b>If the incoming element does not match any element in the cache,</b> then click the element that should be evicted from the cache based on the eviction algorithm you have chosen.</p>
     <p>Your score can be found at the top right corner of the screen.⭐ If you select the correct element to remove from the cache, then you will 
     gain 1 point.</p>
     <p>You can reopen this popup at any time by clicking on the Help button. <img src={help} alt="Help" width={70} height={50}/></p>
     </div>
  );

  return (
    <>
      <button className="btn bg-warning text-center rounded mt-1" style={{fontSize: "30px"}} onClick={() => setOpen(true)}>
        Help
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        {text}
      </Modal>
    </>
  );
};