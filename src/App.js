import React from "react";
import "./App.css";
import Canvas from "./PathAlgos/Canvas";
import Pathfinder from "./PathAlgos/Pathfinder";

function App() {
    return (
        <div className="App">
            <Pathfinder></Pathfinder>
            <Canvas></Canvas>
        </div>
    );
}

export default App;
