import './MapCard.css'

const MapCard = ({ map, setCurrentMap, setCurrentName }) => {

    const selectMap = () => {
        setCurrentMap(map)
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
