import './EditLayer.css'
import { addPathLine } from '../../../utils'
import { createFeature, updateFeature } from '../../../../../store/feature'
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

    let editedFeatureId, movingCorner, staticCorner, newFeature, updateEnd, featureTypeId

    const startEditDraw = (e) => {


        let featureData = e.target.id.split('-')
        featureTypeId = e.target.getAttribute('featureTypeId')
        editedFeatureId = featureData[0]
        updateEnd = featureData[1]
        newFeature = document.getElementById(`${editedFeatureId}-edit`)

        if (updateEnd === 'start') {
            movingCorner = document.getElementById(`${editedFeatureId}-start`)
            staticCorner = document.getElementById(`${editedFeatureId}-stop`)
        } else {
            movingCorner = document.getElementById(`${editedFeatureId}-stop`)
            staticCorner = document.getElementById(`${editedFeatureId}-start`)
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



            console.log(stopX, startX)

            if (stopX < startX) {
                movingCorner.style.left = `${featureLeft}px`
            } else {
                movingCorner.style.left = `${featureLeft + featureWidth - nodeSize}px`
            }

            if (stopY < startY) {
                movingCorner.style.top = `${featureTop}px`
            } else {
                movingCorner.style.top = `${featureTop + featureHeight - nodeSize}px`
            }

            if (featureTypeId > 5) {
                newFeature.style.width = `${featureWidth}px`
                newFeature.style.height = `${featureHeight}px`
                newFeature.style.left = `${featureLeft}px`
                newFeature.style.top = `${featureTop}px`
            } else if (featureTypeId > 2) {
                newFeature.remove()
                addPathLine(staticCorner, movingCorner, 'edit-tracker', 'edit-street', '18', `${editedFeatureId}-edit`)
                newFeature = document.getElementById(`${editedFeatureId}-edit`)
            }


                let clickArea = document.getElementById('edit-tracker')
                clickArea.appendChild(newFeature)
            // } else if (activeControl === 'brush') {
            //     e.target.innerHTML = ''
            //     let newFeature = document.createElement('div')
            //     newFeature.id = 'drawn-feature'
            //     newFeature.style.position = 'absolute'
            //     newFeature.style.width = `${ featureWidth }px`
            //     newFeature.style.height = `${ featureHeight }px`
            //     newFeature.style.left = `${ featureLeft }px`
            //     newFeature.style.top = `${ featureTop }px`
            //     newFeature.classList.add('edit-brush')
            //     let clickArea = document.getElementById('edit-tracker')
            //     clickArea.innerHTML = ''
            //     clickArea.appendChild(newFeature)
            // } else if (activeControl === 'street') {
            //     let clickArea = document.getElementById('edit-tracker')
            //     let start = document.getElementById(`${startX}-${startY}`)
            //     let stop = document.getElementById(`${stopX}-${stopY}`)
            //     clickArea.innerHTML = ''
            //     addPathLine(start, stop, 'edit-tracker', 'edit-street', 18)
            // }
        }
    }


    const fakifyFeatures = () => {
        console.log(currentFeatures)
        let editTracker = document.createElement('div')
        editTracker.id = 'edit-tracker'
        editTracker.addEventListener('mousemove', moveEditDraw)
        editTracker.addEventListener('mouseup', finishEditDraw)
        editTracker.addEventListener('mouseleave', finishEditDraw)
        editLayer.appendChild(editTracker)

        for (let i = 0; i < currentFeatures.length; i++) {
            let {
                featureTypeId,
                id,
                startLatitude,
                stopLatitude,
                startLongitude,
                stopLongitude
            } = currentFeatures[i]

                let startNode = document.createElement('div')
                startNode.id = `${id}-start`
                startNode.style.left = `${ startLongitude * nodeSize}px`
                startNode.style.top = `${startLatitude * nodeSize}px`
                startNode.style.width = `${nodeSize}px`
                startNode.style.height = `${nodeSize}px`
                startNode.classList.add('edit-water')
                startNode.classList.add('edit-handle')
                startNode.setAttribute('featureTypeId', featureTypeId)
                startNode.addEventListener('mousedown', startEditDraw)
                let stopNode = document.createElement('div')
                stopNode.id = `${id}-stop`
                stopNode.style.left = `${ stopLongitude * nodeSize}px`
                stopNode.style.top = `${stopLatitude * nodeSize}px`
                stopNode.style.width = `${nodeSize}px`
                stopNode.style.height = `${nodeSize}px`
                stopNode.classList.add('edit-water')
                stopNode.classList.add('edit-handle')
                stopNode.setAttribute('featureTypeId', featureTypeId)
                stopNode.addEventListener('mousedown', startEditDraw)
                editTracker.appendChild(startNode)
                editTracker.appendChild(stopNode)

            if (featureTypeId > 5) {
                let newFeature = document.createElement('div')
                newFeature.id = `${id}-edit`
                newFeature.style.position = 'absolute'
                newFeature.style.width = `${(Math.abs(startLongitude - stopLongitude) + 1) * nodeSize}px`
                newFeature.style.height = `${(Math.abs(startLatitude - stopLatitude) + 1) * nodeSize}px`
                newFeature.style.left = `${startLongitude * nodeSize}px`
                newFeature.style.top = `${startLatitude * nodeSize}px`
                newFeature.setAttribute('featureTypeId', featureTypeId)
                if (featureTypeId === 7) newFeature.classList.add('edit-water')
                if (featureTypeId === 6) newFeature.classList.add('edit-brush')
                editTracker.appendChild(newFeature)
            }

            if (featureTypeId === 5) {
                addPathLine(startNode, stopNode, 'edit-tracker', 'edit-street', '18', `${id}-edit`)
            }
        }

    }

    useEffect(fakifyFeatures, [currentFeatures])



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
                console.log(`donesee poo`, featureTypeId)
                let newFeature = addWaterToNodes(startX, stopX, startY, stopY)
                newFeature['featureTypeId'] = 7
                newFeature['id'] = editedFeatureId
                if(currentMap) dispatch(updateFeature(newFeature))
            }

            if (activeControl === 'brush') {
                let newFeature = addBrushToNodes(startX, stopX, startY, stopY)
                newFeature['featureTypeId'] = 6
                if(currentMap) dispatch(createFeature(newFeature))
            }
            if (activeControl === 'street') {
                let newFeature = addStreetToNodes(startX, stopX, startY, stopY)
                newFeature['featureTypeId'] = 5
                if(currentMap) dispatch(createFeature(newFeature))
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
