
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
                    if (feature.featureTypeId === 7) isWater = true
                    if (feature.featureTypeId === 6) isBrush = true
                }
            }

            col.push(<Node
                row={rowNumber}
                col={colNumber}
                isStart={isStart}
                isFinish={isFinish}
                isWater={isWater}
                isBrush={isBrush}
                nodeSize={nodeSize}
                key={`${i}-${rowNumber}`}/>)
        }
        return col
    }

    const MapLayer = ({ width, height, nodeSize, featureList }) => {
        let grid = []
        for (let row = 0; row < height; row++) {
            let newRow = []
            for (let col = 0; col < width; col++) {

                let isStart, isFinish, isWater, isBrush = false

                isStart = (row === 20 && col === 12)
                isFinish = (row === 17 && col === 50)

                for (let j = 0; j < featureList.length; j++) {
                    let feature = featureList[j]
                    if (feature.nodes[`${col}-${row}`]) {
                        if (feature.featureTypeId === 7) isWater = true
                        if (feature.featureTypeId === 6) isBrush = true
                    }
                }
                    newRow.push(
                        <Node
                        row={row}
                        col={col}
                        isStart={isStart}
                        isFinish={isFinish}
                        isWater={isWater}
                        isBrush={isBrush}
                        nodeSize={nodeSize}
                        key = {`${col}-${row}`}
                        />
                    )
            }
            grid.push(newRow)
        }
        return (
            <div className="map-grid" id='map-layer'>
                {
                    grid.map((row, rowNumber) => (
                    <div className="grid-row" key={`row-${rowNumber}`}>
                        {row}
                    </div>
                    ))
                }
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
            <MapLayer
                height={height}
                width={width}
                nodeSize={nodeSize}
                featureList={featureList}
                />
            {/* {NodeGrid(height, width, nodeSize)} */}
            </div>
    )
}

export default GridArea
