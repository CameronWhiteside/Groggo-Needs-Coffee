
import Node from "../Node/Node"
import './GridArea.css'


const GridArea = () => {

    const NodeCol = (colCount, rowNumber) => {



        const col = []
        for (let i = 0; i < colCount; i++) {
            let colNumber = i

            let isStart = (rowNumber === 2 && colNumber === 5)
            let isFinish = (colNumber === 30 && rowNumber === 31)
            let isWater = (colNumber > 25 && rowNumber < 3 ||
                rowNumber > 8 && rowNumber < 20 && colNumber > 2 && colNumber < 22 ||
                rowNumber > 25 && colNumber > 35
            )
            let isBrush = (!isWater && (rowNumber * colNumber) % 9 === 2)
            col.push(<Node

                row={rowNumber}
                col={colNumber}
                isStart={isStart}
                isFinish={isFinish}
                isWater={isWater}
                isBrush={isBrush}

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
        return (
            <div id='grid-area' >
                {grid}
            </div>
            )

    }


    return (
            <div className="grid-area">
                {NodeGrid(35, 70, 'key')}
            </div>
    )
}

export default GridArea
