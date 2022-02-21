import './Node.css'

const Node = ({
    row,
    col,
    isStart = false,
    isFinish = false,
    isVisited = false,
    isBrush = false,
    isWater = false,
    isHighwayEnd = false,
    isStreet = false,
    featureType = `flat`,
    adjacentStreets = [],
    adjacentHighways = [],
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
            is-brush={isBrush.toString()}
            is-water={isWater.toString()}
            is-street={isStreet.toString()}
            is-highway={isHighwayEnd.toString()}
            feature-type={featureType}
            adjacent-streets={JSON.stringify(adjacentStreets)}
            adjacent-highways={JSON.stringify(adjacentHighways)}
            onClick={nodeClick}
            onMouseOver={nodeMouseOver}
        >
            <div></div>
        </div>
    )
}

export default Node
