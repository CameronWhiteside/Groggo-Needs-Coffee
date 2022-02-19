import './PathTraceLayer.css'

const PathTraceLayer = ({ height, width, nodeSize }) => {


    return(
        <div
        id="path-trace-layer"
        style={{
            height: `${height * nodeSize}px`,
            width: `${width * nodeSize}px`,
        }}
        >
        </div>
    )
}

export default PathTraceLayer
