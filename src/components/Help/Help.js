import React from 'react';
import 'react-responsive-modal/styles.css';
import './Help.css';
import { Modal } from 'react-responsive-modal';

export const Help = () => {
  const [open, setOpen] = React.useState(true);

  const text = (
    <div>
    <h1>Welcome!</h1>
    <p>Hello! Here you will learn three important cache eviction algorithms: first in first out (FIFO),
     least recently used (LRU), and least frequently used (LFU). Change the algorithm you wish to practice by toggling the dropdown at the top of the screen.</p>
    <p>The cache is represented by a gray rectangle near the center of the screen. Data elements are represented as yellow circles with emojis 
     representing their data. Because the cache has a capacity of 5 data elements, there will be 5 data elements added to the cache. 
     The data element to the left of the cache represents an incoming data element that is to be added to the cache. Click on the data element 
     that should be removed. 
     Your score can be found at the top right corner of the screen. If you select the correct element to remove from the cache, then you will 
     gain a point.</p>
     <p>You can reopen this popup at any time by clicking on the Help button.</p>
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