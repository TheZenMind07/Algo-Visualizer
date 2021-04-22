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
        const newGrid = getNewGridWithWallToggled(gridAndMouse.grid, row, col);
        setgridAndMouse({ grid: newGrid, mouseIsPressed: true });
    }

    // function handleMouseEnter(row, col) {
    //     if (!this.state.mouseIsPressed) return;
    //     const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    //     this.setState({ grid: newGrid });
    // }

    function handleMouseUp() {
        setgridAndMouse({ mouseIsPressed: false });
    }

    function getNewGridWithWallToggled(grid, row, col) {
        const newGrid = grid.slice();
        const node = newGrid[row][col];
        console.log(node);
        const newNode = {
            ...node,
            [node.props.isWall]: !node.props.isWall
        };
        newGrid[row][col] = newNode;
        return newGrid;
    }

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
                                    mouseDown={handleMouseDown}
                                    // onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                                    // onMouseUp={() => this.handleMouseUp()}
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
