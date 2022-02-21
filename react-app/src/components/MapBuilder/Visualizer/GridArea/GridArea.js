
import { useEffect, useState } from "react"

import Node from "../Node/Node"
import DrawLayer from './DrawLayer/DrawLayer'
import PathTraceLayer from "./PathTraceLayer/PathTraceLayer"
import './GridArea.css'



const GridArea = ({
    drawWaterMode,
    drawBrushMode,
    drawStreetMode,
    activeControl,
    featureList,
    setFeatureList,
    updateFeatures,
    currentMap
}) => {

    const width = 70
    const height = 35
    const nodeSize = 18

    useEffect(() => {
        updateFeatures(currentMap)
    },[currentMap])

    // useEffect(() => {
    //     console.log(featureList)
    // },[featureList])

    const MapLayer = ({ width, height, nodeSize, featureList }) => {
        let grid = []
        for (let row = 0; row < height; row++) {
            let newRow = []
            for (let col = 0; col < width; col++) {

                let isStart, isFinish, isWater, isBrush, isStreet = false

                isStart = (row === 20 && col === 12)
                isFinish = (row === 17 && col === 50)

                for (let j = 0; j < featureList.length; j++) {
                    let feature = featureList[j]
                    if (feature.nodes[`${col}-${row}`]) {
                        if (feature.featureTypeId === 7) {
                            isWater = true
                        }
                        if (feature.featureTypeId === 6) {
                            isWater = false
                            isBrush = true
                        }
                        if (feature.featureTypeId === 5) {
                            isStreet = true
                        }
                    }
                }
                    newRow.push(
                        <Node
                        row={row}
                        col={col}
                        isStart={isStart}
                        isFinish={isFinish}
                        isStreet={isStreet}
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




    return (
        <div id="grid-area">
            <DrawLayer
                height={height}
                width={width}
                nodeSize={nodeSize}
                featureList={featureList}
                setFeatureList={setFeatureList}
                activeControl={activeControl}
                drawWaterMode={drawWaterMode}
                drawBrushMode={drawBrushMode}
                drawStreetMode={drawStreetMode}
            />
            <PathTraceLayer
                height={height}
                width={width}
                nodeSize={nodeSize}
            />
            {featureList &&
                <MapLayer
                    height={height}
                    width={width}
                    nodeSize={nodeSize}
                    featureList={featureList}
                />
            }
            {/* {NodeGrid(height, width, nodeSize)} */}
            </div>
    )
}

export default GridArea
