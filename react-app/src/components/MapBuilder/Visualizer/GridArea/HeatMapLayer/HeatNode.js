// import { useEffect } from 'react'
import './HeatNode.css'

const HeatNode = ({
    row,
    col,
    nodeSize,
    backgroundColor
}) => {

    return (
        <div
            className="heat-node"
            id={`${col}-${row}`}
            style={{
                height: `${nodeSize}px`,
                width: `${nodeSize}px`,
                backgroundColor: backgroundColor
            }}
            row={row}
            col={col}
        >
            <div></div>
        </div>
    )
}

export default HeatNode
