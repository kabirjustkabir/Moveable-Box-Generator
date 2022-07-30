import { useCallback, useEffect, useState } from "react";
import "./style.css";
import Move from "./Components/Move";

export default function App() {
  // listOfDiv is used to store all the details of Boxes like UniqueID,top position,left position,backgroundColor
  const [listOfDiv, setListOfDiv] = useState([]);
  // if status is true then all the listener will enable
  const [status, setStatus] = useState(false);
  // currSelectedDiv store the index of current box
  const [currSelectedDiv, setCurrSelectedDiv] = useState(-1);
  // pixelDistance will ensure that how much distance will be covered by the box on One click
  const pixelDistance = 5;


  // handleTop function is used to move the box Upward
  const handleTop=(i)=>{
    const activeBox = listOfDiv.find((e)=> e.uniqueID === i);
    if(activeBox){
      activeBox.top = activeBox.top - pixelDistance >= 0 ? activeBox.top - pixelDistance : 0
      listOfDiv[i] = activeBox;
      setListOfDiv([...listOfDiv])
    }
  }
  // handleLeft function is used to move the box Leftside
  const handleLeft=(i)=>{
    const activeBox = listOfDiv.find((e)=> e.uniqueID === i);
    if(activeBox){
      activeBox.left = activeBox.left - pixelDistance >= 0 ? activeBox.left - pixelDistance : 0
      listOfDiv[i] = activeBox;
      setListOfDiv([...listOfDiv])
    }
  }
  // handleDown function is used to move the box Downward
  const handleDown=(i)=>{
    const activeBox = listOfDiv.find((e)=> e.uniqueID === i);

    if(activeBox && status){
      activeBox.top = activeBox.top + pixelDistance <= 550 ? activeBox.top + pixelDistance : 550
      listOfDiv[i] = activeBox;
      setListOfDiv([...listOfDiv])
    }
  }
  // handleRight function is used to move the box Right side
  const handleRight=(i)=>{
    const activeBox = listOfDiv.find((e)=> e.uniqueID === i);
    if(activeBox){
      activeBox.left = activeBox.left + pixelDistance <= 550 ? activeBox.left + pixelDistance : 550
      listOfDiv[i] = activeBox;
      setListOfDiv([...listOfDiv])
    }
  }
  const move = useCallback((direction,i) => {
    switch (direction) {
      case "up":
        handleTop(i);
        break;
      case "down":
        handleDown(i);
        break;
      case "left":
        handleLeft(i)
        break;
      default:
        handleRight(i)
        break;
    }
  }, [listOfDiv]);
  const onKeyDown = useCallback((e) => {
      switch (e.key) {
        case "ArrowUp":
          move("up",currSelectedDiv)
          break;
        case "ArrowDown":
          move("down",currSelectedDiv);
          break;
        case "ArrowLeft":
          move("left",currSelectedDiv);
          break;
        case "ArrowRight":
          move("right",currSelectedDiv);
          break;
        default:
          console.log("Do nothing", e.key);
      }
    },
    [move,currSelectedDiv]
  );

  useEffect(() => {
    if(status) document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [status,onKeyDown]);


  const handleAdd = () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const abc = `rgb(${red},${green},${blue})`;
    setListOfDiv([...listOfDiv,{
      uniqueID: listOfDiv.length,
      top: 0,
      left: 0,
      background:abc
    }]);
  };
  const handleStatus = () => {
    setStatus((current) => !current);
  };
  const handleChange=(i)=>{
    console.log("handlechange -->>",i);
    setCurrSelectedDiv(i)
  }
  return (
    <div className="App">
      <h1>Moveable Box Generator</h1>
      <div className="controller">
        { status === true &&
            <div>
              <button onClick={() => move("up",currSelectedDiv)}>Up</button>
              <button onClick={() => move("down",currSelectedDiv)}>Down</button>
              <button onClick={() => move("left",currSelectedDiv)}>Left</button>
              <button onClick={() => move("right",currSelectedDiv)}>Right</button>
            </div>
        }
        
        <button onClick={handleAdd}>Add box</button>
        <button onClick={handleStatus}>{status ? `click me to disable the listener` : `Please click me to enable the listener`}</button>
      </div>

      <Move listOfDiv={listOfDiv} handleChange={handleChange}status={status} />
    </div>
  );
}


