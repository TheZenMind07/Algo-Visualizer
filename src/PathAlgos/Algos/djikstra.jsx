import Node from "../Node/Node";
// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export function dijkstra(grid, startNode, finishNode) {
    let node_row = startNode.props.row;
    let node_col = startNode.props.col;
    const visitedNodesInOrder = [];
    startNode = (
        <Node
            col={startNode.props.col}
            distance={0}
            isFinish={startNode.props.isFinish}
            isStart={startNode.props.isStart}
            isVisited={startNode.props.isVisited}
            isWall={startNode.props.isWall}
            previousNode={startNode.props.previousNode}
            row={startNode.props.row}
        />
    );
    grid[node_row][node_col] = startNode;
    const unvisitedNodes = getAllNodes(grid);
    while (!!unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);
        console.log(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();
        // If we encounter a wall, we skip it.
        if (closestNode.props.isWall) continue;
        //     // If the closest node is at a distance of infinity,
        //     // we must be trapped and should therefore stop.
        if (closestNode.props.distance === Infinity) return visitedNodesInOrder;
        closestNode = (
            <Node
                col={colsestNode.props.col}
                distance={colsestNode.props.distance}
                isFinish={colsestNode.props.isFinish}
                isStart={colsestNode.props.isStart}
                isVisited={true}
                isWall={colsestNode.props.isWall}
                previousNode={colsestNode.props.previousNode}
                row={colsestNode.props.row}
            />
        );
        grid[start_row][start_row] = startNode;
        visitedNodesInOrder.push(closestNode);
        if (closestNode.props.row === finishNode.props.row && closestNode.props.col === finishNode.props.col)
            return visitedNodesInOrder;
        updateUnvisitedNeighbors(closestNode, grid);
    }
}

function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.props.distance - nodeB.props.distance);
}

function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.props.distance = node.props.distance + 1;
        neighbor.props.previousNode = node;
    }
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.props.previousNode;
    }
    return nodesInShortestPathOrder;
}
