import './RoadDisplayLayer.css'

const RoadDisplayLayer = ({ height, width, nodeSize }) => {


    return(
        <div
        id="road-display-layer"
        style={{
            height: `${height * nodeSize}px`,
            width: `${width * nodeSize}px`,
        }}
        >
        </div>
    )
}

export default RoadDisplayLayer
