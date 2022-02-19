// const NodeCol = ({ colCount, rowNumber, nodeSize }) => {

//     const col = []
//     for (let i = 0; i < colCount; i++) {
//         let colNumber = i

//         let isStart = (rowNumber === 20 && colNumber === 12)
//         let isFinish = (rowNumber === 17 && colNumber === 50)
//         let isWater = checkWater(rowNumber, colNumber)
//         let isBrush = (!isWater && (rowNumber * colNumber) % 9 === 2)
//         col.push(
//             <Node
//             row={rowNumber}
//             col={colNumber}
//             isStart={isStart}
//             isFinish={isFinish}
//             isWater={isWater}
//             isBrush={isBrush}
//             nodeSize={nodeSize}
//             nodeClick={nodeClick}
//             nodeMouseOver={nodeMouseOver}
//             key={`${i}-${rowNumber}`} />)
//     }
//     return col
// }



// const NodeGrid = ({ height, width, nodeSize }) => {
//     const grid = []
//     for (let rowNumber = 0; rowNumber < height; rowNumber++) {
//         grid.push(
//             <div className="grid-row" key={`row-${rowNumber}`}>
//                 <NodeCol
//                     colCount={width}
//                     rowNumber={rowNumber}
//                     nodeSize={nodeSize}
//                 />
//             </div>
//         )
//     }
//     return (
//            grid
//         )

// }


// return (
//     <div id="grid-area">
//         <DrawLayer
//             height={height}
//             width={width}
//             nodeSize={nodeSize}
//         />
//         <NodeGrid
//             rowCount={height}
//             colCount={width}
//             nodeSize={nodeSize}
//          />
//         </div>
// )
