import React, { useState } from "react";
import "./App.css";
import Box from "./components/box";

function App() {
  const [maze3, setMaze3] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const updateMatrix = (row, column) => {
    let copy = [...maze3];
    copy[row][column] = 3;
    setMaze3(copy);
  };
  const updateMatrixWall = (row, column) => {
    let copy = [...maze3];
    if(copy[row][column] === 1){
      copy[row][column] = 0;
    }else{
      copy[row][column] = 1;
    }
    setMaze3(copy);
  };
  const updateMatrixPath = (row, column) => {
    let copy = [...maze3];
    copy[row][column] = 4;
    setMaze3(copy);
  };
  // const searchBFS2 = async (row, col) => {
  //   await wait(500);
  //   if (col < 0 || col > 6 || row < 0 || row > 8) return; //in bound
  //   if (maze3[row][col] === 1 || maze3[row][col] === 3) return; //wall or visited
  //   if (maze3[row][col] === 2) alert("Found"); //found target
  //   updateMatrix(row, col);
  //   searchBFS(row, col - 1); //left
  //   searchBFS(row, col + 1); //right
  //   searchBFS(row - 1, col); //down
  //   searchBFS(row + 1, col); //up
  // };

  const searchDFS = async (row, col) => {
    let q = [];
    let visited = new Set();
    q.push({ cord: [row, col], path: [`${[0, 0]}`] });

    while (q.length != 0) {
      let node = q.pop();
      let cord = node.cord;
      let r = cord[0];
      let c = cord[1];
      let curPath = node.path;

      const enQ = (ro, co) => {
        if (co < 0 || co > 30 || ro < 0 || ro > 12) return; //not in bound
        if (maze3[ro][co] === 1 || maze3[ro][co] === 3) return; //wall or visited

        if (!visited.has(`${[ro, co]}`)) {
          q.push({ cord: [ro, co], path: [...curPath, `${[ro, co]}`] });
          visited.add(cord);
        }
      };

      if (c < 0 || c > 30 || r < 0 || r > 12) continue; //not in bound
      if (maze3[r][c] === 1 || maze3[r][c] === 3) continue; //wall or visited

      if (maze3[r][c] === 2) {
        showPath(curPath); //found target
        return;
      }
      updateMatrix(r, c);
      enQ(r, c + 1); //right
      enQ(r, c - 1); //left
      enQ(r + 1, c); //down
      enQ(r - 1, c); //up
      await wait(10);
    }
  };

  const searchBFS = async (row, col) => {
    let q = [];
    let visited = new Set();
    q.push({ cord: [row, col], path: [`${[0, 0]}`] });

    while (q.length != 0) {
      let node = q.shift();
      let cord = node.cord;
      let r = cord[0];
      let c = cord[1];
      let curPath = node.path;

      const enQ = (ro, co) => {
        if (co < 0 || co > 30 || ro < 0 || ro > 12) return; //not in bound
        if (maze3[ro][co] === 1 || maze3[ro][co] === 3) return; //wall or visited

        if (!visited.has(`${[ro, co]}`)) {
          q.push({ cord: [ro, co], path: [...curPath, `${[ro, co]}`] });
          visited.add(cord);
        }
      };

      if (c < 0 || c > 30 || r < 0 || r > 12) continue; //not in bound
      if (maze3[r][c] === 1 || maze3[r][c] === 3) continue; //wall or visited

      if (maze3[r][c] === 2) {
        showPath(curPath); //found target
        return;
      }
      updateMatrix(r, c);
      enQ(r, c + 1); //right
      enQ(r, c - 1); //left
      enQ(r + 1, c); //down
      enQ(r - 1, c); //up
      enQ(r + 1, c + 1); //right diagonal
      enQ(r - 1, c - 1); //left diagonal
      enQ(r + 1, c -1); //down diagonal
      enQ(r - 1, c + 1); //up diagonal
      await wait(10);
    }
  };

  const showPath = async (curPath) => {
    for (let element of curPath) {
      let element2 = element.split(",");
      let r = element2[0];
      let c = element2[1];
      if (c >= 0 && c <= 30 && r >= 0 && r <= 13) {
        updateMatrixPath(r, c);
      }
      await wait(100);
    }
  };

  return (
    <div>
      <h1>Path Finding </h1>
      <button onClick={() => searchBFS(0, 0)}>search BFS</button>
      <button onClick={() => searchDFS(0, 0)}>search DFS</button>
      <button
        onClick={() => {
          setMaze3([
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          ]);
        }}
        >
        clear
      </button>
      <button
        onClick={() => {
          setMaze3([
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          ])}}>
        maze
      </button>
      <div id="matrix">
        {maze3.map((row, colIndex) =>
          row.map((num, rowIndex) => (
            <div onClick={()=>updateMatrixWall(colIndex,rowIndex)}>
              <Box key={colIndex + rowIndex} value={num} />
            </div>
          ))
        )}
      </div>

    </div>
  );
}
export default App;

