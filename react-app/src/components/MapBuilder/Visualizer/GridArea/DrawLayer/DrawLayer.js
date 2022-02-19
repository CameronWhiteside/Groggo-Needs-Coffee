import './DrawLayer.css'

const DrawLayer = ({ height, width, nodeSize, featureList, setFeatureList }) => {
    let startX = 0
    let startY = 0
    let stopX = 0
    let stopY = 0
    let featureWidth, featureHeight, featureTop, featureLeft, boxY, boxX
    let drawingActive = false
    let gridLayer = document.getElementById('grid-area')

    const startDraw = (e) => {

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

        boxY = getOffsetTop(gridLayer)
        boxX = getOffsetLeft(gridLayer)
        e.stopPropagation()
        e.preventDefault()
        drawingActive = true
        let clickY = e.pageY
        let clickX = e.pageX
        let newStartX = Math.floor((clickX - boxX) / nodeSize)
        if  (newStartX > 0) startX = newStartX
        let newStartY = Math.floor(((clickY - boxY) / nodeSize))
        if  (newStartY > 0) startY = newStartY
    }

    const moveDraw = (e) => {
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
                featureWidth = `${(stopX - startX + 1) * nodeSize}px`
                featureLeft = `${startX * nodeSize}px`
            } else {
                featureWidth = `${(startX - stopX + 1) * nodeSize}px`
                featureLeft = `${stopX * nodeSize}px`
            }

            if (startY < stopY) {
                featureHeight = `${(stopY - startY + 1) * nodeSize}px`
                featureTop = `${startY * nodeSize}px`
            } else {
                featureHeight = `${(startY - stopY + 1) * nodeSize}px`
                featureTop = `${stopY * nodeSize}px`
            }

            // console.log(`redraw, ${stopX}, ${stopY}`)
            // if (!document.getElementById('drawn-feature')) {
                e.target.innerHTML=''
                let newFeature = document.createElement('div')
                newFeature.id = 'drawn-feature'
                newFeature.style.position = 'absolute'
                newFeature.style.width = featureWidth
                newFeature.style.height = featureHeight
                newFeature.style.left = featureLeft
                newFeature.style.top = featureTop
                newFeature.classList.add('fake-water')
                let clickArea = document.getElementById('click-tracker')
                clickArea.innerHTML= ''
                clickArea.appendChild(newFeature)
            // }
        }
    }


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
            nodes: {}
        }

        for (let x = xMin; x <= xMax; x++) {
            for (let y = yMin; y <= yMax; y++){
                newFeature.nodes[`${x}-${y}`] = `${x}-${y}`
                let waterNode = document.getElementById(`${x}-${y}`)
                    waterNode.setAttribute('is-brush', 'false')
                    waterNode.setAttribute('is-water', 'true')
                    }
        }

        return newFeature
    }

    const finishDraw = (e) => {
        e.stopPropagation()
        e.preventDefault()
        if (drawingActive) {
            let newFeature = addWaterToNodes(startX, stopX, startY, stopY)
            newFeature['typeId'] = '7'
            setFeatureList([...featureList, newFeature])
        }
        document.getElementById('click-tracker').innerHTML = ''
        drawingActive = false
    }

    return (
        <>
        <div
            id="draw-layer"
            onMouseDown={startDraw}
            onMouseUp={finishDraw}
            onMouseMove={moveDraw}
            onMouseLeave={finishDraw}
            style={{
                height: `${height * nodeSize}px`,
                width: `${width * nodeSize}px`,
            }}
            >
        </div>
            <div id='click-tracker'>
            </div>
        </>
    )

}

export default DrawLayer
