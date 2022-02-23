
// import { useEffect } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { getFeatures } from "../../../../store/feature"

import Node from "./Node/Node"
import DrawLayer from './DrawLayer/DrawLayer'
import PathTraceLayer from "./PathTraceLayer/PathTraceLayer"
import RoadDisplayLayer from "./RoadDisplayLayer/RoadDisplayLayer"
import './GridArea.css'
import EditLayer from "./EditLayer/EditLayer"



const GridArea = ({
    activeControl,
    currentMap,
    currentFeatures
}) => {

    const width = 70
    const height = 35
    const nodeSize = 18

    const MapLayer = ({
        width,
        height,
        nodeSize,
    }) => {


        let grid = []
        for (let row = 0; row < height; row++) {
            let newRow = []
            for (let col = 0; col < width; col++) {

                let
                    isStart,
                    isFinish = false
                let featureType = 'flat'


                let adjacentNodes = { streets: {}, highways: {}}

                if (row === 8 && col === 8) {
                    isStart = true
                    featureType = 'start'
                }

                if (row === 20 && col === 55) {
                    isFinish = true
                    featureType = 'finish'
                }

                for (let j = 0; j < currentFeatures.length; j++) {
                    let feature = currentFeatures[j]
                    if (feature.nodes[`${col}-${row}`]) {
                        if (feature.featureTypeId === 5) {
                            featureType = 'street'
                            let lat1 = feature.startLatitude
                            let lat2 = feature.stopLatitude
                            let long1 = feature.startLongitude
                            let long2 = feature.stopLongitude
                            let isStart = (`${col}-${row}` === `${long1}-${lat1}`)
                            let isFinish = (`${col}-${row}` === `${long2}-${lat2}`)
                            let length = Math.sqrt((lat1 - lat2)**2 + (long1 - long2) **2)
                            if (isStart) {
                                adjacentNodes.streets[`${long2}-${lat2}`] = length
                            } else if (isFinish) {
                                adjacentNodes.streets[`${long1}-${lat1}`] = length
                            }
                        }
                        else if (feature.featureTypeId === 6) {
                            featureType = 'brush'
                        }
                        else if (feature.featureTypeId === 7) {
                            featureType = 'water'
                        }

                    }
                }
                newRow.push(
                    <Node
                    row={row}
                        col={col}
                        isStart={isStart}
                        isFinish={isFinish}
                        featureType={featureType}
                        adjacentNodes={adjacentNodes}
                        nodeSize={nodeSize}
                        key = {`${col}-${row}`}
                        />
                    )
            }
            grid.push(newRow)
        }
        return (
            <div className={
                    `map-grid
                    `}
                id='map-layer'>
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
        <div id='grid-area'
            className={`
                editLayer-${activeControl === 'editFeatures'}
                deleteLayer-${activeControl === 'deleteFeatures'}
            `}
        >
            <DrawLayer
                height={height}
                width={width}
                nodeSize={nodeSize}
                activeControl={activeControl}
                currentMap={currentMap}

            />
            <PathTraceLayer
                height={height}
                width={width}
                nodeSize={nodeSize}
            />
            <RoadDisplayLayer
                height={height}
                width={width}
                nodeSize={nodeSize}
            />
            {
                currentFeatures &&
                <MapLayer
                    height={height}
                    width={width}
                    nodeSize={nodeSize}
                />
            }
                <div id="edit-layer"
                style={{
                    zIndex: `${20*(activeControl === 'editFeatures')}`,
                    height: `${height * nodeSize}px`,
                    width: `${width * nodeSize}px`,
                }}>
                </div>
                {  currentFeatures &&
                activeControl === 'editFeatures' &&
                    <EditLayer
                        height={height}
                        width={width}
                        nodeSize={nodeSize}
                        currentFeatures={currentFeatures}
                        currentMap={currentMap}
                        />
                    }
            </div>
    )
}

export default GridArea
