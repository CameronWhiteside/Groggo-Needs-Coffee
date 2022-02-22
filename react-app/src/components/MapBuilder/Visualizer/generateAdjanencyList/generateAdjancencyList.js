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

    addEdge(node1, node2, weight) {
        this.adjacencyList[node1.id].push({node:node2, weight: weight});
        this.adjacencyList[node2.id].push({node:node1, weight: weight});
    }
}

const generateAdjacencyList = () => {

    const list = new Graph()

    let htmlNodes = document.querySelectorAll('.node')
    htmlNodes.forEach(node => {

        let newNode = {
            id: node.id,
            row: parseInt(node.attributes.row.value),
            col: parseInt(node.attributes.col.value),
            featureType: node.attributes['feature-type'].value,
            adjacentNodes:node.attributes['adjacent-nodes'].value,
        }

        list.addNode(newNode)

        if (newNode.featureType !== 'water') {
            let testIndex = list.nodes.length - 2
            let nodeToTest = list.nodes[testIndex]
            let startingRow = newNode.row

            if (newNode.featureType === 'street' ||
                newNode.featureType === 'highway') {
                // let adjacentStreets = newNode.adjacentNodes.streets
            }

            while ((testIndex >= 0) && (nodeToTest.row >= startingRow - 1)) {
                let nodeToTest = list.nodes[testIndex]
                if (nodeToTest.featureType !== 'water') {
                    let rowDist = Math.abs(newNode.row - nodeToTest.row)
                    let colDist = Math.abs(newNode.col - nodeToTest.col)
                    if ((rowDist <= 1 && colDist <= 1)) {
                        let dist = Math.sqrt(rowDist ** 2 + colDist ** 2)
                        if (nodeToTest.featureType === 'brush') dist *= 1.8
                        if (newNode.featureType === 'brush') dist *= 1.8
                        list.addEdge(newNode, nodeToTest, dist)
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
