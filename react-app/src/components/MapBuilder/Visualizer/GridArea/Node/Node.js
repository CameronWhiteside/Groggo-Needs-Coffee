import { useEffect } from 'react'
import './Node.css'

const Node = ({
    row,
    col,
    isStart = false,
    isFinish = false,
    isVisited = false,
    isHighwayEnd = false,
    featureType = `flat`,
    featureId = null,
    adjacentNodes = {
        streets: {},
        highways: {},
    },
    nodeSize,
    nodeClick,
    nodeMouseOver
}) => {

    return (
        <div
            className="node"
            id={`${col}-${row}`}
            style={{height: `${nodeSize}px`, width: `${nodeSize}px`}}
            row={row}
            col={col}
            is-start={isStart.toString()}
            is-finish={isFinish.toString()}
            is-visited={isVisited.toString()}
            is-highway={isHighwayEnd.toString()}
            feature-type={featureType.toString()}
            feature-id={featureId}
            adjacent-nodes={JSON.stringify(adjacentNodes)}
            onClick={nodeClick}
            onMouseOver={nodeMouseOver}
        >
            <div></div>
        </div>
    )
}

export default Node
