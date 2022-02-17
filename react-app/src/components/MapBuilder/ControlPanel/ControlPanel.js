import { useState } from "react"
import './ControlPanel.css'




const ControlPanel = ({
    clearMapMode,
    setClearMapMode,
    currentMap
}) => {

    const FeatureType = ({
        featureName,
        icon,
    }) => {


        return (
            <div className="feature-type">
                <div className="feature-icon">{icon}</div>
                <div className="feature-name">{featureName}</div>
            </div>
        )
    }

    const activateClear = (e) => {
        e.preventDefault()
        setClearMapMode(true)
    }


    const LineDivider = () => ({

    })

    return (
        <div className="control-panel">
            <div className="feature-container">
                <FeatureType
                    icon='H'
                    featureName='Highway'
                />
                <FeatureType
                    icon='S'
                    featureName='Street'
                />
                <FeatureType
                    icon='A'
                    featureName='Alley'
                />
                <FeatureType
                    icon='B'
                    featureName='Brush'
                />
                <FeatureType
                    icon='R'
                    featureName='River'
                />
                <FeatureType
                    icon='G'
                    featureName="Groggo's House"
                />
                <FeatureType
                    icon='C'
                    featureName="Coffee Shop"
                />
            </div>
            <div className="cursor-container">
                <div className="cursor">
                    <span>+</span>
                </div>
                <div className="cursor">
                   <span>-</span>
                </div>
            </div>
            <div className="clear-features">
                <button onClick={activateClear}>Clear Features</button>
            </div>
        </div>
    )
}

export default ControlPanel
