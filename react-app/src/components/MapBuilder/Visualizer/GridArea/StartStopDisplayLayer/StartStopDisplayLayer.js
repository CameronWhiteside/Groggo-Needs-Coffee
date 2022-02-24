import './StartStopDisplayLayer.css'

const StartStopDisplayLayer = ({currentFeatures, nodeSize}) => {

    let startLeft, startTop, stopLeft, stopTop

    let startTest = Object.values(currentFeatures).filter(feature => parseInt(feature.featureTypeId) === 1)
    let stopTest = Object.values(currentFeatures).filter(feature => parseInt(feature.featureTypeId) === 2)
    if (startTest.length) {
        startLeft = startTest[0].startLongitude * nodeSize
        startTop = startTest[0].startLatitude * nodeSize
    } else {
        startLeft = 9 * nodeSize
        startTop = 17 * nodeSize
    }
    if (stopTest.length) {
        stopLeft = stopTest[0].startLongitude * nodeSize
        stopTop = stopTest[0].startLatitude * nodeSize
    } else {
        stopLeft = 60 * nodeSize
        stopTop = 17 * nodeSize
    }

    return (
        <div id='start-stop-layer'>
            <div id='start-display'>
                <div id='start-indicator'
                    style={{
                        height: `${nodeSize * 2}px`,
                        width: `${nodeSize * 2}px`,
                        top: `${startTop - nodeSize/2}px`,
                        left: `${startLeft - nodeSize/2}px`
                    }}
                />
            </div>
            <div id='stop-display'>
                <div id='stop-indicator'
                    style={{
                        height: `${nodeSize * 2}px`,
                        width: `${nodeSize * 2}px`,
                        top: `${stopTop - nodeSize/2}px`,
                        left: `${stopLeft - nodeSize/2}px`
                    }}
                />
            </div>
        </div>
    )
}

export default StartStopDisplayLayer
