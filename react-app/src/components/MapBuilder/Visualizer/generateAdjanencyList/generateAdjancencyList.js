class Graph {
    constructor() {
        this.nodes = []
        this.startNode = null
        this.finishNode = null
        this.adjacencyList = {}
    }

    addNode(node) {
        this.nodes.push(node);
        this.adjacencyList[`${node.col}-${node.row}`] = [];
    }

    addEdge(node1, node2, weight, heuristic) {
        this.adjacencyList[node1.id].push({node:node2, weight: weight, heuristic: heuristic});
        this.adjacencyList[node2.id].push({node:node1, weight: weight, heuristic: heuristic});
    }
}

const generateAdjacencyList = () => {

    const list = new Graph()

    let htmlNodes = document.querySelectorAll('.node')
    let heuristicRow
    let heuristicCol

    //conditional
    htmlNodes.forEach(node => {
        if (node.attributes['is-finish'].value === 'true') {
            heuristicRow = node.attributes.row.value
            heuristicCol = node.attributes.col.value
        }
    })


    //add node to graph
    htmlNodes.forEach(node => {

        let heurDistX = heuristicCol - node.attributes.col.value
        let heurDistY = heuristicCol - node.attributes.row.value
        let heurDist = Math.sqrt(heurDistX ** 2 + heurDistY ** 2)
        let newNode = {
            id: node.id,
            row: parseInt(node.attributes.row.value),
            col: parseInt(node.attributes.col.value),
            featureType: node.attributes['feature-type'].value,
            adjacentNodes: JSON.parse(node.attributes['adjacent-nodes'].value),
            heurDist
        }

        list.addNode(newNode)
    })

    htmlNodes.forEach(node => {
        let newNode = {
            id: node.id,
            row: parseInt(node.attributes.row.value),
            col: parseInt(node.attributes.col.value),
            featureType: node.attributes['feature-type'].value,
            adjacentNodes: JSON.parse(node.attributes['adjacent-nodes'].value),
        }

        //conditional
        let heurColDist = node.attributes['col'].value - heuristicCol
        let heurRowDist = node.attributes['row'].value - heuristicRow
        let heurDistance = Math.sqrt(heurRowDist ** 2 + heurColDist ** 2)


        if (newNode.featureType !== 'water') {
            let testIndex = list.nodes.length - 2
            let nodeToTest = list.nodes[testIndex]
            let startingRow = newNode.row

            if (newNode.featureType === 'street' ||
                newNode.featureType === 'highway') {
                let adjacentStreets = newNode.adjacentNodes.streets
                let nodeList = Object.entries(adjacentStreets)
                nodeList.forEach(pair => {
                    let otherNode = document.getElementById(pair[0])

                    //conditional
                    let otherHeurColDist = otherNode.attributes['col'].value - heuristicCol
                    let otherHeurRowDist = otherNode.attributes['row'].value - heuristicRow
                    let otherHeurDistance = Math.sqrt(otherHeurRowDist ** 2 + otherHeurColDist ** 2)
                    let heurDifference = (otherHeurDistance - heurDistance) * 0.99

                    let distance = pair[1]
                    let weightedDistance = distance / 30
                    list.addEdge(newNode, otherNode, weightedDistance, heurDifference/30)
                })

            }

            while ((testIndex >= 0) && (nodeToTest.row >= startingRow - 1)) {
                let nodeToTest = list.nodes[testIndex]
                if (nodeToTest.featureType !== 'water') {
                    let rowDist = Math.abs(newNode.row - nodeToTest.row)
                    let colDist = Math.abs(newNode.col - nodeToTest.col)
                    if ((rowDist <= 1 && colDist <= 1)) {
                        let dist = Math.sqrt(rowDist ** 2 + colDist ** 2)

                         //conditional
                         let otherHeurColDist = nodeToTest.col - heuristicCol
                         let otherHeurRowDist = nodeToTest.row - heuristicRow
                         let otherHeurDistance = Math.sqrt(otherHeurRowDist ** 2 + otherHeurColDist ** 2)
                         let heurDifference = (otherHeurDistance - heurDistance) * 0.99


                        if (nodeToTest.featureType === 'brush') dist *= 1.8
                        if (newNode.featureType === 'brush') dist *= 1.8
                        list.addEdge(newNode, nodeToTest, dist, heurDifference)
                    }
                }
                testIndex--
            }
        }


        if (node.attributes['is-start'].value === 'true') {
            list.startNode = newNode
        }

        if (node.attributes['is-finish'].value === 'true') {
            list.finishNode = newNode
        }


    })

    return list

}


export default generateAdjacencyList
