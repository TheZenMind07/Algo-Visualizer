import React, { useState, useEffect } from "react";
import Node from "./Node/Node";

import "./Pathfinder.css";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

function Pathfinder() {
    const [gridAndMouse, setgridAndMouse] = useState({
        grid: [],
        mouseIsPressed: false
    });

    useEffect(() => {
        function createNode(col, row) {
            // console.log(col, row);
            return (
                <Node
                    col={col}
                    row={row}
                    isStart={row === START_NODE_ROW && col === START_NODE_COL}
                    isFinish={row === FINISH_NODE_ROW && col === FINISH_NODE_COL}
                    distance={Infinity}
                    isVisited={false}
                    isWall={false}
                    previousNode={null}
                />
            );
        }

        function getInitialGrid() {
            const grid = [];
            for (let row = 0; row < 19; row++) {
                const currentRow = [];
                for (let col = 0; col < 50; col++) {
                    currentRow.push(createNode(col, row));
                }
                grid.push(currentRow);
            }
            console.log(grid);
            setgridAndMouse({
                grid: grid
            });
        }

        getInitialGrid();
        // const grid = getInitialGrid();
    }, []);

    // function handleMouseDown(row, col) {
    //     const newGrid = getNewGridWithWallToggled(gridAndMouse.grid, row, col);
    //     setgridAndMouse({ grid: newGrid, mouseIsPressed: true });
    // }
    function handleMouseDown(row, col) {
        // const newGrid = getNewGridWithWallToggled(gridAndMouse.grid, row, col);
        // setgridAndMouse(prev => {
        //     return {
        //         ...prev,
        //         [gridAndMouse.grid[row][col].props.isWall]: !gridAndMouse.grid[row][col].props.isWall,
        //         // newGrid,
        //         mouseIsPressed: true
        //     };
        // });
        // let newGrid = [];
        // newGrid = getNewGridWithWallToggled(gridAndMouse.grid, row, col);
        getNewGridWithWallToggled(row, col);
        setgridAndMouse(prev => {
            return {
                ...prev,
                mouseIsPressed: true
            };
        });
    }

    function handleMouseEnter(row, col) {
        if (!gridAndMouse.mouseIsPressed) {
            return;
        } else {
            getNewGridWithWallToggled(row, col);
        }
    }

    function handleMouseUp() {
        setgridAndMouse(prev => {
            return {
                ...prev,
                mouseIsPressed: false
            };
        });
    }

    // function getNewGridWithWallToggled(grid, row, col) {
    //     const newGrid = grid.slice();
    //     const node = newGrid[row][col].props;
    //     // node.props.isWall = !node.props.isWall;
    //     const newNode = {
    //         ...node,
    //         isWall: !node.isWall
    //     };
    //     newGrid[row][col].props = newNode;
    //     return newGrid;
    // }

    const getNewGridWithWallToggled = (row, col) => {
        let node = document.getElementById("node-" + row + "-" + col);
        if (!(node.classList.contains("node-start") || node.classList.contains("node-start")))
            node.classList.add("node-wall");

        setgridAndMouse(prev => {
            return { ...prev, mouseIsPressed: true };
        });
    };
    return (
        <div className="grid">
            {gridAndMouse.grid.map((row, rowIdx) => {
                return (
                    <div key={rowIdx}>
                        {row.map((node, nodeIdx) => {
                            const { row, col, isFinish, isStart, isWall } = node;
                            return (
                                <Node
                                    key={nodeIdx}
                                    col={nodeIdx}
                                    isStart={rowIdx === START_NODE_ROW && nodeIdx === START_NODE_COL}
                                    isFinish={rowIdx === FINISH_NODE_ROW && nodeIdx === FINISH_NODE_COL}
                                    isWall={false}
                                    mouseIsPressed={gridAndMouse.mouseIsPressed}
                                    onMouseDown={handleMouseDown}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseUp={handleMouseUp}
                                    row={rowIdx}
                                ></Node>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
    //     col,
    //     row,
    //     isStart: row === START_NODE_ROW && col === START_NODE_COL,
    //     isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    //     distance: Infinity,
    //     isVisited: false,
    //     isWall: false,
    //     previousNode: null
    // ;
}

export default Pathfinder;
