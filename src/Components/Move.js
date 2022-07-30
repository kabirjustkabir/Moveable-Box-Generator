import React, { useState } from "react";

const Move = ({ listOfDiv, status,handleChange }) => {
  // select is used to select the current box
  const [select, setSelect] = useState(-1);
  const handleSelect = (i) => {
    if(status)
    {
      setSelect(i);
      handleChange(i);
    }
  };
  return (
    <div className="move-container">
      {listOfDiv.length > 0 &&
        listOfDiv.map((data, i) => {
          return select !== i ? (
            <div
              key={i}
              style={{
                zIndex: data.uniqueID,
                top: `${data["top"]}px`, 
                left: `${data["left"]}px`,
                backgroundColor: `${data.background}`,
                position: "relative"
              }}
              className="move-div2"
              onClick={(e) => handleSelect(i)}
            ></div>
          ) : (
            <div key={i}
              style={{ top: `${data["top"]}px`, left: `${data["left"]}px`, zIndex: data.uniqueID}}
              className="move-div"
            ></div>
          );
        })}
    </div>
  );
};

export default Move;
