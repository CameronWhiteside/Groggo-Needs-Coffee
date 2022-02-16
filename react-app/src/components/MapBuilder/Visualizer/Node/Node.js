import './Node.css'

const Node = ({
    row,
    col,
    isStart = false,
    isFinish = false,
    isVisited = false
}) => {


    const isStartAttribute = isStart.toString()
    const isFinishAttribute = isFinish.toString()
    const isVisitedAttribute = isVisited.toString()

    return (
        <div
            className="node"
            row={row}
            col={col}
            is-start={isStartAttribute}
            is-finish={isFinishAttribute}
        >
            <div></div>
        </div>
    )
}

export default Node
