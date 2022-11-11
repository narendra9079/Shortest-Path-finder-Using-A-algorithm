import React from "react";
import Sketch from "react-p5";

	// let x = 50;
	// let y = 50;
export default (props) => {
var cols = 80;
var rows = 80;
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
  let d = p5.dist(a.i,a.j,b.i,b.j);
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
  
  if(random(1)<0.35){
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
    fill(color);
    noStroke();
    if(this.wall){ 
      fill(0); 
      ellipse(this.i*w + w/2, this.j*h+ h/2 , w/2, h/2);
    }
    // rect(this.i*w, this.j*h, w-1, h-1);
  }
}
    function setup() {
        // createCanvas(800, 800);
        createCanvas(windowHeight, windowHeight);
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
        w = width / cols;
        h = height / rows;
        start = grid[0][0];
        end = grid[cols-1][rows-1];
        start.wall = false;
        end.wall = false;
        openSet.push(start);
      }

      function draw() {
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
             noLoop();
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
          noLoop();
          return;
        }
      
        background(255);
        
        for(let i=0;i<cols;i++){
          for(let j=0;j<rows;j++){
            grid[i][j].show(color(255));
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
      
        noFill();
        stroke(0,0,255);
        strokeWeight(w/2);
        beginShape();
        for(let i=0;i<path.length;i++){
            vertex(path[i].i*w +w/2, path[i].j*h+h/2);
        }
        endShape();
      
      }
      

	return <Sketch setup={setup} draw={draw} />;
};