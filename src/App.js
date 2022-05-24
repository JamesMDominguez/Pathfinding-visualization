import React, { useState } from "react";
import "./App.css";
import Box from "./components/box";
function App() {
  const [maze3, setMaze3] = useState([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 1, 1],
    [0, 1, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 0, 2],
    [0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0]
  ]);
  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))
  const updateMatrix = (row, column) => {
    let copy = [...maze3];
    copy[row][column] = 3;
    setMaze3(copy);
  };
  const searchBFS = async (row, col) => {
      await wait(500)
      if (col < 0 || col > 6 || row < 0 || row > 8) return; //in bound 
      if (maze3[row][col] === 1 || maze3[row][col] === 3) return; //wall or visited
      if (maze3[row][col] === 2) alert("Found"); //found target
      updateMatrix(row, col);  
      searchBFS(row, col - 1); //left
      searchBFS(row, col + 1); //right
      searchBFS(row - 1, col); //down
      searchBFS(row + 1, col); //up
  }

  const searchDFS = async (row , col) => {
    let q = []
    let visited = new Set()
    q.push({cord:[row,col], path:[[0,0]] })
    while(q.length!=0){
      let node = q.pop()
      let cord = node.cord
      let r = cord[0]
      let c = cord[1]
      let curPath = node.path

      const enQ = (ro,co) =>{
        if (c < 0 || c > 6 || r < 0 || r > 6) return; //not in bound 
        if(!(visited.has([ro,co]))){
        q.push({cord:[ro,co],path: curPath+[[ro,co]] })
        }
      }
      visited.add(cord)
      if (c < 0 || c > 6 || r < 0 || r > 6) continue; //not in bound 
      if (maze3[r][c] === 1 || maze3[r][c] === 3) continue; //wall or visited
      if (maze3[r][c] === 2){
         console.log(curPath)  //found target
         return;
      }
      updateMatrix(r, c);  
      enQ(r,c+1)
      enQ(r,c-1)
      enQ(r+1,c)
      enQ(r-1,c)

      await wait(500)
    }

    console.log("something")
    
  }

  return (
    <div>
      <div id="matrix">
        {maze3.map((row, colIndex) =>
          row.map((num, rowIndex) => (
            <Box key={colIndex + rowIndex} value={num} />
          ))
        )}
      </div>
      <button
        onClick={() => {
          searchDFS(0,0)
        }}
      >
        search
      </button>
      <button
        onClick={() => {
          searchBFS(0,0)
        }}
      >
        search 2
      </button>
      <button
        onClick={() => {
          setMaze3([
            [0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 1, 1, 1],
            [0, 1, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 1, 0, 2],
            [0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 0, 0]
          ])
        }}
      >
        clear
      </button>    
    </div>
  );
}
export default App;
