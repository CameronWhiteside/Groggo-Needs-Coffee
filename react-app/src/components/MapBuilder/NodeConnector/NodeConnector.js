
const NodeConnector = ({ nodeA, nodeB, thickness }) => {

    // nodeA = document.getElementById('10-4')
    // nodeB = document.getElementById('19-20')
    thickness = 4;

    const getOffset = (el) => {
        var elContainer = el.getBoundingClientRect();
        return {
            left: elContainer.left + window.pageXOffset,
            top: elContainer.top + window.pageYOffset,
            width: elContainer.width || el.offsetWidth,
            height: elContainer.height || el.offsetHeight
        };
    }

    const offsetA = getOffset(nodeA);
    const offsetB = getOffset(nodeB);
    const xCoordA = offsetA.left + (offsetA.width/2);
    const yCoordA = offsetA.top - (offsetA.height/2);
    const xCoordB = offsetB.left + (offsetB.width/2);
    const yCoordB = offsetB.top - (offsetB.height/2);
    const length = Math.sqrt(((xCoordB - xCoordA) * (xCoordB - xCoordA)) + ((yCoordB - yCoordA) * (yCoordB - yCoordA))) + 2;
    const centerXCoord = ((xCoordA + xCoordB) / 2) - (length / 2);
    const centerYCoord = ((yCoordA + yCoordB) / 2) - (thickness / 2);
    const angle = Math.atan2((yCoordA - yCoordB), (xCoordA - xCoordB)) * (180 / Math.PI);

    return (

        <div className="line fading-effect"
            style={{
                padding: '0px',
                margin: '0px',
                height: `${thickness}px`,
                backgroundColor: `brown`,
                lineHeight: `${4}px`,
                borderRadius: `2px`,
                position: `absolute`,
                left: `${centerXCoord}px`,
                top: `${centerYCoord + 18}px`,
                width: `${length}px`,
                transform: `rotate(${angle}deg)`
            }}
        />
    )
}


export default NodeConnector
