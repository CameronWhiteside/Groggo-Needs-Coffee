import './MapCard.css'
import { resetRoadOverlay } from '../../utils'

const MapCard = ({
    map,
    setCurrentMap,
    setCurrentName,
    setLoadMapMode,
}) => {

    const selectMap = () => {
        resetRoadOverlay()
        setCurrentMap(map)
        setCurrentName(map.name)
        setLoadMapMode(false)
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
