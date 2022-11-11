import React, { useRef, useEffect } from "react";
import p5 from "p5";

const Sketch2 = ({range}) => {
const processingRef = useRef();

const Sketch = p => {
  var cols = 70;
  var rows = 70;
  // w = 10;
  // h = 10;
  // var cols = parseInt((p.windowWidth-50)/w);
  // var rows = parseInt((p.windowHeight-300)/h);
  console.log(cols,rows,p.windowWidth,p.windowHeight);
  var grid = new Array(cols);
  var openSet = [];
  var closedSet = [];
  var start;
  var end;
  var w,h;
  var path = [];
  
  function removeFromArray(arr,ele){
    for(let i=arr.length-1;i>=0;i--){
      if(arr[i] === ele){
        arr.splice(i,1);
      }
    }
  }

function heuristic(a,b){
  let d = p.dist(a.i,a.j,b.i,b.j);
  // var d = abs(a.i - b.i) + abs(a.j-b.j);
  return d;
}

function Spot(i,j){
  this.i  = i;
  this.j  = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.prev = undefined;
  this.wall = false;
  this.neighbors = [];
  
  console.log("range : ",range);
  if(sessionStorage.getItem("range")){
    range = sessionStorage.getItem("range");
  }
  if(p.random(100)<range){
    this.wall = true;
  }
  
  this.addNeighbors = function (grid){
    let i = this.i;
    let j = this.j;
    if(i>0){
      this.neighbors.push(grid[i-1][j]);
    }
    if(i<cols-1){
      this.neighbors.push(grid[i+1][j]);
    }
    if(j>0){
      this.neighbors.push(grid[i][j-1]);
    }
    if(j<rows-1){
      this.neighbors.push(grid[i][j+1]);
    }
    if(j<rows-1 && i<cols-1){
      this.neighbors.push(grid[i+1][j+1]);
    }
    if(j<rows-1 && i>0){
      this.neighbors.push(grid[i-1][j+1]);
    }
    if(j>0 && i<cols-1){
      this.neighbors.push(grid[i+1][j-1]);
    }
    if(j>0 && i>0){
      this.neighbors.push(grid[i-1][j-1]);
    }
  }
  
  this.show = function (color){
    p.fill(color);
    p.noStroke();
    if(this.wall){ 
      p.fill(0); 
      p.ellipse(this.i*w + w/2, this.j*h+ h/2 , w/2, h/2);
    }
    // rect(this.i*w, this.j*h, w-1, h-1);
  }
}  
p.setup = () => {
  p.createCanvas(600, 600);
  //   p.createCanvas(p.windowHeight, p.windowHeight);
  console.log("p5 running...");
  for(let i=0;i<cols;i++) grid[i] = new Array(rows);
  for(let i=0;i<cols;i++){
      for(let j=0;j<rows;j++){
          grid[i][j] = new Spot(i,j);
        }
      }
      for(let i=0;i<cols;i++){
          for(let j=0;j<rows;j++){
              grid[i][j].addNeighbors(grid);
            }
          }
          w = p.width / cols;
          h = p.height / rows;
  start = grid[0][0];
  end = grid[grid.length-1][grid[0].length-1];
  console.log("grid ", grid.length,grid[0].length,end);
  start.wall = false;
  end.wall = false;
  openSet.push(start);
};

p.draw = () => {
  if(openSet.length > 0){
    var winner = 0;
    for(let i=0;i<openSet.length;i++){
          if(openSet[i].f < openSet[winner].f){
            winner = i;  
          }
        }
        var current = openSet[winner];
        if(current === end){
          console.log("DONE!");
          p.noLoop();
        }
        removeFromArray(openSet, current);
        closedSet.push(current);
        
        var neighbors = current.neighbors;
        for(var i=0;i<neighbors.length;i++){
          var neighbor = neighbors[i];
          
          if(!closedSet.includes(neighbor) && !neighbor.wall){
            var tempG = current.g + 1;
            let newPath = false;
            if(openSet.includes(neighbor)){ 
              if(neighbor.g > tempG){
                neighbor.g = tempG;
                newPath = true;
              }
            }
            else{
              newPath = true;
              neighbor.g = tempG;
              openSet.push(neighbor);
            }
            if(newPath){
              neighbor.h = heuristic(neighbor,end);
              neighbor.f = neighbor.g + neighbor.h; 
              neighbor.prev = current;
            }
          }
        }
   
     }else{
       console.log("No solution");
       p.noLoop();
       return;
     }
   
     p.background(255);
     
     for(let i=0;i<cols;i++){
       for(let j=0;j<rows;j++){
         grid[i][j].show(p.color(255));
       }
     }
   
     for(let i=0;i<closedSet.length;i++){
       // closedSet[i].show(color(255,0,0)); 
     }
     for(let i=0;i<openSet.length;i++){
       // openSet[i].show(color(0,255,0));
     }
     
     path = [];
     let temp = current;
     path.push(temp);
     while(temp.prev){
       path.push(temp.prev);
       temp = temp.prev;
     }
     for(let i=0;i<path.length;i++){
       // path[i].show(color(0,0,255));
     }
   
     p.noFill();
     p.stroke(0,0,255);
     p.strokeWeight(w/2);
     p.beginShape();
     for(let i=0;i<path.length;i++){
         p.vertex(path[i].i*w +w/2, path[i].j*h+h/2);
     }
     p.endShape();  
};
};

useEffect(() => {
const newp5 = new p5(Sketch, processingRef.current);
}, [])

  return <div ref={processingRef} />;
};

export default Sketch2;