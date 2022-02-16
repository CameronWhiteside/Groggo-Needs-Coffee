import { useState } from "react"
import './ControlPanel.css'




const ControlPanel = () => {

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

    return (
        <div className="control-panel">
            <div className="feature-container">
                <FeatureType
                    icon='H'
                    featureName='highway'
                />
                <FeatureType
                    icon='S'
                    featureName='street'
                />
                <FeatureType
                    icon='A'
                    featureName='alley'
                />
                <FeatureType
                    icon='B'
                    featureName='brush'
                />
                <FeatureType
                    icon='R'
                    featureName='river'
                />
                <FeatureType
                    icon='G'
                    featureName="groggo's house"
                />
                <FeatureType
                    icon='C'
                    featureName="coffee shop"
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
        </div>
    )
}

export default ControlPanel
