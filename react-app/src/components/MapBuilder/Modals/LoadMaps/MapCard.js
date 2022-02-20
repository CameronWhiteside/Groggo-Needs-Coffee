import './MapCard.css'

const MapCard = ({ map, setCurrentMap, setCurrentName, featureList, setFeatureList }) => {

    const selectMap = () => {
        setCurrentMap(map)
        console.log({ setFeatureList })
        let mapFeatures = map.features
        let mapFeatureInfo = mapFeatures.map(feature => {

            let nodes = {}

            for (let x = feature.start_longitude; x <= feature.stop_longitude; x++) {
                for (let y = feature.start_latitude; y <= feature.stop_latitude; y++) {
                    nodes[`${x}-${y}`] = `${x}-${y}`
                }
            }

            let featureObj = {
                name: feature.name,
                featureTypeId: feature.feature_type_id,
                typeName: feature.type_name,
                startLatitude: feature.start_latitude,
                startLongitude: feature.start_longitude,
                stopLatitude: feature.stop_latitude,
                stopLongitude: feature.stop_longitude,
                nodes
            }

            return featureObj

        })

        setFeatureList(mapFeatureInfo)
        setCurrentName(map.name)
    }

    let createdAt = new Date(map.created_at).toLocaleDateString("en-US")
    let updatedAt = new Date(map.updated_at).toLocaleDateString("en-US")

    return (
        <div className="map-card" onClick={selectMap}>
                <div className="map-info">
                    <h3>{map.name}</h3>
                    <h5>Saved {updatedAt} - Created {createdAt}</h5>
                </div>
        </div>
    )
}

export default MapCard
