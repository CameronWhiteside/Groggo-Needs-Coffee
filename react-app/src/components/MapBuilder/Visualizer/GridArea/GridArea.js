
import { useEffect, useState } from "react"

import Node from "../Node/Node"
import DrawLayer from './DrawLayer/DrawLayer'
import PathTraceLayer from "./PathTraceLayer/PathTraceLayer"
import './GridArea.css'



const GridArea = ({
    drawWaterMode,
    drawBrushMode,
    featureList,
    setFeatureList }) => {

    const width = 70
    const height = 35
    const nodeSize = 18

    const NodeCol = (colCount, rowNumber, nodeSize) => {

        const col = []
        for (let i = 0; i < colCount; i++) {
            let colNumber = i

            let isStart, isFinish, isWater, isBrush = false
            isStart = (rowNumber === 20 && colNumber === 12)
            isFinish = (rowNumber === 17 && colNumber === 50)

            for (let j = 0; j < featureList.length; j++) {
                let feature = featureList[j]
                if (feature.nodes[`${colNumber}-${rowNumber}`]) {
                    if ( feature.featureTypeId === 7) isWater = true
                }
            }
            isBrush = (!isWater && (rowNumber * colNumber) % 9 === 2)
            col.push(<Node

                row={rowNumber}
                col={colNumber}
                isStart={isStart}
                isFinish={isFinish}
                isWater={isWater}
                isBrush={isBrush}
                nodeSize={nodeSize}
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

    // useEffect(() => {

    // },[featureList])


    return (
        <div id="grid-area">
            <DrawLayer
                height={height}
                width={width}
                nodeSize={nodeSize}
                featureList={featureList}
                setFeatureList={setFeatureList}
                drawWaterMode={drawWaterMode}
                drawBrushMode={drawBrushMode}
            />
            <PathTraceLayer
                height={height}
                width={width}
                nodeSize={nodeSize}
            />
                {NodeGrid(height, width, nodeSize)}
            </div>
    )
}

export default GridArea
