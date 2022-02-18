import generateGraph from "../generateAdjanencyList/generateAdjancencyList";

class PriorityQueue {
  constructor() {
    this.collection = []
  }

  dequeue() {
    let value = this.collection.shift();
    return value;
  };

  isEmpty() {
    return (this.collection.length === 0)
  };

  enqueue(element) {
    if (this.isEmpty()) {
      this.collection.push(element);
    } else {
      let added = false;
      for (let i = 1; i <= this.collection.length; i++) {
        if (element[1] < this.collection[i - 1][1]) {
          this.collection.splice(i - 1, 0, element);
          added = true;
          break;
        }
      }
      if (!added) {
        this.collection.push(element);
      }
    }
  };
}

const visualizeDijkstra = () => {
  let graph = generateGraph()
  let times = {}
  let backtrace = {}
  let pq = new PriorityQueue();
  let startNode = graph.startNode
  let finishNode = graph.finishNode
  let adjacencyList = graph.adjacencyList
  console.log(adjacencyList)
  let unvisitedNodes = [...graph.nodes]

  unvisitedNodes.forEach(node => times[node.id] = Infinity)
  times[startNode.id] = 0;
  pq.enqueue([startNode, 0])
  while (!pq.isEmpty()) {
    let shortestStep = pq.dequeue();
    let currentNode = shortestStep[0];
    adjacencyList[currentNode.id].forEach(neighbor => {
      let time = times[currentNode.id] + neighbor.weight;
      if (time < times[neighbor.node.id]) {
        times[neighbor.node.id] = time;
        backtrace[neighbor.node.id] = currentNode
        pq.enqueue([neighbor.node, time])
      }
    })
  }

  let path = [finishNode]
  let lastStep = finishNode
  while (lastStep !== startNode) {
    path.unshift(backtrace[lastStep])
    lastStep = backtrace[lastStep]
  }

  console.log({path, time: times[finishNode.id]})



  // while (unvisitedNodes.length > 0) {
  //   console.log(`niehgbors`)
  // }

}

  export default visualizeDijkstra
