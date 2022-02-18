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
    isStreetEnd = false,
}) => {

    return (
        <div
            className="node"
            row={row}
            col={col}
            is-start={isStart.toString()}
            is-finish={isFinish.toString()}
            is-visited={isVisited.toString()}
            is-brush={isBrush.toString()}
            is-water={isWater.toString()}
            is-street-end={isStreetEnd.toString()}
            is-highway-end={isHighwayEnd.toString()}
        >
            <div></div>
        </div>
    )
}

export default Node
