
import Node from "../Node/Node"
import './GridArea.css'


const GridArea = () => {

    const NodeCol = (colCount, rowNumber) => {



        const col = []
        for (let i = 0; i < colCount; i++) {
            let colNumber = i

            let isStart = (rowNumber === 2)
            let isFinish = (colNumber === 5)
            col.push(<Node

                row={rowNumber}
                col={colNumber}
                isStart={isStart}
                isFinish={isFinish}

                key={`${i}-${rowNumber}`} />)
        }
        return col
    }

    const NodeGrid = (rowCount, colCount, colCounterVariable) => {
        const grid = []
        for (let i = 0; i < rowCount; i++) {
            grid.push(
                <div className="grid-row" key={`row-${i}`}>
                    {NodeCol(colCount, i)}
                </div>
            )
        }
        return grid
    }


    return (
            <div className="grid-area">
                {NodeGrid(35, 75, 'key')}
            </div>
    )
}

export default GridArea
