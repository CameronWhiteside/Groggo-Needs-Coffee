
import { useState } from "react"

import Node from "../Node/Node"
import DrawLayer from './DrawLayer/DrawLayer'
import './GridArea.css'



const GridArea = ({
    drawWaterMode,
    setDrawWaterMode,
    featureList,
    setFeatureList }) => {

    const [drawStartX, setDrawStartX] = useState()
    const [drawStartY, setDrawStartY] = useState()
    const [drawFinishX, setDrawFinishX] = useState()
    const [drawFinishY, setDrawFinishY] = useState()

    const width = 70
    const height = 35
    const nodeSize = 18

    let nodeClick = (e) => {
        console.log(`click`)

        // if (!drawWaterMode) {
        //     setDrawWaterMode(true)
        //     setDrawStartX(e.target.getAttribute('row'))
        //     setDrawStartY(e.target.getAttribute('col'))
        // } else {
        //     const newFeature = {
        //         start_latitude: drawStartX,
        //         stop_latitude: drawFinishX,
        //         start_longitude: drawStartY,
        //         stop_longitude: drawFinishY,
        //         feature_type_id: 7,
        //     }

        //     let newList = [...featureList]
        //     newList.push(newFeature)
        //     setFeatureList(newList)
        //     setDrawWaterMode(false)
        // }
    }

    let nodeMouseOver = (e) => {
        if (drawWaterMode) {
            setDrawFinishX(e.target.getAttribute('row'))
            setDrawFinishY(e.target.getAttribute('col'))
        }
    }

    // const setToWater = (node, startX, startY) => {
    //     let endX = node.getAttribute('row')
    //     let endY = node.getAttribute('col')
    //            for (let x = startX; x <= endX; x++) {
    //                         for (let y = startY; y <= endY; y++){
    //                             let waterNode = document.getElementById(`${y}-${x}`)
    //                             waterNode.setAttribute('is-brush', 'false')
    //                             waterNode.setAttribute('is-water', 'true')
    //                         }
    //                     }
    // }

    // let node2Click = (e) => {

    //     if (drawWaterMode) {
    //         let startX = e.target.getAttribute('row')
    //         let startY = e.target.getAttribute('col')
    //         let endX = startX
    //         let endY = startY
    //         console.log(startX)
    //         document.querySelectorAll('.node').forEach(node => {
    //             node.addEventListener('mouseenter', () => {
    //               setToWater(node, startX, startY)
    //             })
    //             node.addEventListener('onclick', () => {
    //                 node.addEventListener('mouseenter', () => {
    //                     setToWater(node, startX, startY)
    //                   })
    //             })
    //             // node.setAttribute('is-water', 'false')
    //         })

    //         // e.target.setAttribute('is-water', 'true')
    //         // console.log(e.target)
    //     }
    // }

    let checkWater = (row, col) => {
        if (
            drawStartX <= row &&
            drawStartY <= col &&
            drawFinishX >= row &&
            drawFinishY >= col
        ) {
            return true
        } else {
            return false
        }
    }

    const NodeCol = (colCount, rowNumber, nodeSize) => {

        const col = []
        for (let i = 0; i < colCount; i++) {
            let colNumber = i

            let isStart = (rowNumber === 20 && colNumber === 12)
            let isFinish = (rowNumber === 17 && colNumber === 50)


            let isWater = checkWater(rowNumber, colNumber)
            let isBrush = (!isWater && (rowNumber * colNumber) % 9 === 2)
            col.push(<Node

                row={rowNumber}
                col={colNumber}
                isStart={isStart}
                isFinish={isFinish}
                isWater={isWater}
                isBrush={isBrush}
                nodeSize={nodeSize}
                nodeClick={nodeClick}
                nodeMouseOver={nodeMouseOver}
                key={`${i}-${rowNumber}`} />)
        }
        return col
    }



    const NodeGrid = (rowCount, colCount, nodeSize) => {
        const grid = []
        for (let i = 0; i < rowCount; i++) {
            grid.push(
                <div className="grid-row" key={`row-${i}`}>
                    {NodeCol(colCount, i, nodeSize)}
                </div>
            )
        }
        return (
                <div div='map-layer'>
                    {grid}
                </div>

            )

    }


    return (
        <div id="grid-area">
            <DrawLayer
                height={height}
                width={width}
                nodeSize={nodeSize}
            />
                {NodeGrid(height, width, nodeSize)}
            </div>
    )
}

export default GridArea
