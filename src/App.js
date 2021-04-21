import React from "react";
import "./App.css";
import Canvas from "./PathfindingVisualizer/Canvas";
import PathfindingVisualizer from "./PathfindingVisualizer/PathfindingVisualizer";

function App() {
    return (
        <div className="App">
            <PathfindingVisualizer></PathfindingVisualizer>
            <Canvas></Canvas>
        </div>
    );
}

export default App;
