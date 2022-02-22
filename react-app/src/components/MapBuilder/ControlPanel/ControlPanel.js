import './ControlPanel.css'

const ControlPanel = ({
    activateClear,
    activateDelete,
    // saveMap,
    // saveText,
    activeControl,
    setActiveControl,
    children,
}) => {

    const FeatureType = ({
        featureName,
        onClick,
        controlName
    }) => {


        return (
            <div onClick={onClick} className="feature-type">
                <div className={`feature-icon ${featureName}`}>
                    <div className={`active-feature-${controlName === activeControl}`}>
                    </div>
                </div>
                <div className="feature-name">{featureName}</div>
            </div>
        )
    }

    const toggleWater = () => {
        if (activeControl === 'water') {
            setActiveControl('')
        } else {
            setActiveControl('water')
        }
    }

    const toggleBrush = () => {
        if (activeControl === 'brush') {
            setActiveControl('')
        } else {
            setActiveControl('brush')
        }
    }

    const toggleStreet = () => {
        if (activeControl === 'street') {
            setActiveControl('')
        } else {
            setActiveControl('street')
        }
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
                        onClick={toggleWater}
                        controlName='water'
                        featureName='Water'
                    />
                    </div>
                <div className="feature-row top-row">
                <FeatureType
                featureName='Highway'
                />
                <FeatureType
                        controlName='street'
                        featureName='Street'
                        onClick={toggleStreet}
                    />
                <FeatureType
                        controlName='brush'
                        featureName='Brush'
                        onClick={toggleBrush}
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
                {/* <button onClick={saveMap}>{saveText}</button> */}
                <button onClick={activateClear}>Clear All Features</button>
                <button onClick={activateDelete}>Delete Map</button>
            </div>
        </div>
    )
}

export default ControlPanel
