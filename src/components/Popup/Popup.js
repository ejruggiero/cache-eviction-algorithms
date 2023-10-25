import React from "react";
import "./Popup.css";
export const Popup = ({ text, closePopup }) => {
  return (
    <div className="popup-container">
     <div className="popup-body">
      <>{text}</>
      <button className="btn bg-warning text-center rounded" onClick={closePopup}>Close X</button>
     </div>
    </div>
  );
};