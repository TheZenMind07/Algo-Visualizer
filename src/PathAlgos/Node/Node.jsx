import React from "react";

import "./Node.css";

// export default class Node extends Component {
//     render() {
//         const { col, isFinish, isStart, isWall, onMouseDown, onMouseEnter, onMouseUp, row } = props;
//         const extraClassName = isFinish ? "node-finish" : isStart ? "node-start" : isWall ? "node-wall" : "";

//         return (
//             <div
//                 id={`node-${row}-${col}`}
//                 className={`node ${extraClassName}`}
//                 onMouseDown={() => onMouseDown(row, col)}
//                 onMouseEnter={() => onMouseEnter(row, col)}
//                 onMouseUp={() => onMouseUp()}
//             ></div>
//         );
//     }
// }

function Node(props) {
    // const { col, isFinish, isStart, isWall, onMouseDown, onMouseEnter, onMouseUp, row } = props;
    const extraClassName = props.isFinish
        ? "node-finish"
        : props.isStart
        ? "node-start"
        : props.isWall
        ? "node-wall"
        : "";
    return (
        <div
            id={`node-${props.row}-${props.col}`}
            className={"node " + extraClassName}
            onMouseDown={() => props.mouseDown(props.row, props.col)}
            // onMouseEnter={() => onMouseEnter(props.row, props.col)}
            // onMouseUp={() => onMouseUp()}
        ></div>
    );
}

export default Node;
