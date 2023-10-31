import React from "react";
import "./Popup.css";

// source: https://medium.com/@byron.skoutaris/simple-popup-example-in-react-281a949bc3df
export const Popup = ({ text, closePopup }) => {
  return (
    <div className="popup-container">
     <div className="popup-body">
      <>{text}</>
      <button class="button" className="btn bg-warning text-center rounded" onClick={closePopup}>Close X</button>
     </div>
    </div>
  );
};