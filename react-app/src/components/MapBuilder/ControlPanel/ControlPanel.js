import { useState } from "react"
import './ControlPanel.css'

const ControlPanel = ({
    activateLoad,
    activateClear,
    activateDelete,
    children,
    currentMap
}) => {

    const FeatureType = ({
        featureName,
        iconUrl,
    }) => {


        return (
            <div className="feature-type">
                <div className={`feature-icon ${featureName}`}></div>
                <div className="feature-name">{featureName}</div>
            </div>
        )
    }

    // const activateClear = (e) => {
    //     e.preventDefault()
    //     setClearMapMode(true)
    // }


    const LineDivider = () => {
        return null
    }

    return (
        <div className="control-panel">
            {children}
            <div className="feature-container">
                <div className="feature-row top-row">
                    <FeatureType
                        featureName="Home"
                    />
                    <FeatureType
                        icon='C'
                        featureName="Shop"
                    />
                <FeatureType
                    featureName='Water'
                    />
                    </div>
                <div className="feature-row top-row">
                <FeatureType
                featureName='Highway'
                />
                <FeatureType
                    featureName='Street'
                    />
                <FeatureType
                featureName='Brush'
                />
                </div>
            </div>
            <div className="cursor-container">
                <div className="cursor build">
                </div>
                <div className="cursor move">
                </div>
                <div className="cursor destroy">
                </div>
            </div>
            <div className="control-buttons">
                <button onClick={()=>{console.log('save map')}}>Save Map</button>
                <button onClick={activateClear}>Clear Features</button>
                <button onClick={activateDelete}>Delete Map</button>
                {/* <button onClick={activateLoad}>Load Map</button> */}
            </div>
        </div>
    )
}

export default ControlPanel
