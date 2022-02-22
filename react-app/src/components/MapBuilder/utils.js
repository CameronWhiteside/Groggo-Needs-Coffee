export const resetRoadOverlay = () => {
    // console.log(`resttin roads thx`)
    let roadDisplay = document.getElementById('road-display-layer')
    roadDisplay.innerHTML = ''
}

export const addPathLine = (nodeA, nodeB, parentId ='path-trace-layer', className='line', thickness='4') => {
    let displayContainer = document.getElementById(parentId)
    let lineSegment = document.createElement('div')

    const getOffsetTop = element => {
      let offsetTop = 0;
      while(element) {
      offsetTop += element.offsetTop;
      element = element.offsetParent;
      }
      return offsetTop;
  }

  const getOffsetLeft = element => {
      let offsetLeft = 0;
      while(element) {
      offsetLeft += element.offsetLeft;
      element = element.offsetParent;
      }
      return offsetLeft;
  }

    const getOffset = (el) => {
      // var elContainer = el.getBoundingClientRect();
      return {
        left: getOffsetLeft(el) - getOffsetLeft(displayContainer),
        top: getOffsetTop(el) - getOffsetTop(displayContainer),
        width: 18,
        height: 18
      };
    }

    const offsetA = getOffset(nodeA);
    const offsetB = getOffset(nodeB);
    const xCoordA = offsetA.left + (offsetA.width / 2);
    const yCoordA = offsetA.top - (offsetA.height / 2);
    const xCoordB = offsetB.left + (offsetB.width / 2);
    const yCoordB = offsetB.top - (offsetB.height / 2);
    const length = Math.sqrt(((xCoordB - xCoordA) * (xCoordB - xCoordA)) + ((yCoordB - yCoordA) * (yCoordB - yCoordA))) + 2;
    const centerXCoord = ((xCoordA + xCoordB) / 2) - (length / 2);
    const centerYCoord = ((yCoordA + yCoordB) / 2) - (thickness / 2);
    const angle = Math.atan2((yCoordA - yCoordB), (xCoordA - xCoordB)) * (180 / Math.PI);

    lineSegment.classList.add(className)
    lineSegment.classList.add('fading-effect')
    lineSegment.style.padding = '0px'
    lineSegment.style.margin= '0px'
    lineSegment.style.height= `${thickness}px`
    lineSegment.style.position= `absolute`
  lineSegment.style.left = `${centerXCoord}px`

  // if (parentId === 'path-trace-layer' && length > 40) {
  //   lineSegment.style.zIndex = 100
  // } else {
  //   lineSegment.style.zIndex = 2
  // }
    lineSegment.style.top = `${centerYCoord + 18}px`
    lineSegment.style.width= `${length}px`
    lineSegment.style.transform= `rotate(${angle}deg)`

    // lineSegment.style.backgroundColor= `var(--error)`
    // lineSegment.style.borderRadius = `2px`

    displayContainer.appendChild(lineSegment)
  }
