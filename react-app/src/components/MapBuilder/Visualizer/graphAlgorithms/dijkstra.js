import { path } from "express/lib/application";
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

const findNodesAndPath = () => {
  let graph = generateGraph()
  let startNode = graph.startNode
  let finishNode = graph.finishNode
  let nodes = graph.nodes
  let backtrace = {}
  let pq = new PriorityQueue();
  let visitOrder = []
  let adjacencyList = graph.adjacencyList
  // let unvisitedNodes = [...graph.nodes]

  // console.log( {
  //   adjacencyList,
  //   startNode,
  //   finishNode
  // })

  let times = {}
  nodes.forEach(node => times[node.id] = Infinity)
  times[startNode.id] = 0;
  pq.enqueue([startNode, 0])
  // console.log(pq.collection[0])
  let currentNode
  while (!pq.isEmpty()) {
    let shortestStep = pq.dequeue();
    currentNode = shortestStep[0];
    visitOrder.push(currentNode)
    if (currentNode === finishNode) {
      // console.log(`found our finish`)
      pq.collection = []
    } else {
      // eslint-disable-next-line no-loop-func
      adjacencyList[currentNode.id].forEach(neighbor => {
        let time = times[currentNode.id] + neighbor.weight;
        if (time < times[neighbor.node.id]) {
          times[neighbor.node.id] = time;
          backtrace[neighbor.node.id] = currentNode
          pq.enqueue([neighbor.node, time])
        }
      })
    }
  }

  let travelTime = times[finishNode.id]
  let path = [finishNode]
  let lastStep = finishNode

  while (lastStep !== startNode) {
    path.unshift(backtrace[lastStep.id])
    lastStep = backtrace[lastStep.id]
  }


  return {
    path,
    visitOrder,
    travelTime,
  }

}

const visualizeDijkstra = () => {
  let { visitOrder, path, travelTime } = findNodesAndPath()
  for (let i = 0; i < visitOrder.length; i++) {
    setTimeout(() => {
      let visitedNode = document.getElementById(visitOrder[i].id)
      visitedNode.classList.add('visited');
    }, i*2)
  }

  for (let i = 0; i < path.length; i++) {
    let pathNode = document.getElementById(path[i].id)
    setTimeout(() => {
      pathNode.classList.add('path');
    }, 10*i + visitOrder.length * 2)
  }

}

  export default visualizeDijkstra
