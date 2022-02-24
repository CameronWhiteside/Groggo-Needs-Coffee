import { useEffect } from "react"
import { useSelector } from 'react-redux'
import HeatNode from "./HeatNode"

import './HeatMapLayer.css'

const HeatMapLayer = ({
    width,
    height,
    nodeSize,
    activeControl,
    pathfindingMode
}) => {

    const travelTimes = useSelector(state => state.path.times)
    let totalTime
    if (travelTimes) {
        let timesList = Object.values(travelTimes).filter(time => time < Infinity)
        totalTime = Math.max(...timesList)
    }

    useEffect(() => {
        if (activeControl !== 'delete') {
            document.getElementById('delete-layer').innerHTML = ''
        }
    }, [activeControl])

    let grid = []
    for (let row = 0; row < height; row++) {
        let newRow = []

        for (let col = 0; col < width; col++) {

            let backgroundColor = `hsla(260, 95%, 80%, 0.6)`
            let nodeId = `${col}-${row}`
            let hue
            if (travelTimes && travelTimes[nodeId]) hue = Math.floor(travelTimes[nodeId] / totalTime * 255)
            if (hue < Infinity) {
                backgroundColor = `hsla(${hue}, 95%, 80%, 0.6)`
            }

            newRow.push(
                <HeatNode
                    row={row}
                    col={col}
                    backgroundColor={backgroundColor}
                    nodeSize={nodeSize}
                    key={`${col}-${row}`}
                />
            )
        }
        grid.push(newRow)
    }

    return (
        <>{ travelTimes && Object.values(travelTimes) &&
            <div className={
                `heat-map-grid
            `}
                id='heat-map-layer'>
                {
                    grid.map((row, rowNumber) => (
                        <div className="grid-row" key={`row-${rowNumber}`}>
                            {row}
                        </div>
                    ))
                }
            </div>
        }
        </>
    )
}

export default HeatMapLayer
