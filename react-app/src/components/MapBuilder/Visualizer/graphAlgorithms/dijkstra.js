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

  if (currentNode === finishNode) {
    while (lastStep !== startNode) {
      path.unshift(backtrace[lastStep.id])
      lastStep = backtrace[lastStep.id]
    }
  } else {
    path = []
  }
  return {
    path,
    visitOrder,
    travelTime,
  }

}

// export const addPathLine = (nodeA, nodeB, parentId ='path-trace-layer', className='line', thickness='4') => {
//   let displayContainer = document.getElementById(parentId)
//   let lineSegment = document.createElement('div')

//   const getOffsetTop = element => {
//     let offsetTop = 0;
//     while(element) {
//     offsetTop += element.offsetTop;
//     element = element.offsetParent;
//     }
//     return offsetTop;
// }

// const getOffsetLeft = element => {
//     let offsetLeft = 0;
//     while(element) {
//     offsetLeft += element.offsetLeft;
//     element = element.offsetParent;
//     }
//     return offsetLeft;
// }

//   const getOffset = (el) => {
//     // var elContainer = el.getBoundingClientRect();
//     return {
//       left: getOffsetLeft(el) - getOffsetLeft(displayContainer),
//       top: getOffsetTop(el) - getOffsetTop(displayContainer),
//       width: 18,
//       height: 18
//     };
//   }

//   const offsetA = getOffset(nodeA);
//   const offsetB = getOffset(nodeB);
//   const xCoordA = offsetA.left + (offsetA.width / 2);
//   const yCoordA = offsetA.top - (offsetA.height / 2);
//   const xCoordB = offsetB.left + (offsetB.width / 2);
//   const yCoordB = offsetB.top - (offsetB.height / 2);
//   const length = Math.sqrt(((xCoordB - xCoordA) * (xCoordB - xCoordA)) + ((yCoordB - yCoordA) * (yCoordB - yCoordA))) + 2;
//   const centerXCoord = ((xCoordA + xCoordB) / 2) - (length / 2);
//   const centerYCoord = ((yCoordA + yCoordB) / 2) - (thickness / 2);
//   const angle = Math.atan2((yCoordA - yCoordB), (xCoordA - xCoordB)) * (180 / Math.PI);

//   lineSegment.classList.add(className)
//   lineSegment.classList.add('fading-effect')
//   lineSegment.style.padding = '0px'
//   lineSegment.style.margin= '0px'
//   lineSegment.style.height= `${thickness}px`
//   lineSegment.style.position= `absolute`
//   lineSegment.style.left= `${centerXCoord}px`
//   lineSegment.style.top= `${centerYCoord + 18}px`
//   lineSegment.style.width= `${length}px`
//   lineSegment.style.transform= `rotate(${angle}deg)`

//   // lineSegment.style.backgroundColor= `var(--error)`
//   // lineSegment.style.borderRadius = `2px`

//   displayContainer.appendChild(lineSegment)
// }


const visualizeDijkstra = (setPathfindingMode) => {
  let { visitOrder, path, travelTime } = findNodesAndPath()
  let visitCount = visitOrder.length
  let visitAnimationLength = 5000
  let visitNodeLength = visitAnimationLength/visitCount
  let pathCount = path.length
  let pathAnimationLength = 2000
  if (!path.length) pathAnimationLength = 0
  let drawPathLength = pathAnimationLength/(pathCount+1)

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

  setTimeout(() => {
    setPathfindingMode(true);
  // }, pathAnimationLength + visitCount * 20)
  }, pathAnimationLength + visitAnimationLength)

  for (let i = 0; i < path.length-1; i++) {
    let pathNode = document.getElementById(path[i].id)
    let prevNode = document.getElementById(path[i+1].id)
    setTimeout(() => {
      addPathLine(pathNode, prevNode)
    }, drawPathLength * i + visitAnimationLength)
    // }, drawPathLength * i + visitCount * 20)

  }
}

  export default visualizeDijkstra
