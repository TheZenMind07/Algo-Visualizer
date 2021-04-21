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
        const grid = getInitialGrid();
        setgridAndMouse({ grid });
    }, [getInitialGrid]);

    // function handleMouseDown(row, col) {
    //     const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    //     this.setState({ grid: newGrid, mouseIsPressed: true });
    // }

    // function handleMouseEnter(row, col) {
    //     if (!this.state.mouseIsPressed) return;
    //     const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    //     this.setState({ grid: newGrid });
    // }

    function handleMouseUp() {
        setgridAndMouse({ mouseIsPressed: false });
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
        return grid;
    }

    function createNode(col, row) {
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
                                    col={col}
                                    isFinish={isFinish}
                                    isStart={isStart}
                                    isWall={isWall}
                                    mouseIsPressed={gridAndMouse.mouseIsPressed}
                                    // onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                    // onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                                    // onMouseUp={() => this.handleMouseUp()}
                                    row={row}
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
