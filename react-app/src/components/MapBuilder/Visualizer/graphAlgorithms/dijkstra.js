import generateGraph from "../generateAdjanencyList/generateAdjancencyList";
import { addPathLine } from "../../utils";

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

  let times = {}
  nodes.forEach(node => times[node.id] = Infinity)
  times[startNode.id] = 0;
  pq.enqueue([startNode, 0])
  let currentNode
  while (!pq.isEmpty()) {
    let shortestStep = pq.dequeue();
    currentNode = shortestStep[0];
    visitOrder.push(currentNode)
    if (currentNode === finishNode) {
      break;
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
    if (!lastStep || !lastStep.id) {
      return {
        path: null,
        visitOrder: null,
        travelTime: null
      }
    }
      path.unshift(backtrace[lastStep.id])
      lastStep = backtrace[lastStep.id]
    }

  if (path.length && path.indexOf(finishNode)) {
    let finishVisit = visitOrder.map(obj => obj.id).indexOf(finishNode.id)
    visitOrder = visitOrder.slice(0, finishVisit+1)
  }

  console.log({path, visitOrder, travelTime, times})
  return {
    path,
    visitOrder,
    travelTime,
    times
  }

}


const visualizeDijkstra = (setPathfindingMode, setDisableReclick) => {
  let { visitOrder, path, travelTime } = findNodesAndPath()
  if (!visitOrder && !path && !travelTime) {
    setPathfindingMode('error');
    setDisableReclick(false)
    return;
  }

  let visitCount = visitOrder.length
  let visitAnimationLength = 2200
  let visitNodeLength = visitAnimationLength/visitCount
  let pathCount = path.length
  let pathAnimationLength = pathCount * 15
  if (!path.length) pathAnimationLength = 0
  let drawPathLength = pathAnimationLength / (pathCount + 1)

  for (let i = 0; i < visitCount; i++) {
    let visitedNode = document.getElementById(visitOrder[i].id)

    setTimeout(() => {
      visitedNode.classList.add('visited');
    }, i * visitNodeLength)
    // }, i * 20)

    setTimeout(() => {
      visitedNode.classList.remove('visited');
    }, pathAnimationLength + visitAnimationLength)
    // }, pathAnimationLength + visitCount * 20)

  }




  for (let i = 0; i < path.length-1; i++) {
    let pathNode = document.getElementById(path[i].id)
    let prevNode = document.getElementById(path[i+1].id)
    setTimeout(() => {
      addPathLine(pathNode, prevNode)
    }, drawPathLength * i + visitAnimationLength)
    // }, drawPathLength * i + visitCount * 20)
  }

  setTimeout(() => {
    setPathfindingMode('success');
    setDisableReclick(false)
  }, pathAnimationLength + visitAnimationLength)

}

  export default visualizeDijkstra
