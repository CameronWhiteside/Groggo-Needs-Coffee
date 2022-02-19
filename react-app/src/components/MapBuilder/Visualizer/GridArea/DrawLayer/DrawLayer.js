import { useState } from 'react';
import './DrawLayer.css'

const DrawLayer = ({ height, width, nodeSize }) => {
    let startX = 0
    let startY = 0
    let stopX = 0
    let stopY = 0
    let drawingActive = false

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

    let gridLayer = document.getElementById('grid-area')
    let boxY = getOffsetTop(gridLayer)
    let boxX = getOffsetLeft(gridLayer)


    const startDraw = (e) => {
        drawingActive = true
        let clickY = e.pageY
        let clickX = e.pageX
        startX = Math.floor((clickX - boxX) / nodeSize)
        startY = Math.floor((clickY - boxY) / nodeSize)
        console.log(startX, startY)
        // console.log({boxX, boxY, clickX, clickY})
        // console.log(e.pageY - thisLayer.offsetTop)
        // console.log(e.pageX - thisLayer.offsetLeft)
        // console.log(clickX-boxX)
    }

    const moveDraw = (e) => {

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
            stopX = nextX
            stopY = nextY
            console.log(`redraw, ${stopX}, ${stopY}`)
        }
    }

    const finishDraw = (e) => {
        drawingActive=false
        console.log(`done drawing`)
    }

    return (
        <div
            id="draw-layer"
            onMouseDown={startDraw}
            onMouseUp={finishDraw}
            onMouseMove={moveDraw}
            style={{
                height: `${height * nodeSize}px`,
                width: `${width * nodeSize}px`,
            }}
            >
            <div id='click-tracker'
            >
            </div>
        </div>
    )

}

export default DrawLayer
