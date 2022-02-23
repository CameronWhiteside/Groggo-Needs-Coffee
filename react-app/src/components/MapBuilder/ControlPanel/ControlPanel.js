import { useEffect } from 'react'
import './ControlPanel.css'

const ControlPanel = ({
    activateClear,
    activateDelete,
    activeControl,
    setActiveControl,
    resetPath,
    children,
}) => {

    const FeatureType = ({
        featureName,
        onClick,
        controlName
    }) => {

        useEffect(() => {
            if (activeControl !== 'editFeatures') {
                let editLayer = document.getElementById('edit-layer')
                editLayer.innerHTML=''
            }
        },[])

        return (
            <div onClick={onClick} className="feature-type">
                <div className={`feature-icon ${controlName}`}>
                    <div className={`active-feature-${controlName === activeControl}`}>
                    </div>
                </div>
                {/* <div className="feature-name">{featureName}</div> */}
            </div>
        )
    }

    const toggleWater = () => {
        if (activeControl === 'water') {
            setActiveControl('')
        } else {
            resetPath()
            setActiveControl('water')
        }
    }

    const toggleBrush = () => {
        if (activeControl === 'brush') {
            setActiveControl('')
        } else {
            resetPath()
            setActiveControl('brush')
        }
    }

    const toggleStreet = () => {
        if (activeControl === 'street') {
            setActiveControl('')
        } else {
            resetPath()
            setActiveControl('street')
        }
    }

    const toggleHighway = () => {
        if (activeControl === 'highway') {
            setActiveControl('')
        } else {
            resetPath()
            setActiveControl('highway')
        }
    }

    const toggleEditFeatures = () => {
        if (activeControl === 'editFeatures') {
            let editLayer = document.getElementById('edit-layer')
            editLayer.innerHTML=''
            setActiveControl('')
        } else {
            resetPath()
            setActiveControl('editFeatures')
        }
    }

    const toggleDeleteFeatures = () => {
        if (activeControl === 'deleteFeatures') {
            setActiveControl('')
        } else {
            resetPath()
            setActiveControl('deleteFeatures')
        }
    }

    const toggleHome = () => {
        if (activeControl === 'homes') {
            setActiveControl('')
        } else {
            resetPath()
            setActiveControl('home')
        }
    }

    const toggleShop = () => {
        if (activeControl === 'shop') {
            setActiveControl('')
        } else {
            resetPath()
            setActiveControl('shop')
        }
    }


    return (
        <div className="control-panel">
            {children}
            <div className="feature-container">
                <div className="feature-row top-row">
                    <FeatureType
                        featureName="Home"
                        onClick={toggleHome}
                        controlName='home'
                    />
                    <FeatureType
                        onClick={toggleShop}
                        controlName='shop'
                        featureName='Shop'
                    />

                </div>
                <div className="feature-row top-row">

                    <FeatureType
                        onClick={toggleWater}
                        controlName='water'
                        featureName='Water'
                    />
                        <FeatureType
                        controlName='brush'
                        featureName='Brush'
                        onClick={toggleBrush}
                />
                <FeatureType
                        controlName='street'
                        featureName='Street'
                        onClick={toggleStreet}
                    />

                </div>
                <div className="feature-row top-row">
                <FeatureType
                        onClick={toggleEditFeatures}
                        controlName='editFeatures'
                        featureName='Edit'
                />
                <FeatureType
                        onClick={toggleDeleteFeatures}
                        controlName='deleteFeatures'
                        featureName='Delete'
                />

                </div>
            </div>

            <div className="control-buttons">
                <button onClick={activateClear}>Clear All Features</button>
                <button onClick={activateDelete}>Delete This Map</button>
            </div>
        </div>
    )
}

export default ControlPanel
