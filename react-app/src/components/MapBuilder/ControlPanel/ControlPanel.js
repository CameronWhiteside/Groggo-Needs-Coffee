import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getMaps } from "../../../store/map";

import './ControlPanel.css'

const ControlPanel = ({
    activateLoad,
    activateClear,
    activateDelete,
    children,
    // currentMap,
    // setCurrentMap
    saveMap,
    saveText,
    drawWaterMode,
    setDrawWaterMode
}) => {
    // const dispatch = useDispatch();
    // const sessionUser = useSelector(state => state.session.user);

    // useEffect(() => {
    //     dispatch(getMaps(sessionUser.id))
    // }, []);

    const FeatureType = ({
        featureName,
        onClick,
        activeMode
    }) => {


        return (
            <div onClick={onClick} className="feature-type">
                <div className={`feature-icon ${featureName}`}>
                    <div className={`active-feature-${activeMode}`}>
                    </div>
                </div>
                <div className="feature-name">{featureName}</div>
            </div>
        )
    }

    // const activateClear = (e) => {
    //     e.preventDefault()
    //     setClearMapMode(true)
    // }

    const toggleWater = () => {
        console.log(`she togglin`)
        setDrawWaterMode(!drawWaterMode)
    }


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
                        onClick={toggleWater}
                        activeMode={drawWaterMode}
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
                <button onClick={saveMap}>{saveText}</button>
                <button onClick={activateClear}>Clear Features</button>
                <button onClick={activateDelete}>Delete Map</button>
                {/* <button onClick={activateLoad}>Load Map</button> */}
            </div>
        </div>
    )
}

export default ControlPanel
