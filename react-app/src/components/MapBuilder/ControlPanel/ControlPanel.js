import { useEffect, useState } from 'react'
import './ControlPanel.css'
import ModeDescription from './ModeDescription/ModeDescription'
import visualizeDijkstra from '../Visualizer/graphAlgorithms/dijkstra'

const ControlPanel = ({
    activateClear,
    activateDelete,
    activeControl,
    setActiveControl,
    resetPath,
    pathfindingMode,
    setPathfindingMode,
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
        }, [])


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
        resetPath()
        if (activeControl === 'water') {
            setActiveControl('')
        } else {
            setActiveControl('water')
        }
    }

    const toggleBrush = () => {
        resetPath()
        if (activeControl === 'brush') {
            setActiveControl('')
        } else {
            setActiveControl('brush')
        }
    }

    const toggleStreet = () => {
        resetPath()
        if (activeControl === 'street') {
            setActiveControl('')
        } else {
            resetPath()
            setActiveControl('street')
        }
    }


    const toggleEditFeatures = () => {
        resetPath()
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
        resetPath()
        if (activeControl === 'deleteFeatures') {
            setActiveControl('')
        } else {
            setActiveControl('deleteFeatures')
        }
    }

    const toggleHome = () => {
        resetPath()
        if (activeControl === 'home') {
            setActiveControl('')
        } else {
            setActiveControl('home')
        }
    }

    const toggleShop = () => {
        resetPath()
        if (activeControl === 'shop') {
            setActiveControl('')
        } else {
            setActiveControl('shop')
        }
    }

    const [disableReclick, setDisableReclick] = useState(false)


    return (
        <div className="control-panel">
            {children}
            <ModeDescription activeControl={activeControl} pathfindingMode={pathfindingMode}/>
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
                {(activeControl === 'editFeatures' || activeControl === 'deleteFeatures') ?
                    <button
                        className='visualize-button pathfinding-disabled'
                        onClick={() => {
                            if (activeControl === `editFeatures`) toggleEditFeatures()
                            if (activeControl === `deleteFeatures`) toggleDeleteFeatures()
                        }}
                    >
                        Pathfinding Disabled
                    </button>
                    :
                    <>
                        {pathfindingMode === 'inactive' && !disableReclick &&
                            <button
                                className='visualize-button find-path'
                                onClick={() => {
                                    setDisableReclick(true)
                                    visualizeDijkstra(setPathfindingMode, setDisableReclick)
                                }}
                            >
                                Find Path
                            </button>
                        }
                        {disableReclick &&
                            <button
                                className='visualize-button calculating'
                                disabled
                            >
                                Calculating...
                            </button>
                        }
                        {(pathfindingMode === 'error' || pathfindingMode === 'success') &&
                            !disableReclick &&
                            <button
                                className='visualize-button reset'
                                onClick={resetPath}
                            >
                                Reset
                            </button>
                        }
                    </>}
            </div>
        </div>
    )
}

export default ControlPanel
