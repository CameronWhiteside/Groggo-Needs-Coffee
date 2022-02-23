import './EditLayer.css'
import { resetRoadOverlay, addPathLine } from '../../../utils'
import { updateFeature } from '../../../../../store/feature'
import { useDispatch} from 'react-redux';
import { useEffect } from 'react';

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

const EditLayer = (
    { height,
        width,
        nodeSize,
        activeControl,
        currentMap,
        currentFeatures
    }) => {

    const dispatch = useDispatch();

    let startX = 0
    let startY = 0
    let stopX = 0
    let stopY = 0
    let featureWidth, featureHeight, featureTop, featureLeft, boxY, boxX
    let drawingActive = false
    let editLayer = document.getElementById('edit-layer')
    let existingTrackers = document.getElementById('edit-tracker')
    if (existingTrackers) {
        editLayer.innerHTML = ''
    }

    let editedFeatureId,
        movingCorner,
        staticCorner,
        moveX,
        moveY,
        newFeature,
        updateEnd,
        featureTypeId

    const startEditDraw = (e) => {

        resetRoadOverlay()
        let featureData = e.target.id.split('-')
        featureTypeId = e.target.getAttribute('featureTypeId')

        if (featureTypeId < 6 && featureTypeId > 2) {

        }

        editedFeatureId = featureData[0]
        updateEnd = featureData[1]
        newFeature = document.getElementById(`${editedFeatureId}-edit`)

        let startNode = document.getElementById(`${editedFeatureId}-start`)
        let startRightNode = document.getElementById(`${editedFeatureId}-start-right`)
        let stopNode = document.getElementById(`${editedFeatureId}-stop`)
        let stopLeftNode = document.getElementById(`${editedFeatureId}-stop-left`)

        if (updateEnd === 'start') {
            if (featureData[2]) {
                movingCorner = startRightNode
                staticCorner = stopLeftNode
                moveX = stopNode
                moveY = startNode
            } else {
                movingCorner = startNode
                staticCorner = stopNode
                moveX = stopLeftNode
                moveY = startRightNode
            }
        } else {
            if (featureData[2]) {
                movingCorner = stopLeftNode
                staticCorner = startRightNode
                moveX = startNode
                moveY = stopNode
            } else {
                movingCorner = stopNode
                staticCorner = startNode
                moveX = startRightNode
                moveY = stopLeftNode
            }
        }

        drawingActive = true

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

        boxY = getOffsetTop(editLayer)
        boxX = getOffsetLeft(editLayer)
        e.stopPropagation()
        e.preventDefault()
        drawingActive = true
        let clickY = e.pageY
        let clickX = e.pageX
        let newStartX = Math.floor((clickX - boxX) / nodeSize)
        if (newStartX >= 0) {
            startX = staticCorner.style.left.split('px')[0]/nodeSize
            stopX = newStartX
        }
        let newStartY = Math.floor(((clickY - boxY) / nodeSize))
        if (newStartY >= 0) {
            startY = staticCorner.style.top.split('px')[0]/nodeSize
            stopY = newStartY
        }
    }

    const moveEditDraw = (e) => {
        e.stopPropagation()
        e.preventDefault()

        let nextX
        let nextY

        if (drawingActive) {
            drawingActive = true
            let clickY = e.pageY
            let clickX = e.pageX
            nextX = Math.floor((clickX - boxX) / nodeSize)
            nextY = Math.floor((clickY - boxY) / nodeSize)
        }

        if (drawingActive && (nextX !== stopX || nextY !== stopY)) {
            if (nextX >= 0) {
                stopX = nextX
            }

            if (nextY >= 0) {
                stopY = nextY
            }

            if (startX < stopX) {
                featureWidth = (stopX - startX + 1) * nodeSize
                featureLeft = startX * nodeSize
            } else {
                featureWidth = (startX - stopX + 1) * nodeSize
                featureLeft = stopX * nodeSize
            }

            if (startY < stopY) {
                featureHeight = (stopY - startY + 1) * nodeSize
                featureTop = startY * nodeSize
            } else {
                featureHeight = (startY - stopY + 1) * nodeSize
                featureTop = stopY * nodeSize
            }

            if (stopX < startX) {
                movingCorner.style.left = `${featureLeft}px`
                if (moveX) moveX.style.left = `${featureLeft}px`
            } else {
                movingCorner.style.left = `${featureLeft + featureWidth - nodeSize}px`
                if (moveX) moveX.style.left = `${featureLeft + featureWidth - nodeSize}px`
            }

            if (stopY < startY) {
                movingCorner.style.top = `${featureTop}px`
                if (moveY) moveY.style.top = `${featureTop}px`
            } else {
                movingCorner.style.top = `${featureTop + featureHeight - nodeSize}px`
                if (moveY) moveY.style.top = `${featureTop + featureHeight - nodeSize}px`
            }

            if (featureTypeId > 5) {
                newFeature.style.width = `${featureWidth}px`
                newFeature.style.height = `${featureHeight}px`
                newFeature.style.left = `${featureLeft}px`
                newFeature.style.top = `${featureTop}px`
            } else if (featureTypeId > 2) {
                newFeature.remove()
                addPathLine(staticCorner, movingCorner, 'edit-tracker', 'edit-street', '18', `${newFeature.id}-edit`)
                newFeature = document.getElementById(`${newFeature.id}-edit`)
            }

                let clickArea = document.getElementById('edit-tracker')
                clickArea.appendChild(newFeature)
        }
    }


    // eslint-disable-next-line react-hooks/exhaustive-deps
    function fakifyFeatures() {
        let editTracker = document.createElement('div');
        editTracker.id = 'edit-tracker';
        editTracker.addEventListener('mousemove', moveEditDraw);
        editTracker.addEventListener('mouseup', finishEditDraw);
        editTracker.addEventListener('mouseleave', finishEditDraw);
        editLayer.appendChild(editTracker);

        for (let i = 0; i < currentFeatures.length; i++) {
            let {
                featureTypeId, id, startLatitude, stopLatitude, startLongitude, stopLongitude
            } = currentFeatures[i];

            let startNode = document.createElement('div');
            startNode.id = `${id}-start`;
            startNode.style.left = `${startLongitude * nodeSize}px`;
            startNode.style.top = `${startLatitude * nodeSize}px`;
            startNode.style.width = `${nodeSize}px`;
            startNode.style.height = `${nodeSize}px`;
            startNode.classList.add(`handle-${featureTypeId}`);
            startNode.classList.add('edit-handle');
            startNode.setAttribute('featureTypeId', featureTypeId);
            startNode.addEventListener('mousedown', startEditDraw);
            let stopNode = document.createElement('div');
            stopNode.id = `${id}-stop`;
            stopNode.style.left = `${stopLongitude * nodeSize}px`;
            stopNode.style.top = `${stopLatitude * nodeSize}px`;
            stopNode.style.width = `${nodeSize}px`;
            stopNode.style.height = `${nodeSize}px`;
            stopNode.classList.add(`handle-${featureTypeId}`);
            stopNode.classList.add('edit-handle');
            stopNode.setAttribute('featureTypeId', featureTypeId);
            stopNode.addEventListener('mousedown', startEditDraw);
            editTracker.appendChild(startNode);
            editTracker.appendChild(stopNode);

            if (featureTypeId > 5) {
                let startRightNode = document.createElement('div');
                startRightNode.id = `${id}-start-right`;
                startRightNode.style.left = `${stopLongitude * nodeSize}px`;
                startRightNode.style.top = `${startLatitude * nodeSize}px`;
                startRightNode.style.width = `${nodeSize}px`;
                startRightNode.style.height = `${nodeSize}px`;
                startRightNode.classList.add(`handle-${featureTypeId}`);
                startRightNode.classList.add('edit-handle');
                startRightNode.setAttribute('featureTypeId', featureTypeId);
                startRightNode.addEventListener('mousedown', startEditDraw);
                let stopLeftNode = document.createElement('div');
                stopLeftNode.id = `${id}-stop-left`;
                stopLeftNode.style.left = `${startLongitude * nodeSize}px`;
                stopLeftNode.style.top = `${stopLatitude * nodeSize}px`;
                stopLeftNode.style.width = `${nodeSize}px`;
                stopLeftNode.style.height = `${nodeSize}px`;
                stopLeftNode.classList.add(`handle-${featureTypeId}`);
                stopLeftNode.classList.add('edit-handle');
                stopLeftNode.setAttribute('featureTypeId', featureTypeId);
                stopLeftNode.addEventListener('mousedown', startEditDraw);
                editTracker.appendChild(startRightNode);
                editTracker.appendChild(stopLeftNode);
                let newFeature = document.createElement('div');
                newFeature.id = `${id}-edit`;
                newFeature.style.position = 'absolute';
                newFeature.style.width = `${(Math.abs(startLongitude - stopLongitude) + 1) * nodeSize}px`;
                newFeature.style.height = `${(Math.abs(startLatitude - stopLatitude) + 1) * nodeSize}px`;
                newFeature.style.left = `${startLongitude * nodeSize}px`;
                newFeature.style.top = `${startLatitude * nodeSize}px`;
                newFeature.setAttribute('featureTypeId', featureTypeId);
                if (featureTypeId === 7)
                    newFeature.classList.add('edit-water');
                if (featureTypeId === 6)
                    newFeature.classList.add('edit-brush');
                editTracker.appendChild(newFeature);
            }

            if (parseInt(featureTypeId) === 5) {
                addPathLine(startNode, stopNode, 'edit-tracker', `edit-street`, '18', `${id}-edit`);
            }
        }

    }

    useEffect(() => {
        fakifyFeatures()
    }, [currentFeatures, fakifyFeatures])



    const addWaterToNodes = (x1, x2, y1, y2) => {

        let xMin, xMax, yMin, yMax
        if (x1 < x2) {
            xMin = x1
            xMax = x2
        } else {
            xMin = x2
            xMax = x1
        }

        if (y1 < y2) {
            yMin = y1
            yMax = y2
        } else {
            yMin = y2
            yMax = y1
        }

        let newFeature = {
            startLatitude: yMin,
            startLongitude: xMin,
            stopLatitude: yMax,
            stopLongitude: xMax,
            mapId: currentMap.id,
            featureTypeId: 7,
            nodes: {}
        }

        for (let x = xMin; x <= xMax; x++) {
            for (let y = yMin; y <= yMax; y++){
                newFeature.nodes[`${x}-${y}`] = `${x}-${y}`
                let waterNode = document.getElementById(`${x}-${y}`)
                    // waterNode.setAttribute('is-brush', 'false')
                    // waterNode.setAttribute('is-water', 'true')
                    waterNode.setAttribute('feature-type', 'water')
                    }
        }

        return newFeature
    }

    const addBrushToNodes = (x1, x2, y1, y2) => {

        let xMin, xMax, yMin, yMax
        if (x1 < x2) {
            xMin = x1
            xMax = x2
        } else {
            xMin = x2
            xMax = x1
        }

        if (y1 < y2) {
            yMin = y1
            yMax = y2
        } else {
            yMin = y2
            yMax = y1
        }

        let newFeature = {
            startLatitude: yMin,
            startLongitude: xMin,
            stopLatitude: yMax,
            stopLongitude: xMax,
            featureTypeId: 6,
            mapId: currentMap.id,
            nodes: {}
        }
        if (currentMap) newFeature['mapId'] = currentMap.id

        for (let x = xMin; x <= xMax; x++) {
            for (let y = yMin; y <= yMax; y++){
                newFeature.nodes[`${x}-${y}`] = `${x}-${y}`
                let brushNode = document.getElementById(`${x}-${y}`)
                    // brushNode.setAttribute('is-brush', 'true')
                    // brushNode.setAttribute('is-water', 'false')
                    brushNode.setAttribute('feature-type', 'brush')
                    }
        }

        return newFeature
    }

    const addStreetToNodes = (x1, x2, y1, y2) => {


        let newFeature = {
            startLatitude: y1,
            startLongitude: x1,
            stopLatitude: y2,
            stopLongitude: x2,
            featureTypeId: 4,
            mapId: currentMap.id,
            nodes: {}
        }


        newFeature.nodes[`${x1}-${y1}`] = `${x1}-${y1}`
        newFeature.nodes[`${x2}-${y2}`] = `${x2}-${y2}`
        let streetNode1 = document.getElementById(`${x1}-${y1}`)
        let streetNode2 = document.getElementById(`${x2}-${y2}`)
        let adjacentNodes1 = JSON.parse(streetNode1.getAttribute('adjacent-nodes'))
        let adjacentNodes2 = JSON.parse(streetNode2.getAttribute('adjacent-nodes'))

        streetNode1.setAttribute('feature-type', 'street')
        adjacentNodes1['streets'][`${x2}-${y2}`] = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) * 0.2
        let adjacentString1 = JSON.stringify(adjacentNodes1)
        streetNode1.setAttribute('adjacent-nodes', adjacentString1)
        streetNode2.setAttribute('feature-type', 'street')
        adjacentNodes2['streets'][`${x1}-${y1}`] = Math.sqrt((x2 - x1) ** 2 + (y2-y1) **2) * 0.2
        streetNode2.setAttribute('adjacent-nodes', JSON.stringify(adjacentNodes2))
        addPathLine(streetNode1, streetNode2, 'road-display-layer', 'edit-street', 18)

        return newFeature
    }

    const finishEditDraw = (e) => {
        e.stopPropagation()
        e.preventDefault()
        if (drawingActive) {
            if (parseInt(featureTypeId) === 7) {
                let newFeature = addWaterToNodes(startX, stopX, startY, stopY)
                newFeature['featureTypeId'] = 7
                newFeature['id'] = editedFeatureId
                if(currentMap) dispatch(updateFeature(newFeature))
            }

            if (parseInt(featureTypeId) === 6) {
                let newFeature = addBrushToNodes(startX, stopX, startY, stopY)
                newFeature['featureTypeId'] = 6
                newFeature['id'] = editedFeatureId
                if(currentMap) dispatch(updateFeature(newFeature))
            }
            if (parseInt(featureTypeId) === 5) {
                let newFeature = addStreetToNodes(startX, stopX, startY, stopY)
                newFeature['featureTypeId'] = 5
                newFeature['id'] = editedFeatureId
                if(currentMap) dispatch(updateFeature(newFeature))
            }
        }
        drawingActive = false
    }

    return (
        <div
            id="edit-tracking-layer"
            // onMouseDown={startDraw}
            // onMouseUp={finishDraw}
            // onMouseMove={moveEditDraw}
            // onMouseLeave={finishDraw}
            // style={{
            //     height: `${height * nodeSize}px`,
            //     width: `${width * nodeSize}px`,
            // }}
            >
        </div>
    )

}

export default EditLayer
