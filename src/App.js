import { useEffect, useState } from "react";
import Sketch2 from "./p52";
import Page from "./page"
function App() {
  const [range,setRange] = useState(30);
  useEffect(()=>{
    if(range!=30){
      sessionStorage.setItem("range",range);
      console.log("s: ",sessionStorage.getItem("range",range));
    }
  },[range]);

  useEffect(()=>{
    if(sessionStorage.getItem("range",range)){
      setRange(sessionStorage.getItem("range",range));
      console.log(sessionStorage.getItem("range",range));
    }
  },[range]);

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className="App">
      <div style={{height:"100%",justifyContent:"center",alignItems:"center"}}>
      <h1 style={{
        fontFamily:"sans-serif",
        color:"#205375",
        backgroundColor:"#99C4C8",
        padding:"40px",
        margin:"0",
        marginBottom:"10px"
      }}>PATH FINDER</h1>
      <input type="range" min="1" max="100" value={range} style={{width:"500px",marginLeft:"10px"}} onChange={(b)=>{setRange(b.target.value)}} />
      <button style={{
        paddingLeft:"35px",
        paddingRight:"35px",
        paddingTop:"10px",
        paddingBottom:"10px",
        backgroundColor:"#68A7AD",
        border:"none",
        borderRadius:"5px",
        marginLeft:"10px",
        marginBottom:"10px"
      }} onClick={refreshPage}>Start</button>
      </div>
      <div style={{marginLeft:"10px"}}>
      <Sketch2 range={range} />
      </div>
    </div>
  );
}

export default App;
