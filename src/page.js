import React from "react";
import { useEffect,useState } from "react";
import Sketch2 from "./p52";

export default ()=>{
   return(
       <div className="flex">
           <div>
             <Sketch2 />
           </div>
           <div>
             <h1>PATH FINDER</h1>
             <input type="range" min="1" max="100" value="50" />
             <button>Start</button>
           </div>
       </div>
   )
}

