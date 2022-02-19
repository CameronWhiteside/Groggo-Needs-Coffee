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
            id: `${node.attributes.col.value}-${node.attributes.row.value}`,
            row: parseInt(node.attributes.row.value),
            col: parseInt(node.attributes.col.value),
            isWater: (node.attributes['is-water'].value === 'true'),
            isBrush: (node.attributes['is-brush'].value === 'true')
        }

        list.addNode(newNode)

        if (!newNode.isWater) {
            let testIndex = list.nodes.length - 2
            let nodeToTest = list.nodes[testIndex]
            let startingRow = newNode.row
            while ((testIndex >= 0) && (nodeToTest.row >= startingRow - 1)) {
                let nodeToTest = list.nodes[testIndex]
                if (!nodeToTest.isWater) {
                    let rowDist = Math.abs(newNode.row - nodeToTest.row)
                    let colDist = Math.abs(newNode.col - nodeToTest.col)
                    if ((rowDist <= 1 && colDist <= 1)) {
                        // console.log('y')
                        let dist = Math.sqrt(rowDist ** 2 + colDist ** 2)
                        if (nodeToTest.isBrush) dist *= 2
                        if (newNode.isBrush) dist *= 2
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
